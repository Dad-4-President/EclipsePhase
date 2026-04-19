// Eclipse Phase 2e — Core Data

export const APTITUDES = ['COG', 'INT', 'REF', 'SAV', 'SOM', 'WIL']

export const ACTIVE_SKILLS = [
  { name: 'Athletics',         apt: 'SOM', type: 'physical',  field: false },
  { name: 'Deceive',           apt: 'SAV', type: 'social',    field: false },
  { name: 'Exotic Skill',      apt: null,  type: 'field',     field: true  },
  { name: 'Fray',              apt: 'REF', type: 'combat',    field: false, note: '×2 for ranged defense' },
  { name: 'Free Fall',         apt: 'SOM', type: 'physical',  field: false },
  { name: 'Guns',              apt: 'REF', type: 'combat',    field: false },
  { name: 'Hardware',          apt: 'COG', type: 'technical', field: true, fields: ['Aerospace','Electronics','Groundcraft','Industrial','Nautical','Robotics'] },
  { name: 'Infiltrate',        apt: 'REF', type: 'physical',  field: false },
  { name: 'Infosec',           apt: 'COG', type: 'technical', field: false },
  { name: 'Interface',         apt: 'COG', type: 'technical', field: false },
  { name: 'Kinesics',          apt: 'SAV', type: 'social',    field: false },
  { name: 'Medicine',          apt: 'COG', type: 'technical', field: true, fields: ['Biotech','Forensics','Paramedic','Pharmacology','Psychosurgery','Veterinary'] },
  { name: 'Melee',             apt: 'SOM', type: 'combat',    field: false },
  { name: 'Perceive',          apt: 'INT', type: 'mental',    field: false, note: '×2 base' },
  { name: 'Persuade',          apt: 'SAV', type: 'social',    field: false },
  { name: 'Pilot',             apt: 'REF', type: 'vehicle',   field: true, fields: ['Air','Ground','Nautical','Space'] },
  { name: 'Program',           apt: 'COG', type: 'technical', field: false },
  { name: 'Provoke',           apt: 'SAV', type: 'social',    field: false },
  { name: 'Psi',               apt: 'WIL', type: 'psi',       field: false },
  { name: 'Research',          apt: 'INT', type: 'technical', field: false },
  { name: 'Survival',          apt: 'INT', type: 'mental',    field: false },
]

export const REP_NETWORKS = [
  { key: '@rep',  label: '@-rep',  desc: 'The mesh — anarchist/autonomist social net' },
  { key: 'crep',  label: 'c-rep',  desc: 'CivicNet — hypercorps, inner system gov' },
  { key: 'frep',  label: 'f-rep',  desc: 'Fame — media, artists, celebrities' },
  { key: 'grep',  label: 'g-rep',  desc: 'Guanxi — criminal, triads, black market' },
  { key: 'irep',  label: 'i-rep',  desc: 'iNet — Firewall internal' },
  { key: 'rrep',  label: 'r-rep',  desc: 'Research Network Affiliation — Argonauts, scientists' },
  { key: 'xrep',  label: 'x-rep',  desc: 'ExploreNet — gatecrashers, first-in teams' },
]

export const BACKGROUNDS = [
  'Colonist','Drifter','Earth Evacuee','Enclaver','Freelancer',
  'Hyperelite','Indenture','Isolate','Lost','Lunar Colonist',
  'Martian','Original Space Colonist','Re-instantiated','Reinstated','Scumborn','Underclass','Uplift',
]

export const CAREERS = [
  'Academic','Covert Ops','Criminal','Enforcer','Explorer',
  'Face','Genehacker','Hacker','Icon','Investigator',
  'Journalist','Medic','Mindhacker','Paramedic','Pilot',
  'Rogue','Saboteur','Scientist','Soldier','Techie',
]

export const FACTIONS = [
  'Anarchist','Argonaut','Barsoomian','Belt Alliance','Brinker',
  'Criminal','Extropian','Firewall','Hypercorp','Jovian Republic',
  'Lunar Lagrange Alliance','Mercurial','Morningstar Constellation',
  'Nano-Ecologist','Orbital','Pirate','Precautionist','Reclaimer',
  'Scum','Singularity Seeker','Titanian Commonwealth','Ultimate','Venusian',
]

