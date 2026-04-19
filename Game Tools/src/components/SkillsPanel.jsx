import React, { useState } from 'react'
import { useStore } from '../store/characterStore'
import { ACTIVE_SKILLS } from '../data/gameData'
import { getSkillTotal } from '../utils/derived'

function SkillTypeBadge({ type }) {
  return <span className={`skill-type-badge type-${type}`}>{type}</span>
}

export default function SkillsPanel() {
  const updateChar = useStore(s => s.updateChar)
  const char = useStore(s => s.getActiveChar())
  const [showAddActive, setShowAddActive] = useState(false)
  const [showAddKnow, setShowAddKnow] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', apt: 'COG', type: 'technical', rank: 0, field: '' })
  const [newKnow, setNewKnow] = useState({ name: '', apt: 'COG', rank: 0 })

  if (!char) return null
  const apt = char.aptitudes || {}
  const activeSkills = char.activeSkills || []
  const knowSkills = char.knowSkills || []

  const updateSkillRank = (idx, rank) => {
    const updated = activeSkills.map((s, i) => i === idx ? { ...s, rank: parseInt(rank) || 0 } : s)
    updateChar('activeSkills', updated)
  }

  const removeSkill = (idx) => {
    updateChar('activeSkills', activeSkills.filter((_, i) => i !== idx))
  }

  const addSkillFromTemplate = (template) => {
    const exists = activeSkills.find(s => s.name === template.name && !template.field)
    if (exists && !template.field) return
    const skill = { name: template.name, apt: template.apt, type: template.type, rank: 0, field: '' }
    updateChar('activeSkills', [...activeSkills, skill])
  }

  const addCustomSkill = () => {
    if (!newSkill.name) return
    updateChar('activeSkills', [...activeSkills, { ...newSkill, rank: parseInt(newSkill.rank) || 0 }])
    setNewSkill({ name: '', apt: 'COG', type: 'technical', rank: 0, field: '' })
    setShowAddActive(false)
  }

  const updateKnowRank = (idx, rank) => {
    const updated = knowSkills.map((s, i) => i === idx ? { ...s, rank: parseInt(rank) || 0 } : s)
    updateChar('knowSkills', updated)
  }

  const removeKnow = (idx) => updateChar('knowSkills', knowSkills.filter((_, i) => i !== idx))

  const addKnowSkill = () => {
    if (!newKnow.name) return
    updateChar('knowSkills', [...knowSkills, { ...newKnow, rank: parseInt(newKnow.rank) || 0 }])
    setNewKnow({ name: '', apt: 'COG', rank: 0 })
    setShowAddKnow(false)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Active Skills */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">// Active Skills</span>
          <button className="ghost" style={{ fontSize: 11 }} onClick={() => setShowAddActive(!showAddActive)}>
            + Add
          </button>
        </div>

        {/* Quick-add from template */}
        {showAddActive && (
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glow)', borderRadius: 4, padding: 12, marginBottom: 12 }}>
            <div style={{ marginBottom: 8 }}>
              <label>Quick-add from rulebook</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                {ACTIVE_SKILLS.filter(s => !activeSkills.find(a => a.name === s.name && !s.field)).map(s => (
                  <button key={s.name} className="ghost" style={{ fontSize: 11, padding: '2px 7px' }}
                    onClick={() => addSkillFromTemplate(s)}>{s.name}</button>
                ))}
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 4 }}>
              <label>Custom / Field Skill</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 90px 60px', gap: 6, marginTop: 4 }}>
                <input placeholder="Skill name" value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })} />
                <select value={newSkill.apt} onChange={e => setNewSkill({ ...newSkill, apt: e.target.value })}>
                  {['COG','INT','REF','SAV','SOM','WIL'].map(a => <option key={a}>{a}</option>)}
                </select>
                <select value={newSkill.type} onChange={e => setNewSkill({ ...newSkill, type: e.target.value })}>
                  {['combat','physical','social','technical','mental','psi','vehicle','field'].map(t => <option key={t}>{t}</option>)}
                </select>
                <input type="number" placeholder="Rank" value={newSkill.rank}
                  onChange={e => setNewSkill({ ...newSkill, rank: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <input placeholder="Field (e.g. Firearms)" value={newSkill.field}
                  onChange={e => setNewSkill({ ...newSkill, field: e.target.value })} />
                <button className="primary" style={{ whiteSpace: 'nowrap' }} onClick={addCustomSkill}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Header row */}
        <div className="skill-row" style={{ opacity: 0.5, fontSize: 11, padding: '2px 0' }}>
          <span>Skill</span><span className="skill-apt">APT</span>
          <span className="skill-total">Total</span><span>Type</span>
        </div>

        {activeSkills.length === 0 && (
          <div className="text-muted" style={{ textAlign: 'center', padding: '20px 0', fontSize: 12 }}>
            No skills added yet. Click + Add to get started.
          </div>
        )}

        {activeSkills.map((skill, idx) => {
          const total = getSkillTotal(skill, apt)
          const displayName = skill.field ? `${skill.name}: ${skill.field}` : skill.name
          return (
            <div key={idx} className="skill-row" style={{ gridTemplateColumns: '1fr 60px 70px 64px 32px' }}>
              <div>
                <div className="skill-name">{displayName}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>rank:</span>
                  <input
                    type="number" min={0} max={60}
                    value={skill.rank || 0}
                    onChange={e => updateSkillRank(idx, e.target.value)}
                    style={{ width: 45, padding: '1px 4px', fontSize: 11, textAlign: 'center' }}
                  />
                </div>
              </div>
              <span className="skill-apt">{skill.apt || '—'}</span>
              <span className="skill-total">{total}</span>
              <SkillTypeBadge type={skill.type || 'technical'} />
              <button className="ghost" style={{ padding: '2px 4px', fontSize: 12, color: 'var(--text-muted)' }}
                onClick={() => removeSkill(idx)}>✕</button>
            </div>
          )
        })}
      </div>

      {/* Know Skills */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">// Know Skills</span>
          <button className="ghost" style={{ fontSize: 11 }} onClick={() => setShowAddKnow(!showAddKnow)}>+ Add</button>
        </div>

        {showAddKnow && (
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glow)', borderRadius: 4, padding: 10, marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 60px', gap: 6 }}>
              <input placeholder="Know skill (e.g. Know: Hypercorp Politics)" value={newKnow.name}
                onChange={e => setNewKnow({ ...newKnow, name: e.target.value })} />
              <select value={newKnow.apt} onChange={e => setNewKnow({ ...newKnow, apt: e.target.value })}>
                {['COG','INT','REF','SAV','SOM','WIL'].map(a => <option key={a}>{a}</option>)}
              </select>
              <input type="number" placeholder="Rank" value={newKnow.rank}
                onChange={e => setNewKnow({ ...newKnow, rank: e.target.value })} />
            </div>
            <button className="primary" style={{ marginTop: 6, width: '100%' }} onClick={addKnowSkill}>Add Know Skill</button>
          </div>
        )}

        <div className="skill-row" style={{ opacity: 0.5, fontSize: 11, gridTemplateColumns: '1fr 60px 70px 32px', padding: '2px 0' }}>
          <span>Know Skill</span><span className="skill-apt">APT</span><span className="skill-total">Total</span><span></span>
        </div>

        {knowSkills.length === 0 && (
          <div className="text-muted" style={{ textAlign: 'center', padding: '20px 0', fontSize: 12 }}>
            Know skills reflect areas of expertise and background knowledge.
          </div>
        )}

        {knowSkills.map((skill, idx) => (
          <div key={idx} className="skill-row" style={{ gridTemplateColumns: '1fr 60px 70px 32px' }}>
            <div>
              <div className="skill-name" style={{ fontSize: 12 }}>{skill.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>rank:</span>
                <input type="number" min={0} max={99}
                  value={skill.rank || 0}
                  onChange={e => updateKnowRank(idx, e.target.value)}
                  style={{ width: 45, padding: '1px 4px', fontSize: 11, textAlign: 'center' }}
                />
              </div>
            </div>
            <span className="skill-apt">{skill.apt}</span>
            <span className="skill-total">{getSkillTotal(skill, apt)}</span>
            <button className="ghost" style={{ padding: '2px 4px', fontSize: 12, color: 'var(--text-muted)' }}
              onClick={() => removeKnow(idx)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}
