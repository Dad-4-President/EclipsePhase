import React, { useState } from 'react'
import { useStore } from '../store/characterStore'

export default function SnapshotPanel() {
  const store = useStore()
  const char = useStore(s => s.getActiveChar())
  const activeCharId = useStore(s => s.activeCharId)
  const [label, setLabel] = useState('')
  const [diffA, setDiffA] = useState(null)
  const [diffB, setDiffB] = useState(null)
  const [showDiff, setShowDiff] = useState(false)
  const [exportText, setExportText] = useState('')
  const [importText, setImportText] = useState('')
  const [showImport, setShowImport] = useState(false)

  if (!char) return null

  const snapshots = store.getSnapshots(activeCharId)

  const handleSave = () => {
    store.saveSnapshot(label || `Session ${snapshots.length + 1}`)
    setLabel('')
  }

  const handleDiff = () => {
    if (!diffA || !diffB) return
    setShowDiff(true)
  }

  const snapA = snapshots.find(s => s.id === diffA)
  const snapB = snapshots.find(s => s.id === diffB)
  const diffs = showDiff && snapA && snapB ? store.diffSnapshots(snapA, snapB) : []

  const handleExport = () => {
    const json = store.exportCharacter(activeCharId)
    setExportText(json)
  }

  const handleImport = () => {
    const id = store.importCharacter(importText)
    if (id) {
      setImportText('')
      setShowImport(false)
      alert('Character imported successfully.')
    } else {
      alert('Import failed — check JSON format.')
    }
  }

  const handleDownload = () => {
    const json = store.exportCharacter(activeCharId)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${char.name || 'character'}_ep2e.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left: snapshot management */}
      <div>
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="panel-header"><span className="panel-title">// Save Snapshot</span></div>
          <p style={{ fontSize: 12, color: 'var(--text-second)', marginBottom: 10, lineHeight: 1.6 }}>
            Snapshots capture your full character state at a point in time — like a git commit for your ego.
            Save one after each session to track advancement.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              placeholder="Label (e.g. 'Session 4 — Kronos Incident')"
              value={label}
              onChange={e => setLabel(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
            />
            <button className="primary" onClick={handleSave} style={{ whiteSpace: 'nowrap' }}>Save</button>
          </div>
        </div>

        {/* Snapshot list */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">// Snapshot History</span>
            <span className="text-muted mono" style={{ fontSize: 11 }}>{snapshots.length} saved</span>
          </div>
          {snapshots.length === 0 && (
            <div className="text-muted" style={{ textAlign: 'center', padding: '20px 0', fontSize: 12 }}>
              No snapshots yet. Save one after this session.
            </div>
          )}
          {[...snapshots].reverse().map(snap => (
            <div key={snap.id} style={{
              background: 'var(--bg-input)', border: '1px solid var(--border)',
              borderRadius: 4, padding: '8px 10px', marginBottom: 6,
              borderLeftColor: (diffA === snap.id || diffB === snap.id) ? 'var(--accent)' : undefined,
              borderLeftWidth: (diffA === snap.id || diffB === snap.id) ? 2 : undefined,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13 }}>{snap.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                    {new Date(snap.timestamp).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <button className="ghost" style={{ fontSize: 11, padding: '3px 7px',
                    ...(diffA === snap.id ? { color: 'var(--accent)', borderColor: 'var(--accent-dim)' } : {})
                  }} onClick={() => setDiffA(diffA === snap.id ? null : snap.id)}>
                    {diffA === snap.id ? '✓ A' : 'Set A'}
                  </button>
                  <button className="ghost" style={{ fontSize: 11, padding: '3px 7px',
                    ...(diffB === snap.id ? { color: 'var(--warn)', borderColor: 'var(--warn-dim)' } : {})
                  }} onClick={() => setDiffB(diffB === snap.id ? null : snap.id)}>
                    {diffB === snap.id ? '✓ B' : 'Set B'}
                  </button>
                  <button className="ghost danger" style={{ fontSize: 11, padding: '3px 7px' }}
                    onClick={() => store.deleteSnapshot(activeCharId, snap.id)}>✕</button>
                </div>
              </div>
            </div>
          ))}

          {diffA && diffB && (
            <button className="primary" style={{ width: '100%', marginTop: 8 }} onClick={handleDiff}>
              Compare Snapshots →
            </button>
          )}
        </div>
      </div>

      {/* Right: diff view + export */}
      <div>
        {showDiff && (
          <div className="panel" style={{ marginBottom: 16 }}>
            <div className="panel-header">
              <span className="panel-title">// Delta Report</span>
              <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                <span style={{ color: 'var(--accent)' }}>{snapA?.label}</span>
                <span className="text-muted">→</span>
                <span style={{ color: 'var(--warn)' }}>{snapB?.label}</span>
              </div>
              <button className="ghost" style={{ fontSize: 11 }} onClick={() => setShowDiff(false)}>✕</button>
            </div>
            {diffs.length === 0 ? (
              <div className="text-muted" style={{ textAlign: 'center', padding: '20px 0', fontSize: 12 }}>
                No differences detected between these snapshots.
              </div>
            ) : (
              <div>
                {['added','changed','removed'].map(type => {
                  const items = diffs.filter(d => d.type === type)
                  if (!items.length) return null
                  const color = { added: 'var(--success)', changed: 'var(--warn)', removed: 'var(--danger)' }[type]
                  const label = { added: '+ Added', changed: '~ Changed', removed: '- Removed' }[type]
                  return (
                    <div key={type} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color, letterSpacing: '0.1em', marginBottom: 4 }}>{label.toUpperCase()}</div>
                      {items.map((d, i) => (
                        <div key={i} className={`diff-${type}`} style={{ padding: '4px 8px', borderRadius: 2, marginBottom: 3 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>{d.field}</span>
                            <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                              {d.before !== null && <span style={{ color: 'var(--text-muted)' }}>{String(d.before)}</span>}
                              {d.before !== null && d.after !== null && <span className="text-muted">→</span>}
                              {d.after !== null && <span style={{ color }}>{String(d.after)}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'right', marginTop: 6 }}>
                  {diffs.length} change{diffs.length !== 1 ? 's' : ''} detected
                </div>
              </div>
            )}
          </div>
        )}

        {/* Export/Import */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">// Export / Import</span></div>
          <p style={{ fontSize: 12, color: 'var(--text-second)', marginBottom: 12, lineHeight: 1.6 }}>
            Export your character and all snapshots as a JSON file. Share with your GM or import on another machine.
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button onClick={handleDownload} style={{ flex: 1 }}>⬇ Download JSON</button>
            <button className="ghost" onClick={handleExport} style={{ flex: 1 }}>Preview JSON</button>
          </div>
          {exportText && (
            <textarea
              value={exportText}
              readOnly
              rows={6}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 12 }}
              onClick={e => e.target.select()}
            />
          )}

          <button className="ghost" style={{ width: '100%', marginBottom: 8 }}
            onClick={() => setShowImport(!showImport)}>
            {showImport ? '✕ Cancel Import' : '⬆ Import Character JSON'}
          </button>
          {showImport && (
            <div>
              <textarea
                placeholder="Paste character JSON here..."
                value={importText}
                onChange={e => setImportText(e.target.value)}
                rows={6}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 8 }}
              />
              <button className="primary" style={{ width: '100%' }} onClick={handleImport}>Import</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
