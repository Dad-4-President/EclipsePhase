import { create } from 'zustand'
import { BLANK_CHARACTER } from '../data/gameData'

const STORAGE_KEY = 'ep2e_characters'
const SNAPSHOTS_KEY = 'ep2e_snapshots'

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function saveToStorage(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch {}
}

export const useStore = create((set, get) => ({
  // --- Characters list ---
  characters: loadFromStorage(STORAGE_KEY, []),
  activeCharId: null,
  activeTab: 'identity',
  snapshots: loadFromStorage(SNAPSHOTS_KEY, {}),

  // --- Select / create ---
  setActiveChar: (id) => set({ activeCharId: id, activeTab: 'identity' }),

  createCharacter: () => {
    const id = `char_${Date.now()}`
    const newChar = { ...JSON.parse(JSON.stringify(BLANK_CHARACTER)), id, created: new Date().toISOString() }
    set(state => {
      const characters = [...state.characters, newChar]
      saveToStorage(STORAGE_KEY, characters)
      return { characters, activeCharId: id, activeTab: 'identity' }
    })
    return id
  },

  deleteCharacter: (id) => {
    set(state => {
      const characters = state.characters.filter(c => c.id !== id)
      const snapshots = { ...state.snapshots }
      delete snapshots[id]
      saveToStorage(STORAGE_KEY, characters)
      saveToStorage(SNAPSHOTS_KEY, snapshots)
      return { characters, snapshots, activeCharId: state.activeCharId === id ? null : state.activeCharId }
    })
  },

  // --- Update active character ---
  updateChar: (field, value) => {
    set(state => {
      const characters = state.characters.map(c =>
        c.id === state.activeCharId ? { ...c, [field]: value } : c
      )
      saveToStorage(STORAGE_KEY, characters)
      return { characters }
    })
  },

  updateCharDeep: (path, value) => {
    // path like 'aptitudes.COG' or 'rep.@rep'
    set(state => {
      const char = state.characters.find(c => c.id === state.activeCharId)
      if (!char) return {}
      const parts = path.split('.')
      const updated = JSON.parse(JSON.stringify(char))
      let ref = updated
      for (let i = 0; i < parts.length - 1; i++) ref = ref[parts[i]]
      ref[parts[parts.length - 1]] = value
      const characters = state.characters.map(c => c.id === state.activeCharId ? updated : c)
      saveToStorage(STORAGE_KEY, characters)
      return { characters }
    })
  },

  updateCharBatch: (updates) => {
    set(state => {
      const characters = state.characters.map(c => {
        if (c.id !== state.activeCharId) return c
        return { ...c, ...updates }
      })
      saveToStorage(STORAGE_KEY, characters)
      return { characters }
    })
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  // --- Active character getter ---
  getActiveChar: () => {
    const { characters, activeCharId } = get()
    return characters.find(c => c.id === activeCharId) || null
  },

  // --- Snapshot system ---
  saveSnapshot: (label) => {
    const { characters, activeCharId, snapshots } = get()
    const char = characters.find(c => c.id === activeCharId)
    if (!char) return
    const snap = {
      id: `snap_${Date.now()}`,
      label: label || `Snapshot ${new Date().toLocaleDateString()}`,
      timestamp: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(char)),
    }
    const charSnaps = [...(snapshots[activeCharId] || []), snap]
    const newSnapshots = { ...snapshots, [activeCharId]: charSnaps }
    saveToStorage(SNAPSHOTS_KEY, newSnapshots)
    set({ snapshots: newSnapshots })
    return snap.id
  },

  deleteSnapshot: (charId, snapId) => {
    set(state => {
      const charSnaps = (state.snapshots[charId] || []).filter(s => s.id !== snapId)
      const snapshots = { ...state.snapshots, [charId]: charSnaps }
      saveToStorage(SNAPSHOTS_KEY, snapshots)
      return { snapshots }
    })
  },

  getSnapshots: (charId) => {
    const { snapshots } = get()
    return snapshots[charId] || []
  },

  // --- Diff two snapshots ---
  diffSnapshots: (snapA, snapB) => {
    const diffs = []
    const fields = [
      { key: 'name', label: 'Name' },
      { key: 'background', label: 'Background' },
      { key: 'career', label: 'Career' },
      { key: 'faction', label: 'Faction' },
      { key: 'motivations', label: 'Motivations' },
      { key: 'rezPoints', label: 'Rez Points' },
      { key: 'rezSpent', label: 'Rez Spent' },
      { key: 'morphName', label: 'Morph' },
      { key: 'morphType', label: 'Morph Type' },
      { key: 'wornArmor', label: 'Worn Armor' },
      { key: 'stress', label: 'Stress' },
      { key: 'traumas', label: 'Traumas' },
      { key: 'infectionRating', label: 'Infection Rating' },
      { key: 'lastBackupDate', label: 'Last Backup' },
    ]
    const a = snapA.data
    const b = snapB.data

    fields.forEach(({ key, label }) => {
      if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
        diffs.push({ field: label, before: a[key], after: b[key], type: 'changed' })
      }
    })

    // Aptitudes
    const apts = ['COG','INT','REF','SAV','SOM','WIL']
    apts.forEach(apt => {
      const before = a.aptitudes?.[apt]
      const after = b.aptitudes?.[apt]
      if (before !== after) diffs.push({ field: `APT: ${apt}`, before, after, type: 'changed' })
    })

    // Rep
    const repKeys = ['@rep','crep','frep','grep','irep','rrep','xrep']
    repKeys.forEach(rk => {
      const before = a.rep?.[rk]
      const after = b.rep?.[rk]
      if (before !== after) diffs.push({ field: `Rep: ${rk}`, before, after, type: 'changed' })
    })

    // Skills
    const aSkills = a.activeSkills || []
    const bSkills = b.activeSkills || []
    bSkills.forEach(bs => {
      const as_ = aSkills.find(s => s.name === bs.name && s.field === bs.field)
      if (!as_) {
        diffs.push({ field: `Skill: ${bs.name}${bs.field ? ` (${bs.field})` : ''}`, before: null, after: bs.rank, type: 'added' })
      } else if (as_.rank !== bs.rank) {
        diffs.push({ field: `Skill: ${bs.name}${bs.field ? ` (${bs.field})` : ''}`, before: as_.rank, after: bs.rank, type: 'changed' })
      }
    })
    aSkills.forEach(as_ => {
      const bs = bSkills.find(s => s.name === as_.name && s.field === as_.field)
      if (!bs) diffs.push({ field: `Skill: ${as_.name}${as_.field ? ` (${as_.field})` : ''}`, before: as_.rank, after: null, type: 'removed' })
    })

    // Morph ware
    const aWare = a.morphWare || []
    const bWare = b.morphWare || []
    bWare.forEach(w => { if (!aWare.includes(w)) diffs.push({ field: `Ware: ${w}`, before: null, after: '✓', type: 'added' }) })
    aWare.forEach(w => { if (!bWare.includes(w)) diffs.push({ field: `Ware: ${w}`, before: '✓', after: null, type: 'removed' }) })

    return diffs
  },

  // --- Export / Import ---
  exportCharacter: (charId) => {
    const { characters, snapshots } = get()
    const char = characters.find(c => c.id === charId)
    if (!char) return null
    return JSON.stringify({ character: char, snapshots: snapshots[charId] || [] }, null, 2)
  },

  importCharacter: (jsonString) => {
    try {
      const { character, snapshots: importedSnaps } = JSON.parse(jsonString)
      const newId = `char_${Date.now()}`
      const newChar = { ...character, id: newId, imported: new Date().toISOString() }
      set(state => {
        const characters = [...state.characters, newChar]
        const snapshots = { ...state.snapshots, [newId]: importedSnaps || [] }
        saveToStorage(STORAGE_KEY, characters)
        saveToStorage(SNAPSHOTS_KEY, snapshots)
        return { characters, snapshots, activeCharId: newId }
      })
      return newId
    } catch (e) {
      console.error('Import failed:', e)
      return null
    }
  },
}))
