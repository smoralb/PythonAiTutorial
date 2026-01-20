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
    <div
      className="rounded-lg p-4 md:p-6 shadow-lg"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)'
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Level */}
        <div className="text-center">
          <div
            className="text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--highlight)' }}
          >
            {level}
          </div>
          <div
            className="text-sm mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            Nivel
          </div>
        </div>

        {/* XP */}
        <div className="text-center">
          <div
            className="text-2xl md:text-3xl font-bold"
            style={{ color: 'var(--text-accent)' }}
          >
            {progress.xp}
          </div>
          <div
            className="text-sm mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            XP Total
          </div>
        </div>

        {/* Streak */}
        <div className="text-center">
          <div
            className="text-2xl md:text-3xl font-bold"
            style={{ color: 'var(--warning)' }}
          >
            {progress.streak} 🔥
          </div>
          <div
            className="text-sm mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            Racha
          </div>
        </div>

        {/* Achievements */}
        <div className="text-center">
          <div
            className="text-2xl md:text-3xl font-bold"
            style={{ color: 'var(--success)' }}
          >
            {progress.achievements.length} 🏆
          </div>
          <div
            className="text-sm mt-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            Logros
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            {tier} - Nivel {level}
          </span>
          <span
            className="text-xs"
            style={{ color: 'var(--text-secondary)' }}
          >
            {xpNeeded} XP para nivel {level + 1}
          </span>
        </div>
        <div
          className="w-full h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${levelProgress}%`,
              backgroundColor: 'var(--highlight)'
            }}
          />
        </div>
      </div>

      {/* Completed Exercises Count */}
      <div className="text-center">
        <span
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          {progress.completedExercises.length} ejercicios completados
        </span>
      </div>
    </div>
  );
};

export default GamificationPanel;
