import { useEffect, useState } from 'react';
import { progressManager } from '../../utils/progressManager';
import { xpCalculator } from '../../utils/xpCalculator';

const GamificationPanel = () => {
  const [progress, setProgress] = useState(null);
  const [level, setLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState(0);
  const [tier, setTier] = useState('Principiante');

  useEffect(() => {
    const loadProgress = () => {
      const data = progressManager.getProgress() || progressManager.initProgress();
      setProgress(data);

      const currentLevel = xpCalculator.calculateLevel(data.xp);
      setLevel(currentLevel);

      const progress = xpCalculator.getLevelProgress(data.xp, currentLevel);
      setLevelProgress(progress);

      const tierName = xpCalculator.getLevelTier(currentLevel);
      setTier(tierName);

      progressManager.updateStreak();
    };

    loadProgress();
  }, []);

  if (!progress) return null;

  const currentLevelXP = xpCalculator.getXPForCurrentLevel(level);
  const nextLevelXP = xpCalculator.getXPForNextLevel(level);
  const xpNeeded = nextLevelXP - progress.xp;

  return (
    <div className="animate-fade-in mb-8">
      {/* Hero Stats Card */}
      <div
        className="card card-hover p-6 md:p-8 mb-6"
        style={{
          background: 'var(--gradient-card)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Header with Tier Badge */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gradient">
              Tu Progreso
            </h2>
            <span className="badge badge-primary">
              {tier}
            </span>
          </div>
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl font-bold"
            style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              boxShadow: '0 8px 20px var(--shadow-lg)'
            }}
          >
            {level}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6">
          {/* XP */}
          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{ color: 'var(--text-accent)' }}
            >
              {progress.xp}
            </div>
            <div
              className="text-xs md:text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              XP Total
            </div>
          </div>

          {/* Streak */}
          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div className="text-2xl md:text-3xl font-bold mb-1">
              {progress.streak} 🔥
            </div>
            <div
              className="text-xs md:text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Racha
            </div>
          </div>

          {/* Achievements */}
          <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
            <div
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{ color: 'var(--success)' }}
            >
              {progress.achievements.length} 🏆
            </div>
            <div
              className="text-xs md:text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Logros
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span
              className="text-sm md:text-base font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Nivel {level} → {level + 1}
            </span>
            <span
              className="text-xs md:text-sm font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)'
              }}
            >
              {xpNeeded} XP restantes
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {currentLevelXP} XP
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {nextLevelXP} XP
            </span>
          </div>
        </div>

        {/* Exercises Count */}
        <div className="mt-6 text-center">
          <span
            className="text-sm md:text-base font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            💪 {progress.completedExercises.length} ejercicios completados
          </span>
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;
