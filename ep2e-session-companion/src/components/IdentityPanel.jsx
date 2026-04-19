import React from 'react'
import { useStore } from '../store/characterStore'
import { BACKGROUNDS, CAREERS, FACTIONS, EGO_TRAITS_POSITIVE, EGO_TRAITS_NEGATIVE, REP_NETWORKS } from '../data/gameData'

function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  )
}

export default function IdentityPanel() {
  const updateChar = useStore(s => s.updateChar)
  const updateCharDeep = useStore(s => s.updateCharDeep)
  const char = useStore(s => s.getActiveChar())
  if (!char) return null

  const u = (field) => (e) => updateChar(field, e.target.value)
  const uNum = (field) => (e) => updateChar(field, parseInt(e.target.value) || 0)

  const toggleTrait = (list, trait) => {
    const cur = char[list] || []
    const next = cur.includes(trait) ? cur.filter(t => t !== trait) : [...cur, trait]
    updateChar(list, next)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left column */}
      <div>
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-header"><span className="panel-title">// Ego Identity</span></div>

          <Field label="Name">
            <input value={char.name || ''} onChange={u('name')} placeholder="Operative handle or birth name" />
          </Field>
          <Field label="Aliases">
            <input value={char.aliases || ''} onChange={u('aliases')} placeholder="Known aliases, fake names" />
          </Field>
          <div className="field-row">
            <Field label="Background">
              <select value={char.background || ''} onChange={u('background')}>
                <option value=''>— Select —</option>
                {BACKGROUNDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Career">
              <select value={char.career || ''} onChange={u('career')}>
                <option value=''>— Select —</option>
                {CAREERS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="field-row">
            <Field label="Interest">
              <input value={char.interest || ''} onChange={u('interest')} placeholder="Secondary focus" />
            </Field>
            <Field label="Faction">
              <select value={char.faction || ''} onChange={u('faction')}>
                <option value=''>— Select —</option>
                {FACTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Motivations">
            <textarea value={char.motivations || ''} onChange={u('motivations')} placeholder="+Survival, +AGI Rights, -Hypercorp Expansion..." rows={2} />
          </Field>
          <Field label="Languages">
            <input value={char.languages || ''} onChange={u('languages')} placeholder="English (Native), Mandarin (Fluent)..." />
          </Field>
          <div className="field-row">
            <Field label="Gender">
              <input value={char.gender || ''} onChange={u('gender')} placeholder="any" />
            </Field>
            <Field label="Age (apparent)">
              <input value={char.age || ''} onChange={u('age')} placeholder="e.g. 34" />
            </Field>
          </div>
          <div className="field-row">
            <Field label="Muse Name">
              <input value={char.museName || ''} onChange={u('museName')} placeholder="ALI companion name" />
            </Field>
            <Field label="Rez Points">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <div>
                  <label style={{ fontSize: 10 }}>Unspent</label>
                  <input type="number" min={0} value={char.rezPoints || 0} onChange={uNum('rezPoints')} />
                </div>
                <div>
                  <label style={{ fontSize: 10 }}>Spent</label>
                  <input type="number" min={0} value={char.rezSpent || 0} onChange={uNum('rezSpent')} />
                </div>
              </div>
            </Field>
          </div>
        </div>

        {/* Backup info */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">// Backup Record</span></div>
          <Field label="Last Backup Date">
            <input value={char.lastBackupDate || ''} onChange={u('lastBackupDate')} placeholder="AF 10 / Session 4" />
          </Field>
          <Field label="Storage Location">
            <input value={char.backupLocation || ''} onChange={u('backupLocation')} placeholder="Firewall server, personal stack, cortical stack..." />
          </Field>
          <Field label="Mental Edits / Psychosurgery">
            <textarea value={char.mentalEdits || ''} onChange={u('mentalEdits')} rows={2} placeholder="Any deliberate edits to ego..." />
          </Field>
          <Field label="Additional Notes">
            <textarea value={char.additionalNotes || ''} onChange={u('additionalNotes')} rows={3} placeholder="Cover IDs, safe houses, contacts..." />
          </Field>
        </div>
      </div>

      {/* Right column */}
      <div>
        {/* Reputation */}
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-header">
            <span className="panel-title">// Reputation Networks</span>
            <span className="text-muted mono" style={{ fontSize: 11 }}>3 min / 1 mod / 1 maj per arc</span>
          </div>
          {REP_NETWORKS.map(rn => (
            <div key={rn.key} className="rep-row">
              <span className="rep-label">{rn.label}</span>
              <span className="text-second" style={{ fontSize: 11 }}>{rn.desc}</span>
              <input
                type="number" min={0} max={99}
                value={char.rep?.[rn.key] || 0}
                onChange={(e) => updateCharDeep(`rep.${rn.key}`, parseInt(e.target.value) || 0)}
                style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
              />
            </div>
          ))}
        </div>

        {/* Ego Traits */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">// Ego Traits</span></div>
          <div style={{ marginBottom: 12 }}>
            <label>Positive Traits</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
              {EGO_TRAITS_POSITIVE.map(t => (
                <button
                  key={t}
                  className="ghost"
                  onClick={() => toggleTrait('egoTraitsPositive', t)}
                  style={{
                    fontSize: 11, padding: '3px 8px',
                    borderColor: (char.egoTraitsPositive || []).includes(t) ? 'var(--success-dim)' : undefined,
                    color: (char.egoTraitsPositive || []).includes(t) ? 'var(--success)' : undefined,
                    background: (char.egoTraitsPositive || []).includes(t) ? 'rgba(0,221,136,0.08)' : undefined,
                  }}
                >{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label>Negative Traits</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
              {EGO_TRAITS_NEGATIVE.map(t => (
                <button
                  key={t}
                  className="ghost"
                  onClick={() => toggleTrait('egoTraitsNegative', t)}
                  style={{
                    fontSize: 11, padding: '3px 8px',
                    borderColor: (char.egoTraitsNegative || []).includes(t) ? 'var(--danger-dim)' : undefined,
                    color: (char.egoTraitsNegative || []).includes(t) ? 'var(--danger)' : undefined,
                    background: (char.egoTraitsNegative || []).includes(t) ? 'rgba(255,68,68,0.08)' : undefined,
                  }}
                >{t}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
