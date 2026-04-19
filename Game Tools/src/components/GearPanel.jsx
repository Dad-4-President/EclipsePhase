import React, { useState } from 'react'
import { useStore } from '../store/characterStore'
import { WEAPONS_RANGED, WEAPONS_MELEE } from '../data/gameData'

export default function GearPanel() {
  const updateChar = useStore(s => s.updateChar)
  const char = useStore(s => s.getActiveChar())
  const [addRanged, setAddRanged] = useState(false)
  const [addMelee, setAddMelee] = useState(false)
  const [customRanged, setCustomRanged] = useState({ name: '', dv: '', mode: '', range: '', skill: 'Guns', ammo: '', notes: '' })
  const [customMelee, setCustomMelee] = useState({ name: '', dv: '', skill: 'Melee', notes: '' })

  if (!char) return null

  const ranged = char.rangedWeapons || []
  const melee = char.meleeWeapons || []

  const addRangedFromTemplate = (w) => {
    updateChar('rangedWeapons', [...ranged, { ...w, notes: '' }])
  }
  const addCustomRangedWeapon = () => {
    if (!customRanged.name) return
    updateChar('rangedWeapons', [...ranged, { ...customRanged }])
    setCustomRanged({ name: '', dv: '', mode: '', range: '', skill: 'Guns', ammo: '', notes: '' })
    setAddRanged(false)
  }
  const removeRanged = (i) => updateChar('rangedWeapons', ranged.filter((_, idx) => idx !== i))

  const addMeleeFromTemplate = (w) => {
    updateChar('meleeWeapons', [...melee, { ...w, notes: '' }])
  }
  const addCustomMeleeWeapon = () => {
    if (!customMelee.name) return
    updateChar('meleeWeapons', [...melee, { ...customMelee }])
    setCustomMelee({ name: '', dv: '', skill: 'Melee', notes: '' })
    setAddMelee(false)
  }
  const removeMelee = (i) => updateChar('meleeWeapons', melee.filter((_, idx) => idx !== i))

  const updateRangedNote = (i, notes) => {
    const updated = ranged.map((w, idx) => idx === i ? { ...w, notes } : w)
    updateChar('rangedWeapons', updated)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Ranged weapons */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">// Ranged Weapons</span>
          <button className="ghost" style={{ fontSize: 11 }} onClick={() => setAddRanged(!addRanged)}>+ Add</button>
        </div>

        {addRanged && (
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glow)', borderRadius: 4, padding: 12, marginBottom: 12 }}>
            <label style={{ marginBottom: 6 }}>From rulebook</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
              {WEAPONS_RANGED.map(w => (
                <button key={w.name} className="ghost" style={{ fontSize: 11, padding: '3px 8px' }}
                  onClick={() => addRangedFromTemplate(w)}>{w.name}</button>
              ))}
            </div>
            <label>Custom weapon</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 60px 60px 50px', gap: 6, marginTop: 4 }}>
              <input placeholder="Name" value={customRanged.name} onChange={e => setCustomRanged({ ...customRanged, name: e.target.value })} />
              <input placeholder="DV" value={customRanged.dv} onChange={e => setCustomRanged({ ...customRanged, dv: e.target.value })} />
              <input placeholder="Mode" value={customRanged.mode} onChange={e => setCustomRanged({ ...customRanged, mode: e.target.value })} />
              <input type="number" placeholder="Range" value={customRanged.range} onChange={e => setCustomRanged({ ...customRanged, range: e.target.value })} />
              <input type="number" placeholder="Ammo" value={customRanged.ammo} onChange={e => setCustomRanged({ ...customRanged, ammo: e.target.value })} />
              <button className="primary" onClick={addCustomRangedWeapon}>Add</button>
            </div>
          </div>
        )}

        {ranged.length === 0 && <div className="text-muted" style={{ textAlign: 'center', padding: '16px 0', fontSize: 12 }}>No ranged weapons equipped.</div>}

        {ranged.map((w, i) => (
          <div key={i} style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 4, padding: 10, marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14 }}>{w.name}</span>
                {w.desc && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{w.desc}</div>}
              </div>
              <button className="ghost" style={{ padding: '2px 6px', fontSize: 12, color: 'var(--text-muted)' }} onClick={() => removeRanged(i)}>✕</button>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: 'DV', value: w.dv, color: 'var(--danger)' },
                { label: 'Mode', value: w.mode, color: 'var(--warn)' },
                { label: 'Range', value: `${w.range}m`, color: 'var(--accent)' },
                { label: 'Ammo', value: w.ammo, color: 'var(--text-second)' },
                { label: 'Skill', value: w.skill, color: 'var(--text-second)' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            <input
              placeholder="Notes (ammo type, mods...)"
              value={w.notes || ''}
              onChange={e => updateRangedNote(i, e.target.value)}
              style={{ marginTop: 6, fontSize: 12 }}
            />
          </div>
        ))}
      </div>

      {/* Melee weapons */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">// Melee Weapons</span>
          <button className="ghost" style={{ fontSize: 11 }} onClick={() => setAddMelee(!addMelee)}>+ Add</button>
        </div>

        {addMelee && (
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glow)', borderRadius: 4, padding: 12, marginBottom: 12 }}>
            <label style={{ marginBottom: 6 }}>From rulebook</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
              {WEAPONS_MELEE.map(w => (
                <button key={w.name} className="ghost" style={{ fontSize: 11, padding: '3px 8px' }}
                  onClick={() => addMeleeFromTemplate(w)}>{w.name}</button>
              ))}
            </div>
            <label>Custom weapon</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px auto', gap: 6, marginTop: 4 }}>
              <input placeholder="Name" value={customMelee.name} onChange={e => setCustomMelee({ ...customMelee, name: e.target.value })} />
              <input placeholder="DV" value={customMelee.dv} onChange={e => setCustomMelee({ ...customMelee, dv: e.target.value })} />
              <button className="primary" onClick={addCustomMeleeWeapon}>Add</button>
            </div>
          </div>
        )}

        {melee.length === 0 && <div className="text-muted" style={{ textAlign: 'center', padding: '16px 0', fontSize: 12 }}>No melee weapons equipped.</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
          {melee.map((w, i) => (
            <div key={i} style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 4, padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{w.name}</span>
                <button className="ghost" style={{ padding: '2px 6px', fontSize: 12, color: 'var(--text-muted)' }} onClick={() => removeMelee(i)}>✕</button>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>DV</div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--danger)' }}>{w.dv}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Skill</div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-second)', fontSize: 12 }}>{w.skill}</div>
                </div>
              </div>
              {w.desc && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{w.desc}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Gear notes */}
      <div className="panel">
        <div className="panel-header"><span className="panel-title">// Gear Packs & Notes</span></div>
        <textarea
          value={char.gearNotes || ''}
          onChange={e => updateChar('gearNotes', e.target.value)}
          rows={5}
          placeholder="Gear packs, consumables, nanofabricator prints, misc equipment..."
        />
      </div>
    </div>
  )
}
