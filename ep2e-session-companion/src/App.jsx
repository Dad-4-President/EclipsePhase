import React, { useState } from 'react'
import { useStore } from './store/characterStore'
import IdentityPanel from './components/IdentityPanel'
import AptitudesPanel from './components/AptitudesPanel'
import SkillsPanel from './components/SkillsPanel'
import MorphPanel from './components/MorphPanel'
import GearPanel from './components/GearPanel'
import SnapshotPanel from './components/SnapshotPanel'
import AsyncPanel from './components/AsyncPanel'

const TABS = [
  { id: 'identity',   label: 'Ego Identity' },
  { id: 'aptitudes',  label: 'Aptitudes & Stats' },
  { id: 'skills',     label: 'Skills' },
  { id: 'morph',      label: 'Morph / Sleeve' },
  { id: 'gear',       label: 'Gear & Weapons' },
  { id: 'async',      label: 'Async / Psi' },
  { id: 'snapshots',  label: 'Snapshots' },
]

function CharacterCard({ char, active, onClick, onDelete }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '10px 12px', borderRadius: 6, cursor: 'pointer', marginBottom: 6,
        background: active ? 'var(--accent-glow)' : 'var(--bg-card)',
        border: `1px solid ${active ? 'var(--accent-dim)' : 'var(--border)'}`,
        transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: active ? 'var(--accent)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {char.name || '[ Unnamed Operative ]'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-second)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
            {[char.faction, char.career].filter(Boolean).join(' // ') || 'No faction assigned'}
          </div>
          {char.morphName && (
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
              Sleeved: {char.morphName}
            </div>
          )}
        </div>
        <button
          className="ghost danger"
          style={{ padding: '2px 6px', fontSize: 12, flexShrink: 0, marginLeft: 6 }}
          onClick={e => { e.stopPropagation(); onDelete() }}
        >✕</button>
      </div>
    </div>
  )
}

export default function App() {
  const store = useStore()
  const characters = useStore(s => s.characters)
  const activeCharId = useStore(s => s.activeCharId)
  const activeTab = useStore(s => s.activeTab)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activeChar = store.getActiveChar()

  const handleDelete = (id) => {
    if (confirm('Permanently delete this character and all their snapshots?')) {
      store.deleteCharacter(id)
    }
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'identity':  return <IdentityPanel />
      case 'aptitudes': return <AptitudesPanel />
      case 'skills':    return <SkillsPanel />
      case 'morph':     return <MorphPanel />
      case 'gear':      return <GearPanel />
      case 'async':     return <AsyncPanel />
      case 'snapshots': return <SnapshotPanel />
      default:          return null
    }
  }

  return (
    <div className="scanline" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <div style={{
          width: 240, flexShrink: 0, background: 'var(--bg-panel)',
          borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 14px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 2 }}>ECLIPSE PHASE 2e</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--accent)', letterSpacing: '0.08em' }}>CHARACTER MESH</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>v1.0 // YOUR MIND IS SOFTWARE</div>
          </div>

          {/* Character list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 8 }}>
              OPERATIVES [{characters.length}]
            </div>
            {characters.map(c => (
              <CharacterCard
                key={c.id} char={c}
                active={c.id === activeCharId}
                onClick={() => store.setActiveChar(c.id)}
                onDelete={() => handleDelete(c.id)}
              />
            ))}
            {characters.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', padding: '20px 0', lineHeight: 1.7 }}>
                No operatives registered.<br />Create a new character to begin.
              </div>
            )}
          </div>

          {/* New character button */}
          <div style={{ padding: '10px', borderTop: '1px solid var(--border)' }}>
            <button className="primary" style={{ width: '100%' }} onClick={() => store.createCharacter()}>
              + New Operative
            </button>
          </div>
        </div>
      )}

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          height: 50, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center',
          padding: '0 16px', background: 'var(--bg-panel)', gap: 12, flexShrink: 0,
        }}>
          <button className="ghost" style={{ padding: '4px 8px', fontSize: 16 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
          {activeChar ? (
            <>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>
                {activeChar.name || '[ Unnamed Operative ]'}
              </div>
              {activeChar.faction && (
                <div style={{ fontSize: 12, color: 'var(--text-second)', fontFamily: 'var(--font-mono)' }}>
                  {activeChar.faction}
                </div>
              )}
              {activeChar.morphName && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>
                  Sleeve: {activeChar.morphName} — DUR {activeChar.morphDUR}
                  {activeChar.damageTotal > 0 && (
                    <span style={{ color: 'var(--danger)', marginLeft: 8 }}>
                      ⚠ {activeChar.damageTotal} dmg
                    </span>
                  )}
                </div>
              )}
              {activeChar.isAsync && (
                <div style={{ fontSize: 11, color: 'var(--danger)', fontFamily: 'var(--font-mono)', border: '1px solid var(--danger-dim)', padding: '2px 6px', borderRadius: 2 }}>
                  ASYNC | INF {activeChar.infectionRating || 0}
                </div>
              )}
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Select or create an operative</div>
          )}
        </div>

        {activeChar ? (
          <>
            {/* Tab bar */}
            <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)', flexShrink: 0 }}>
              <div className="tab-bar" style={{ margin: 0, padding: '0 16px', borderBottom: 'none' }}>
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => store.setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
              {renderTab()}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--border-glow)', letterSpacing: '0.1em' }}>
              NO SIGNAL
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14, fontFamily: 'var(--font-mono)', textAlign: 'center', lineHeight: 1.8 }}>
              Your mind is software.<br />
              Your body is hardware.<br />
              Select an operative from the roster or create a new one.
            </div>
            <button className="primary" style={{ marginTop: 8 }} onClick={() => store.createCharacter()}>
              Initialize New Operative
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