export const EGO_TRAITS_POSITIVE = [
  'Acumen','Adaptability','Alertness','Ambidextrous','Anomalous Mind',
  'Common Sense','Danger Sense','Data Control','Digital Ghost',
  'Direction Sense','Drone Whisperer','Dual Mind','Edge',
  'Empathy','Exceptional Aptitude','Fast Metabolism','Hard Knocks',
  'Hyper-Linguist','Indomitable','Instinctive Defense','Natural Immunity',
  'Pain Tolerance','Patron','Psi Chameleon','Psi Defense',
  'Resolve','Situational Awareness','Striking Looks','Totem','True Grit',
  'Well-Connected',
]

export const EGO_TRAITS_NEGATIVE = [
  'Addiction','Aggressive','Anomalous Mind','Bad Luck',
  'Blacklisted','Combat Paralysis','Edited Memories','Enemy',
  'Errant Fork','Feebleness','Identity Crisis','Implant Rejection',
  'Mental Disorder','Morphing Disorder','Neural Damage','No Backup Insurance',
  'Obliviousness','Phobia','Poor Coordination','Poor Instincts',
  'Psi Vulnerability','Real World Naiveté','Reputation','Scopophobia',
  'Sensitive','Timidity','Weak Immune System',
]

export const MORPHS = {
  biomorph: [
    { name: 'Flat',       mp: 0,  dur: 30, wt: 6,  dr: 45,  movement: 'Walker 4/20',  desc: 'Basic unmodified human template' },
    { name: 'Splicer',    mp: 1,  dur: 30, wt: 6,  dr: 45,  movement: 'Walker 4/20',  desc: 'Genetically optimized human' },
    { name: 'Exalt',      mp: 2,  dur: 35, wt: 7,  dr: 53,  movement: 'Walker 4/20',  desc: 'Enhanced human with superior genetics' },
    { name: 'Menton',     mp: 4,  dur: 35, wt: 7,  dr: 53,  movement: 'Walker 4/20',  desc: 'Cognitive enhancement specialist' },
    { name: 'Olympian',   mp: 4,  dur: 40, wt: 8,  dr: 60,  movement: 'Walker 4/20',  desc: 'Peak physical performance morph' },
    { name: 'Sylph',      mp: 4,  dur: 35, wt: 7,  dr: 53,  movement: 'Walker 4/20',  desc: 'Elegant social charisma morph' },
    { name: 'Bouncer',    mp: 4,  dur: 35, wt: 7,  dr: 53,  movement: 'Walker 4/20 / Micrograv 8/40', desc: 'Zero-g optimized' },
    { name: 'Fury',       mp: 6,  dur: 50, wt: 10, dr: 75,  movement: 'Walker 4/20',  desc: 'Combat-focused, heavy aug biomorph' },
    { name: 'Ghost',      mp: 6,  dur: 40, wt: 8,  dr: 60,  movement: 'Walker 4/20',  desc: 'Covert ops infiltration morph' },
    { name: 'Remade',     mp: 7,  dur: 40, wt: 8,  dr: 60,  movement: 'Walker 4/20',  desc: 'Post-human redesigned body plan' },
    { name: 'Hibernoid',  mp: 4,  dur: 35, wt: 7,  dr: 53,  movement: 'Walker 4/20',  desc: 'Long-duration space travel optimized' },
    { name: 'Ruster',     mp: 3,  dur: 35, wt: 7,  dr: 53,  movement: 'Walker 4/20',  desc: 'Martian surface adapted' },
    { name: 'Worker Pod', mp: 2,  dur: 35, wt: 7,  dr: 53,  movement: 'Walker 4/20',  desc: 'Industrial labor pod morph' },
    { name: 'Pleasure Pod',mp:4,  dur: 30, wt: 6,  dr: 45,  movement: 'Walker 4/20',  desc: 'Social/companion pod' },
  ],
  synthmorph: [
    { name: 'Case',       mp: 0,  dur: 20, wt: 4,  dr: 40,  movement: 'Walker 4/20',  armor: '4/4',   desc: 'Cheap disposable shell' },
    { name: 'Synth',      mp: 3,  dur: 40, wt: 8,  dr: 80,  movement: 'Walker 4/20',  armor: '8/8',   desc: 'Standard humanoid shell' },
    { name: 'Savant',     mp: 4,  dur: 30, wt: 6,  dr: 60,  movement: 'Walker 4/20',  armor: '8/8',   desc: 'Cognitively enhanced synth' },
    { name: 'Swarmanoid', mp: 3,  dur: 25, wt: 5,  dr: 50,  movement: 'Swarm 2/8',    armor: '2/2',   desc: 'Swarm of microbots' },
    { name: 'Dragonfly',  mp: 1,  dur: 20, wt: 4,  dr: 40,  movement: 'Rotor 4/32 / Walker 2/8', armor: '2/2', desc: 'Drone-sized recon shell' },
    { name: 'Arachnoid',  mp: 4,  dur: 40, wt: 8,  dr: 80,  movement: 'Walker 4/20 / Climb 4/20', armor: '8/8', desc: 'Spider-like multi-limbed shell' },
    { name: 'Flexbot',    mp: 3,  dur: 15, wt: 3,  dr: 30,  movement: 'Walker 4/20',  armor: '4/4',   desc: 'Modular reconfigurable shell' },
    { name: 'Reaper',     mp: 12, dur: 50, wt: 10, dr: 100, movement: 'Walker 4/20 / Thrust Vector 8/40', armor: '16/16', desc: 'Combat frame, heavily armored' },
  ],
  uplift: [
    { name: 'Neo-Avian',  mp: 0,  dur: 20, wt: 4,  dr: 30,  movement: 'Walker 2/8 / Winged 8/32', desc: 'Uplifted bird (corvid/parrot)' },
    { name: 'Neo-Bonobo', mp: 1,  dur: 30, wt: 6,  dr: 45,  movement: 'Walker 4/20 / Climb 4/20', desc: 'Uplifted bonobo' },
    { name: 'Neo-Gorilla', mp: 3, dur: 40, wt: 8,  dr: 60,  movement: 'Walker 4/20 / Climb 4/20', desc: 'Uplifted gorilla — great strength' },
    { name: 'Neo-Octopus', mp: 3, dur: 30, wt: 6,  dr: 45,  movement: 'Swim 4/20',  desc: 'Uplifted octopus — cephalopod' },
    { name: 'Neo-Pig',    mp: 1,  dur: 30, wt: 6,  dr: 45,  movement: 'Walker 4/20', desc: 'Uplifted pig' },
    { name: 'Neo-Porpoise',mp:2,  dur: 30, wt: 6,  dr: 45,  movement: 'Swim 8/40',  desc: 'Uplifted dolphin/porpoise' },
    { name: 'Neo-Chimpanzee',mp:1,dur:30, wt: 6,  dr: 45,  movement: 'Walker 4/20 / Climb 4/20', desc: 'Uplifted chimpanzee' },
  ],
  infomorph: [
    { name: 'Digimorph',  mp: 0,  dur: 20, wt: 4,  dr: 40,  movement: 'Digital',     desc: 'Basic digital existence — no physical shell' },
    { name: 'Ikon',       mp: 1,  dur: 25, wt: 5,  dr: 50,  movement: 'Digital',     desc: 'Social-media-optimized digital presence' },
    { name: 'Agent',      mp: 2,  dur: 30, wt: 6,  dr: 60,  movement: 'Digital',     desc: 'Autonomous software agent frame' },
    { name: 'Spoof',      mp: 1,  dur: 25, wt: 5,  dr: 50,  movement: 'Digital',     desc: 'Identity-spoofing infomorph' },
    { name: 'Neo-Synth (Ghost Rider)',mp:0,dur:20,wt:4,dr:40,movement:'Digital/Shell', desc: 'Passenger in a synthmorph system' },
  ],
}

