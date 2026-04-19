import React from 'react'
import { useStore } from '../store/characterStore'
import { getDerivedStats } from '../utils/derived'
import { APTITUDES } from '../data/gameData'

export default function AptitudesPanel() {
  const updateCharDeep = useStore(s => s.updateCharDeep)
  const updateChar = useStore(s => s.updateChar)
  const char = useStore(s => s.getActiveChar())
  if (!char) return null

  const derived = getDerivedStats(char)

  const setApt = (apt, val) => {
    const v = Math.max(0, Math.min(30, parseInt(val) || 0))
    updateCharDeep(`aptitudes.${apt}`, v)
  }

  const setPool = (pool, val) => {
    const v = val === '' ? null : (parseInt(val) || 0)
    updateChar('poolOverrides', { ...(char.poolOverrides || {}), [pool]: v })
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Aptitudes */}
      <div className="panel">
        <div className="panel-header"><span className="panel-title">// Aptitudes</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
          {APTITUDES.map(apt => (
            <div key={apt} className="stat-box">
              <div className="stat-label">{apt}</div>
              <input
                type="number" min={0} max={30}
                value={char.aptitudes?.[apt] ?? 15}
                onChange={e => setApt(apt, e.target.value)}
                style={{
                  background: 'transparent', border: 'none', textAlign: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--accent)',
                  width: '100%', padding: '2px 0',
                }}
              />
              <div className="stat-check">check: {(char.aptitudes?.[apt] ?? 15) * 3}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          <label style={{ marginBottom: 10, display: 'block' }}>Derived Stats</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Initiative', value: derived.initiative },
              { label: 'Lucidity', value: derived.lucidity },
              { label: 'Trauma Threshold', value: derived.traumaThreshold },
              { label: 'Insanity Rating', value: derived.insanityRating },
            ].map(stat => (
              <div key={stat.label} className="stat-box">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right col: pools + morph combat stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Pools */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">// Action Pools</span>
            <span className="text-muted" style={{ fontSize: 11 }}>Override auto-calc if morph adds bonus</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { key: 'insight', label: 'Insight', calc: derived.insightPool, sub: 'COG+INT' },
              { key: 'moxie',   label: 'Moxie',   calc: derived.moxiePool,   sub: 'SAV+WIL' },
              { key: 'vigor',   label: 'Vigor',   calc: derived.vigorPool,   sub: 'REF+SOM' },
              { key: 'flex',    label: 'Flex',    calc: derived.flexPool,    sub: 'Base 1' },
            ].map(p => (
              <div key={p.key} className="stat-box">
                <div className="stat-label">{p.label} <span style={{ color: 'var(--text-muted)' }}>({p.sub})</span></div>
                <input
                  type="number" min={0}
                  placeholder={String(p.calc)}
                  value={char.poolOverrides?.[p.key] ?? ''}
                  onChange={e => setPool(p.key, e.target.value)}
                  style={{
                    background: 'transparent', border: 'none', textAlign: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--warn)',
                    width: '100%', padding: '2px 0',
                  }}
                />
                <div className="stat-check">auto: {p.calc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Morph combat stats */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">// Morph Combat Stats</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
            {[
              { label: 'Wound Threshold', value: derived.wt },
              { label: 'Durability', value: derived.dur },
              { label: 'Death Rating', value: derived.dr },
            ].map(s => (
              <div key={s.label} className="stat-box">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <label>Damage Taken</label>
              <input type="number" min={0} value={char.damageTotal || 0}
                onChange={e => updateChar('damageTotal', parseInt(e.target.value) || 0)}
                style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--danger)' }}
              />
            </div>
            <div>
              <label>Wounds</label>
              <input type="number" min={0} value={char.woundsTotal || 0}
                onChange={e => updateChar('woundsTotal', parseInt(e.target.value) || 0)}
                style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--danger)' }}
              />
            </div>
            <div>
              <label>Stress Taken</label>
              <input type="number" min={0} value={char.stress || 0}
                onChange={e => updateChar('stress', parseInt(e.target.value) || 0)}
                style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#c080ff' }}
              />
            </div>
            <div>
              <label>Traumas</label>
              <input type="number" min={0} value={char.traumas || 0}
                onChange={e => updateChar('traumas', parseInt(e.target.value) || 0)}
                style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#c080ff' }}
              />
            </div>
          </div>

          {/* Damage bar */}
          {char.morphDUR > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span className="text-muted" style={{ fontSize: 11 }}>Physical: {char.damageTotal || 0} / {char.morphDUR}</span>
                <span className="text-muted" style={{ fontSize: 11 }}>
                  {char.damageTotal >= char.morphDR ? '⚠ DEAD' : char.damageTotal >= char.morphDUR ? '⚠ INCAPACITATED' : ''}
                </span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-input)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, ((char.damageTotal || 0) / char.morphDR) * 100)}%`,
                  background: (char.damageTotal || 0) >= char.morphDUR ? 'var(--danger)' : 'var(--warn)',
                  borderRadius: 3, transition: 'width 0.3s',
                }} />
              </div>
            </div>
          )}
        </div>

        {/* Conditions */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">// Conditions</span></div>
          <textarea
            value={char.conditions || ''} rows={3}
            onChange={e => updateChar('conditions', e.target.value)}
            placeholder="Ongoing effects, impairments, status effects..."
          />
        </div>
      </div>
    </div>
  )
}
