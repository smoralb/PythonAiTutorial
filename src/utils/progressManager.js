// Progress Manager - Handles user progress storage and retrieval

const STORAGE_KEY = 'python_learning_progress';

export const progressManager = {
  // Initialize progress data
  initProgress() {
    const existing = this.getProgress();
    if (!existing) {
      const initialData = {
        completedExercises: [],
        moduleProgress: {},
        xp: 0,
        level: 1,
        streak: 0,
        lastVisit: new Date().toISOString(),
        achievements: [],
        theme: 'light'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return existing;
  },

  // Get current progress
  getProgress() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Save progress
  saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  // Mark exercise as completed
  completeExercise(moduleId, lessonId, exerciseId, earnedXP) {
    const progress = this.getProgress() || this.initProgress();
    const exerciseKey = `${moduleId}-${lessonId}-${exerciseId}`;

    if (!progress.completedExercises.includes(exerciseKey)) {
      progress.completedExercises.push(exerciseKey);
      progress.xp += earnedXP;

      // Update module progress
      if (!progress.moduleProgress[moduleId]) {
        progress.moduleProgress[moduleId] = {
          completedLessons: [],
          completedExercises: []
        };
      }
      progress.moduleProgress[moduleId].completedExercises.push(exerciseKey);

      this.saveProgress(progress);
    }

    return progress;
  },

  // Check if exercise is completed
  isExerciseCompleted(moduleId, lessonId, exerciseId) {
    const progress = this.getProgress();
    if (!progress) return false;

    const exerciseKey = `${moduleId}-${lessonId}-${exerciseId}`;
    return progress.completedExercises.includes(exerciseKey);
  },

  // Get module completion percentage
  getModuleProgress(moduleId, totalExercises) {
    const progress = this.getProgress();
    if (!progress || !progress.moduleProgress[moduleId]) return 0;

    const completed = progress.moduleProgress[moduleId].completedExercises.length;
    return Math.round((completed / totalExercises) * 100);
  },

  // Update streak
  updateStreak() {
    const progress = this.getProgress() || this.initProgress();
    const today = new Date().toDateString();
    const lastVisit = new Date(progress.lastVisit).toDateString();

    if (today !== lastVisit) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastVisit === yesterdayStr) {
        progress.streak += 1;
      } else {
        progress.streak = 1;
      }

      progress.lastVisit = new Date().toISOString();
      this.saveProgress(progress);
    }

    return progress.streak;
  },

  // Add achievement
  addAchievement(achievementId) {
    const progress = this.getProgress() || this.initProgress();

    if (!progress.achievements.includes(achievementId)) {
      progress.achievements.push(achievementId);
      this.saveProgress(progress);
      return true;
    }

    return false;
  },

  // Get all achievements
  getAchievements() {
    const progress = this.getProgress();
    return progress ? progress.achievements : [];
  },

  // Save theme preference
  saveTheme(theme) {
    const progress = this.getProgress() || this.initProgress();
    progress.theme = theme;
    this.saveProgress(progress);
  },

  // Get theme preference
  getTheme() {
    const progress = this.getProgress();
    return progress ? progress.theme : 'light';
  },

  // Reset all progress (for debugging/testing)
  resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    return this.initProgress();
  }
};
