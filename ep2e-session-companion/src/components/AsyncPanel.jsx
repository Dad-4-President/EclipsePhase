import React from 'react'
import { useStore } from '../store/characterStore'
import { ASYNC_SUBSTRAINS, PSI_CHI_SLEIGHTS, PSI_GAMMA_SLEIGHTS } from '../data/gameData'

export default function AsyncPanel() {
  const updateChar = useStore(s => s.updateChar)
  const char = useStore(s => s.getActiveChar())
  if (!char) return null

  const u = (field) => (e) => updateChar(field, e.target.value)
  const uNum = (field) => (e) => updateChar(field, parseInt(e.target.value) || 0)

  const toggleSleight = (sleight) => {
    const cur = char.sleights || []
    const exists = cur.find(s => s.name === sleight.name)
    const next = exists ? cur.filter(s => s.name !== sleight.name) : [...cur, sleight]
    updateChar('sleights', next)
  }

  const infectionRating = char.infectionRating || 0
  const infectionColor = infectionRating >= 66 ? 'var(--danger)' : infectionRating >= 33 ? 'var(--warn)' : 'var(--success)'

  const updateInfluenceEvent = (idx, val) => {
    const events = [...(char.influenceEvents || ['','','','','',''])]
    events[idx] = val
    updateChar('influenceEvents', events)
  }

  return (
    <div>
      {/* Enable toggle */}
      <div className="panel" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ margin: 0 }}>Async Character</label>
        <button
          onClick={() => updateChar('isAsync', !char.isAsync)}
          style={{
            padding: '6px 20px',
            borderColor: char.isAsync ? 'var(--danger)' : 'var(--border)',
            color: char.isAsync ? 'var(--danger)' : 'var(--text-muted)',
            background: char.isAsync ? 'rgba(255,68,68,0.1)' : undefined,
          }}
        >
          {char.isAsync ? '⚠ ASYNC ACTIVE' : 'Not Async'}
        </button>
        {char.isAsync && (
          <p style={{ fontSize: 12, color: 'var(--text-second)', margin: 0 }}>
            Your ego carries the Watts-MacLeod strain — handle with care.
          </p>
        )}
      </div>

      {char.isAsync && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Left: Infection and sub-strain */}
          <div>
            <div className="panel" style={{ marginBottom: 16 }}>
              <div className="panel-header"><span className="panel-title">// Infection Status</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                <div>
                  <label>Sub-Strain</label>
                  <select value={char.subStrain || ''} onChange={u('subStrain')}>
                    <option value=''>— Select —</option>
                    {ASYNC_SUBSTRAINS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="stat-box">
                  <div className="stat-label">Infection Rating</div>
                  <input
                    type="number" min={0} max={99}
                    value={infectionRating}
                    onChange={uNum('infectionRating')}
                    style={{ background: 'transparent', border: 'none', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 24, color: infectionColor, width: '100%', padding: '2px 0' }}
                  />
                </div>
              </div>

              {/* Infection bar */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ height: 8, background: 'var(--bg-input)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '33%', top: 0, bottom: 0, width: 1, background: 'var(--warn)', opacity: 0.5 }} />
                  <div style={{ position: 'absolute', left: '66%', top: 0, bottom: 0, width: 1, background: 'var(--danger)', opacity: 0.5 }} />
                  <div style={{
                    height: '100%', width: `${Math.min(99, infectionRating)}%`,
                    background: infectionColor, borderRadius: 4, transition: 'all 0.3s',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>0</span>
                  <span style={{ color: 'var(--warn)' }}>33+ psi-chi boost</span>
                  <span style={{ color: 'var(--danger)' }}>66+ psi-gamma push</span>
                  <span>99</span>
                </div>
              </div>

              <div className="field">
                <label>Ongoing Influence Effects / Notes</label>
                <textarea value={char.conditions || ''} onChange={u('conditions')} rows={2} placeholder="Active Influence effects, behavioral notes..." />
              </div>
            </div>

            {/* Influence events */}
            <div className="panel">
              <div className="panel-header"><span className="panel-title">// Influence Events</span></div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>Roll d6 when triggered by the GM</p>
              {[0,1,2,3,4,5].map(i => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13, minWidth: 16 }}>{i + 1}</span>
                  <input
                    value={(char.influenceEvents || [])[i] || (i === 0 ? 'Physical damage. Take DV 1d6.' : '')}
                    onChange={e => updateInfluenceEvent(i, e.target.value)}
                    placeholder={i === 0 ? 'Physical damage. Take DV 1d6.' : `Event ${i + 1}...`}
                    style={{ fontSize: 12 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sleights */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">// Sleights</span>
              <span className="text-muted mono" style={{ fontSize: 11 }}>{(char.sleights || []).length} active</span>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ color: 'var(--text-second)' }}>Psi-Chi (passive)</label>
              <div style={{ marginTop: 6 }}>
                {PSI_CHI_SLEIGHTS.map(s => {
                  const active = (char.sleights || []).find(sl => sl.name === s.name)
                  return (
                    <div key={s.name}
                      onClick={() => toggleSleight(s)}
                      style={{
                        padding: '6px 8px', borderRadius: 3, cursor: 'pointer', marginBottom: 3,
                        background: active ? 'rgba(160,80,255,0.1)' : 'var(--bg-input)',
                        border: `1px solid ${active ? '#6030aa' : 'var(--border)'}`,
                        transition: 'all 0.12s',
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, fontWeight: active ? 500 : 400, color: active ? '#c080ff' : 'var(--text-primary)' }}>{s.name}</span>
                        <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          <span>{s.action}</span><span>{s.duration}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <label style={{ color: 'var(--danger)' }}>Psi-Gamma (active / infection cost)</label>
              <div style={{ marginTop: 6 }}>
                {PSI_GAMMA_SLEIGHTS.map(s => {
                  const active = (char.sleights || []).find(sl => sl.name === s.name)
                  return (
                    <div key={s.name}
                      onClick={() => toggleSleight(s)}
                      style={{
                        padding: '6px 8px', borderRadius: 3, cursor: 'pointer', marginBottom: 3,
                        background: active ? 'rgba(255,68,68,0.1)' : 'var(--bg-input)',
                        border: `1px solid ${active ? 'var(--danger-dim)' : 'var(--border)'}`,
                        transition: 'all 0.12s',
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, fontWeight: active ? 500 : 400, color: active ? 'var(--danger)' : 'var(--text-primary)' }}>{s.name}</span>
                        <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          <span>{s.action}</span>
                          <span style={{ color: 'var(--danger)' }}>+{s.infMod} inf</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {!char.isAsync && (
        <div className="panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.3 }}>🧠</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>This character is not an Async.</div>
          <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>Enable Async above to access Psi sleights and infection tracking.</div>
        </div>
      )}
    </div>
  )
}
