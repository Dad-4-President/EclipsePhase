// Compute EP2e derived stats from a character object

export function getDerivedStats(char) {
  if (!char) return {}
  const apt = char.aptitudes || {}

  const initiative = Math.round(((apt.REF || 0) + (apt.INT || 0)) / 5)
  const lucidity = (apt.WIL || 0) * 2
  const traumaThreshold = Math.ceil(lucidity / 5)
  const insanityRating = lucidity * 2

  const wt = char.morphWT || 6
  const dur = char.morphDUR || 30
  const dr = char.morphDR || 45

  // Pools: base = apt floor ÷ 10 rounded down, plus morph bonus
  const insightPool = Math.floor(((apt.COG || 0) + (apt.INT || 0)) / 20)
  const moxiePool   = Math.floor(((apt.SAV || 0) + (apt.WIL || 0)) / 20)
  const vigorPool   = Math.floor(((apt.REF || 0) + (apt.SOM || 0)) / 20)
  const flexPool    = 1 // base 1, morph can add

  return {
    initiative,
    lucidity,
    traumaThreshold,
    insanityRating,
    wt,
    dur,
    dr,
    insightPool: char.poolOverrides?.insight ?? insightPool,
    moxiePool:   char.poolOverrides?.moxie   ?? moxiePool,
    vigorPool:   char.poolOverrides?.vigor   ?? vigorPool,
    flexPool:    char.poolOverrides?.flex    ?? flexPool,
  }
}

export function getSkillTotal(skill, aptitudes) {
  if (!skill || !aptitudes) return 0
  const base = skill.aptOverride !== undefined ? skill.aptOverride : (aptitudes[skill.apt] || 0)
  // Perceive and Fray get apt×2 as base
  const aptBase = (skill.name === 'Perceive' || skill.name === 'Fray') ? base * 2 : base
  return aptBase + (skill.rank || 0)
}