export const WARE_LIST = [
  // Bioware
  { name: 'Adrenal Boost',       type: 'B', cost: 'Mod',   desc: 'Boosts REF by 20 for short period; SOM check for +1d6 DV to self' },
  { name: 'Bioweave Armor',       type: 'B', cost: 'Mod',   desc: '+2/+3 Energy/Kinetic armor' },
  { name: 'Clean Metabolism',     type: 'B', cost: 'Low',   desc: 'Symbiotic bacteria keep body odor and waste minimal' },
  { name: 'Cortical Stack',       type: 'B', cost: 'Low',   desc: 'Memory diamond backup device — standard Firewall gear' },
  { name: 'Enhanced Hearing',     type: 'B', cost: 'Low',   desc: 'Wider frequency range, better signal/noise ratio' },
  { name: 'Enhanced Smell',       type: 'B', cost: 'Low',   desc: 'Analytic olfaction' },
  { name: 'Enhanced Vision',      type: 'B', cost: 'Low',   desc: 'Wider spectrum, better acuity, low light' },
  { name: 'Grip Pads',            type: 'B', cost: 'Low',   desc: 'Gecko-style grip surfaces; climb most surfaces' },
  { name: 'Medichines',           type: 'N', cost: 'High',  desc: 'Wound healing and toxin resistance nanoware' },
  { name: 'Muscle Augmentation',  type: 'B', cost: 'Mod',   desc: '+10 SOM' },
  { name: 'Neurachem',            type: 'B', cost: 'High',  desc: '+20 REF; enhanced neural signal processing' },
  { name: 'Oxygen Reserve',       type: 'B', cost: 'Low',   desc: '30min internal oxygen supply' },
  { name: 'Reflex Boosters',      type: 'B', cost: 'High',  desc: '+10 REF; faster reaction time' },
  { name: 'Toxin Filters',        type: 'B', cost: 'Low',   desc: 'Resistance to environmental toxins' },
  // Cyberware
  { name: 'Access Jacks',         type: 'C', cost: 'Low',   desc: 'Direct hardwire mesh connection; skull port(s)' },
  { name: 'Cyberbrain',           type: 'C', cost: 'High',  desc: 'Replaces biological brain with cybernetic equivalent' },
  { name: 'Dead Switch',          type: 'C', cost: 'Low',   desc: 'Kills morph and destroys cortical stack if captured' },
  { name: 'Ghost Implant',        type: 'C', cost: 'Mod',   desc: 'Concealed hidden mesh insert' },
  { name: 'Mesh Inserts',         type: 'C', cost: 'Low',   desc: 'Standard wireless mesh connectivity and AR overlay' },
  { name: 'Mnemonics',            type: 'C', cost: 'Low',   desc: 'Perfect recall memory recording' },
  { name: 'Puppet Sock',          type: 'C', cost: 'Mod',   desc: 'Remote control override for body' },
  { name: 'Skillware',            type: 'C', cost: 'High',  desc: 'Slotted skillsoft chips, up to 120pts of skills' },
  { name: 'Wrist-Mounted Tools',  type: 'C', cost: 'Mod',   desc: 'Retractable multi-tool system' },
  // Meshware
  { name: 'Copylock',             type: 'M', cost: 'Mod',   desc: 'Prevents unauthorized forking' },
  { name: 'Encryption',           type: 'M', cost: 'Low',   desc: 'Strong crypto for all communications' },
  { name: 'Oracles',              type: 'M', cost: 'Mod',   desc: 'AI-assisted attention management; avoids distraction' },
  { name: 'Persistence',          type: 'M', cost: 'Low',   desc: 'Maintains functions even when wounded' },
  // Nanoware
  { name: 'Healing Spray',        type: 'N', cost: 'Low',   desc: 'Topical nanite wound treatment' },
  { name: 'Nanophages',           type: 'N', cost: 'Mod',   desc: 'Defense against hostile nanobots' },
  { name: 'Skinlink',             type: 'N', cost: 'Low',   desc: 'Skin-contact data transfer via touch' },
]

