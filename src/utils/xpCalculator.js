// XP Calculator - Handles experience points and leveling system

// XP required for each level (exponential growth)
const XP_PER_LEVEL = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  450,    // Level 4
  700,    // Level 5
  1000,   // Level 6
  1350,   // Level 7
  1750,   // Level 8
  2200,   // Level 9
  2700,   // Level 10 (Principiante completed)
  3250,   // Level 11
  3850,   // Level 12
  4500,   // Level 13
  5200,   // Level 14
  6000,   // Level 15 (Intermedio completed)
  6850,   // Level 16
  7750,   // Level 17
  8700,   // Level 18
  9700,   // Level 19
  10800,  // Level 20 (Avanzado completed)
  12000   // Level 21 (AI Ready!)
];

// Level tier names
const LEVEL_TIERS = {
  1: 'Principiante',
  11: 'Intermedio',
  16: 'Avanzado',
  21: 'AI Ready'
};

// XP rewards based on exercise difficulty
export const XP_REWARDS = {
  QUICK_CHECK: 10,
  QUIZ: 15,
  FILL_BLANK: 20,
  PREDICT_OUTPUT: 25,
  FIND_ERROR: 30,
  KOTLIN_TRANSLATE: 35,
  CODE_CHALLENGE: 50
};

// Achievements and their XP rewards
export const ACHIEVEMENTS = {
  FIRST_EXERCISE: { id: 'first_exercise', name: 'Primer Paso', xp: 25, description: 'Completa tu primer ejercicio' },
  FIRST_MODULE: { id: 'first_module', name: 'Módulo Maestro', xp: 100, description: 'Completa tu primer módulo' },
  ARRAY_MASTER: { id: 'array_master', name: 'Array Master', xp: 150, description: 'Completa el módulo de NumPy' },
  DATA_WRANGLER: { id: 'data_wrangler', name: 'Data Wrangler', xp: 150, description: 'Completa el módulo de Pandas' },
  FIRST_MODEL: { id: 'first_model', name: 'First Model', xp: 200, description: 'Completa un ejercicio de scikit-learn' },
  NEURAL_ARCHITECT: { id: 'neural_architect', name: 'Neural Network Architect', xp: 250, description: 'Completa Deep Learning intro' },
  STREAK_3: { id: 'streak_3', name: 'Constancia Bronze', xp: 50, description: '3 días consecutivos' },
  STREAK_7: { id: 'streak_7', name: 'Constancia Silver', xp: 100, description: '7 días consecutivos' },
  STREAK_30: { id: 'streak_30', name: 'Constancia Gold', xp: 300, description: '30 días consecutivos' },
  PERFECTIONIST: { id: 'perfectionist', name: 'Perfeccionista', xp: 200, description: 'Completa 50 ejercicios sin errores' },
  AI_READY: { id: 'ai_ready', name: 'AI Engineer Ready!', xp: 500, description: 'Completa todos los módulos' }
};

export const xpCalculator = {
  // Calculate current level based on total XP
  calculateLevel(totalXP) {
    let level = 1;

    for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
      if (totalXP >= XP_PER_LEVEL[i]) {
        level = i + 1;
        break;
      }
    }

    return Math.min(level, XP_PER_LEVEL.length);
  },

  // Get XP required for next level
  getXPForNextLevel(currentLevel) {
    if (currentLevel >= XP_PER_LEVEL.length) {
      return XP_PER_LEVEL[XP_PER_LEVEL.length - 1];
    }
    return XP_PER_LEVEL[currentLevel];
  },

  // Get XP required for current level
  getXPForCurrentLevel(currentLevel) {
    if (currentLevel <= 1) return 0;
    return XP_PER_LEVEL[currentLevel - 1];
  },

  // Calculate progress to next level (0-100%)
  getLevelProgress(totalXP, currentLevel) {
    const currentLevelXP = this.getXPForCurrentLevel(currentLevel);
    const nextLevelXP = this.getXPForNextLevel(currentLevel);

    const xpInCurrentLevel = totalXP - currentLevelXP;
    const xpNeededForLevel = nextLevelXP - currentLevelXP;

    return Math.min(Math.round((xpInCurrentLevel / xpNeededForLevel) * 100), 100);
  },

  // Get level tier name
  getLevelTier(level) {
    const tiers = Object.keys(LEVEL_TIERS).map(Number).sort((a, b) => b - a);

    for (const tierLevel of tiers) {
      if (level >= tierLevel) {
        return LEVEL_TIERS[tierLevel];
      }
    }

    return LEVEL_TIERS[1];
  },

  // Calculate total XP from level and progress
  getTotalXP(level, progressPercent = 0) {
    const currentLevelXP = this.getXPForCurrentLevel(level);
    const nextLevelXP = this.getXPForNextLevel(level);
    const xpNeededForLevel = nextLevelXP - currentLevelXP;

    return currentLevelXP + Math.round((xpNeededForLevel * progressPercent) / 100);
  },

  // Check if player leveled up after gaining XP
  checkLevelUp(oldXP, newXP) {
    const oldLevel = this.calculateLevel(oldXP);
    const newLevel = this.calculateLevel(newXP);

    return {
      leveledUp: newLevel > oldLevel,
      oldLevel,
      newLevel
    };
  },

  // Get achievement by ID
  getAchievement(achievementId) {
    return ACHIEVEMENTS[achievementId.toUpperCase()] || null;
  },

  // Get all achievements as array
  getAllAchievements() {
    return Object.values(ACHIEVEMENTS);
  }
};
