import React, { useState } from 'react'
import { useStore } from '../store/characterStore'
import { MORPHS, WARE_LIST, ARMOR_LIST } from '../data/gameData'

export default function MorphPanel() {
  const updateChar = useStore(s => s.updateChar)
  const char = useStore(s => s.getActiveChar())
  const [morphTab, setMorphTab] = useState('biomorph')
  if (!char) return null

  const u = (field) => (e) => updateChar(field, e.target.value)
  const uNum = (field) => (e) => updateChar(field, parseInt(e.target.value) || 0)

  const selectMorph = (morph) => {
    updateChar('morphName', morph.name)
    updateChar('morphType', morphTab)
    updateChar('morphMP', morph.mp)
    updateChar('morphDUR', morph.dur)
    updateChar('morphWT', morph.wt)
    updateChar('morphDR', morph.dr)
    updateChar('morphMovement', morph.movement)
    if (morph.armor) {
      const [e, k] = morph.armor.split('/').map(Number)
      updateChar('morphArmor', { energy: e || 0, kinetic: k || 0 })
    }
  }

  const toggleWare = (wareName) => {
    const cur = char.morphWare || []
    const next = cur.includes(wareName) ? cur.filter(w => w !== wareName) : [...cur, wareName]
    updateChar('morphWare', next)
  }

  const selectedArmor = ARMOR_LIST.find(a => a.name === char.wornArmor) || { energy: 0, kinetic: 0 }
  const totalEnergy = (char.morphArmor?.energy || 0) + selectedArmor.energy
  const totalKinetic = (char.morphArmor?.kinetic || 0) + selectedArmor.kinetic

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left: Morph selection */}
      <div>
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-header"><span className="panel-title">// Current Sleeve</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: 8, marginBottom: 12 }}>
            <div className="field">
              <label>Morph Name</label>
              <input value={char.morphName || ''} onChange={u('morphName')} placeholder="e.g. Ghost, Synth, Fury..." />
            </div>
            <div className="field">
              <label>MP Cost</label>
              <input type="number" min={0} value={char.morphMP || 0} onChange={uNum('morphMP')} style={{ textAlign: 'center' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
            {[
              { label: 'Wound Threshold', key: 'morphWT', color: 'var(--warn)' },
              { label: 'Durability', key: 'morphDUR', color: 'var(--accent)' },
              { label: 'Death Rating', key: 'morphDR', color: 'var(--danger)' },
            ].map(s => (
              <div key={s.key} className="stat-box">
                <div className="stat-label">{s.label}</div>
                <input type="number" min={0}
                  value={char[s.key] || 0}
                  onChange={uNum(s.key)}
                  style={{ background: 'transparent', border: 'none', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 20, color: s.color, width: '100%', padding: '2px 0' }}
                />
              </div>
            ))}
          </div>
          <div className="field">
            <label>Movement</label>
            <input value={char.morphMovement || ''} onChange={u('morphMovement')} placeholder="Walker 4/20, Swim 4/20..." />
          </div>
          <div className="field">
            <label>Morph Traits</label>
            <textarea value={char.morphTraits || ''} onChange={u('morphTraits')} rows={2} placeholder="Inherent bonuses, penalties, special traits..." />
          </div>
          <div className="field">
            <label>Morph Notes</label>
            <textarea value={char.morphNotes || ''} onChange={u('morphNotes')} rows={2} placeholder="Appearance, mods, history..." />
          </div>
        </div>

        {/* Armor */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">// Armor</span></div>
          <div className="field">
            <label>Worn Armor</label>
            <select value={char.wornArmor || 'None'} onChange={u('wornArmor')}>
              {ARMOR_LIST.map(a => <option key={a.name} value={a.name}>{a.name} ({a.energy}E / {a.kinetic}K)</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
            <div>
              <label>Morph Armor (Ware)</label>
              <div style={{ display: 'flex', gap: 4 }}>
                <input type="number" min={0} placeholder="E" value={char.morphArmor?.energy || 0}
                  onChange={e => updateChar('morphArmor', { ...(char.morphArmor || {}), energy: parseInt(e.target.value) || 0 })}
                  style={{ textAlign: 'center' }} />
                <input type="number" min={0} placeholder="K" value={char.morphArmor?.kinetic || 0}
                  onChange={e => updateChar('morphArmor', { ...(char.morphArmor || {}), kinetic: parseInt(e.target.value) || 0 })}
                  style={{ textAlign: 'center' }} />
              </div>
            </div>
            <div>
              <label>Total Armor</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', height: 36, paddingLeft: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--accent)' }}>{totalEnergy}E</span>
                <span style={{ color: 'var(--text-muted)' }}>/</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--warn)' }}>{totalKinetic}K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: morph browser + ware */}
      <div>
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-header"><span className="panel-title">// Morph Browser</span></div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
            {Object.keys(MORPHS).map(t => (
              <button key={t} className={morphTab === t ? '' : 'ghost'}
                style={{ fontSize: 11, padding: '4px 10px', ...(morphTab === t ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}) }}
                onClick={() => setMorphTab(t)}>{t}</button>
            ))}
          </div>
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {(MORPHS[morphTab] || []).map(morph => (
              <div key={morph.name}
                onClick={() => selectMorph(morph)}
                style={{
                  padding: '8px 10px', borderRadius: 4, cursor: 'pointer', marginBottom: 4,
                  background: char.morphName === morph.name ? 'var(--accent-glow)' : 'var(--bg-input)',
                  border: `1px solid ${char.morphName === morph.name ? 'var(--accent-dim)' : 'var(--border)'}`,
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: char.morphName === morph.name ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {morph.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-second)' }}>
                    MP:{morph.mp} DUR:{morph.dur} WT:{morph.wt}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-second)' }}>{morph.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ware */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">// Ware & Implants</span></div>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {['B','C','M','N'].map(wtype => {
              const label = { B: 'Bioware', C: 'Cyberware', M: 'Meshware', N: 'Nanoware' }[wtype]
              const items = WARE_LIST.filter(w => w.type === wtype)
              return (
                <div key={wtype} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4, letterSpacing: '0.1em' }}>{label.toUpperCase()}</div>
                  {items.map(w => {
                    const active = (char.morphWare || []).includes(w.name)
                    return (
                      <div key={w.name}
                        onClick={() => toggleWare(w.name)}
                        style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                          padding: '5px 8px', borderRadius: 3, cursor: 'pointer', marginBottom: 2,
                          background: active ? 'rgba(0,200,255,0.07)' : 'var(--bg-input)',
                          border: `1px solid ${active ? 'var(--accent-dim)' : 'var(--border)'}`,
                          transition: 'all 0.12s',
                        }}>
                        <div>
                          <span style={{ fontSize: 12, color: active ? 'var(--accent)' : 'var(--text-primary)', fontWeight: active ? 500 : 400 }}>{w.name}</span>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{w.desc}</div>
                        </div>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: 8 }}>{w.cost}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