export const WEAPONS_RANGED = [
  { name: 'Shredder',         dv: '2d10+6',  mode: 'SA/BF/FA', range: 25,  skill: 'Guns', ammo: 100,  desc: 'Flechette SMG-equivalent' },
  { name: 'Holdout Pistol',   dv: '2d6',     mode: 'SA',       range: 25,  skill: 'Guns', ammo: 6,    desc: 'Compact concealable sidearm' },
  { name: 'Medium Pistol',    dv: '2d6+2',   mode: 'SA',       range: 30,  skill: 'Guns', ammo: 15,   desc: 'Standard sidearm' },
  { name: 'Heavy Pistol',     dv: '2d10',    mode: 'SA',       range: 40,  skill: 'Guns', ammo: 12,   desc: 'Large frame handgun' },
  { name: 'SMG',              dv: '2d10',    mode: 'SA/BF/FA', range: 75,  skill: 'Guns', ammo: 30,   desc: 'Submachine gun' },
  { name: 'Assault Rifle',    dv: '2d10+2',  mode: 'SA/BF/FA', range: 150, skill: 'Guns', ammo: 30,   desc: 'Standard infantry rifle' },
  { name: 'Sniper Rifle',     dv: '2d10+10', mode: 'SA',       range: 500, skill: 'Guns', ammo: 12,   desc: 'Long-range precision rifle' },
  { name: 'Plasma Rifle',     dv: '3d10+20', mode: 'SA',       range: 75,  skill: 'Guns', ammo: 10,   desc: 'Anti-material plasma weapon' },
  { name: 'Seeker Rifle',     dv: '3d10',    mode: 'SA',       range: 300, skill: 'Guns', ammo: 8,    desc: 'Smart munitions launcher' },
  { name: 'Laser Pulser',     dv: '2d10',    mode: 'SA/BF',    range: 200, skill: 'Guns', ammo: 30,   desc: 'Standard energy weapon' },
  { name: 'Agonizer',         dv: 'special', mode: 'SA',       range: 20,  skill: 'Guns', ammo: 20,   desc: 'Directed energy pain compliance' },
  { name: 'Needler',          dv: '1d6',     mode: 'SA/BF',    range: 20,  skill: 'Guns', ammo: 20,   desc: 'Dart/needle drug delivery weapon' },
  { name: 'Sprayer',          dv: 'special', mode: 'SA',       range: 15,  skill: 'Guns', ammo: 20,   desc: 'Area-effect chemical/drug delivery' },
]

export const WEAPONS_MELEE = [
  { name: 'Unarmed Strike',   dv: '1d6',     skill: 'Melee',  desc: 'Bare hands / standard unarmed' },
  { name: 'Blade',            dv: '1d10+2',  skill: 'Melee',  desc: 'Knife, blade, or similar' },
  { name: 'Sword',            dv: '2d10',    skill: 'Melee',  desc: 'Long blade weapon' },
  { name: 'Monofilament Sword',dv:'2d10+3',  skill: 'Melee',  desc: 'Monomolecular edged blade' },
  { name: 'Shock Baton',      dv: '1d6+stun',skill: 'Melee',  desc: 'Stunning impact weapon' },
  { name: 'Vibroblade',       dv: '1d10+4',  skill: 'Melee',  desc: 'High-frequency vibrating blade' },
  { name: 'Flex Cutter',      dv: '1d10+3',  skill: 'Melee',  desc: 'Flexible adaptive blade' },
  { name: 'Extendable Baton', dv: '1d10',    skill: 'Melee',  desc: 'Collapsed compact, extends to baton' },
  { name: 'Claws',            dv: '1d10+4',  skill: 'Melee',  desc: 'Retractable claw ware' },
  { name: 'Densiplast Gloves',dv: '1d10+2',  skill: 'Melee',  desc: 'Knuckle-reinforced strike augment' },
]

export const ARMOR_LIST = [
  { name: 'None',                energy: 0,  kinetic: 0,   desc: 'No armor' },
  { name: 'Light Body Armor',    energy: 4,  kinetic: 6,   desc: 'Standard concealed protection' },
  { name: 'Body Armor',          energy: 6,  kinetic: 8,   desc: 'Full torso protection' },
  { name: 'Heavy Body Armor',    energy: 10, kinetic: 12,  desc: 'Military-grade hard shell' },
  { name: 'Combat Armor',        energy: 12, kinetic: 12,  desc: 'Full combat hardsuit' },
  { name: 'Riot Shield',         energy: 2,  kinetic: 4,   desc: 'Supplemental ballistic shield' },
  { name: 'Refractive Coating',  energy: 4,  kinetic: 0,   desc: 'Energy-dispersing surface treatment' },
  { name: 'Smart Skin',          energy: 2,  kinetic: 2,   desc: 'Reactive nanobot skin layer' },
  { name: 'Armored Spacesuit',   energy: 10, kinetic: 8,   desc: 'Vacuum-rated combat spacesuit' },
  { name: 'Industrial Armor',    energy: 6,  kinetic: 10,  desc: 'Heavy industrial protection' },
]

export const ASYNC_SUBSTRAINS = [
  'Architect','Beast','Haunter','Stranger','Xenomorph',
]

export const PSI_CHI_SLEIGHTS = [
  { name: 'Appetites',      action: 'Sustained', duration: 'Sustained', infMod: 0,  desc: 'Sense/influence basic drives' },
  { name: 'Aura Sense',     action: 'Quick',     duration: 'Instant',   infMod: 0,  desc: 'Sense emotional state of target' },
  { name: 'Blind Spot',     action: 'Sustained', duration: 'Sustained', infMod: 0,  desc: 'Avoid notice from target' },
  { name: 'Charisma',       action: 'Quick',     duration: 'Action Turn',infMod: 0, desc: 'Enhanced social presence' },
  { name: 'Instinct',       action: 'Auto',      duration: 'Always',    infMod: 0,  desc: 'Enhanced danger sense' },
  { name: 'Numeracy',       action: 'Auto',      duration: 'Always',    infMod: 0,  desc: 'Rapid mathematical intuition' },
  { name: 'Pattern Recognition',action:'Auto',   duration: 'Always',    infMod: 0,  desc: 'Identify patterns automatically' },
  { name: 'Scramble',       action: 'Quick',     duration: 'Action Turn',infMod: 0, desc: 'Obscure own psi signature' },
  { name: 'Sense Infector', action: 'Auto',      duration: 'Always',    infMod: 0,  desc: 'Detect exsurgent infections' },
  { name: 'Timekeeping',    action: 'Auto',      duration: 'Always',    infMod: 0,  desc: 'Perfect internal time sense' },
  { name: 'Unconscious Lead',action:'Sustained', duration: 'Sustained', infMod: 0,  desc: 'Subtle behavioral influence' },
]

export const PSI_GAMMA_SLEIGHTS = [
  { name: 'Basilisk Stare',  action: 'Complex',  duration: 'Sustained', infMod: 1,  desc: 'Freeze target with gaze' },
  { name: 'Deep Scan',       action: 'Complex',  duration: 'Sustained', infMod: 1,  desc: 'Read memories and emotions' },
  { name: 'Dreamscape',      action: 'Complex',  duration: 'Hours',     infMod: 2,  desc: 'Enter and shape target dreams' },
  { name: 'Ego Sense',       action: 'Quick',    duration: 'Instant',   infMod: 1,  desc: 'Detect transhuman egos nearby' },
  { name: 'Empathic Scan',   action: 'Quick',    duration: 'Action Turn',infMod: 1, desc: 'Read surface emotions' },
  { name: 'Illusion',        action: 'Complex',  duration: 'Sustained', infMod: 1,  desc: 'Impose false sensory perceptions' },
  { name: 'Implant Memory',  action: 'Complex',  duration: 'Sustained', infMod: 2,  desc: 'Plant false memories' },
  { name: 'Mindlink',        action: 'Quick',    duration: 'Sustained', infMod: 1,  desc: 'Telepathic link with target' },
  { name: 'Neural Hardening',action: 'Complex',  duration: 'Minutes',   infMod: 1,  desc: 'Harden target vs psi attacks' },
  { name: 'Psychic Stab',    action: 'Quick',    duration: 'Instant',   infMod: 1,  desc: 'Direct neural damage' },
  { name: 'Thought Browse',  action: 'Sustained',duration: 'Sustained', infMod: 1,  desc: 'Passive thought reading' },
]

export const BLANK_CHARACTER = {
  // Identity
  name: '',
  aliases: '',
  background: '',
  career: '',
  interest: '',
  faction: '',
  motivations: '',
  languages: '',
  gender: '',
  sex: '',
  age: '',
  museName: '',
  egoTraitsPositive: [],
  egoTraitsNegative: [],
  rezPoints: 0,
  rezSpent: 0,

  // Aptitudes
  aptitudes: { COG: 15, INT: 15, REF: 15, SAV: 15, SOM: 15, WIL: 15 },

  // Skills
  activeSkills: [],
  knowSkills: [],

  // Reputation
  rep: { '@rep': 0, crep: 0, frep: 0, grep: 0, irep: 0, rrep: 0, xrep: 0 },
  fakeIds: [],

  // Morph
  morphName: '',
  morphType: 'biomorph',
  morphMP: 0,
  morphDUR: 30,
  morphWT: 6,
  morphDR: 45,
  morphMovement: '',
  morphWare: [],
  morphTraits: '',
  morphNotes: '',
  morphArmor: { energy: 0, kinetic: 0 },
  wornArmor: 'None',
  damageTotal: 0,
  woundsTotal: 0,

  // Gear
  rangedWeapons: [],
  meleeWeapons: [],
  gearPacks: [],
  gearNotes: '',

  // Mental
  stress: 0,
  traumas: 0,
  conditions: '',
  psychosurgeryNotes: '',

  // Pools (auto-calculated but can override)
  poolOverrides: { insight: null, moxie: null, vigor: null, flex: null },

  // Backup / forks
  lastBackupDate: '',
  backupLocation: '',
  mentalEdits: '',
  activeForks: [],
  additionalNotes: '',

  // Async
  isAsync: false,
  subStrain: '',
  infectionRating: 0,
  sleights: [],
  influenceEvents: ['','','','','',''],
}
