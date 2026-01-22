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
    <div style={{ marginBottom: '2rem' }}>
      {/* Hero Stats Card */}
      <div
        className="card-mobile"
        style={{
          background: 'var(--gradient-card)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'var(--elevation-2)',
          padding: '1.5rem',
          borderRadius: '1.25rem',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Header with Tier Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 className="text-gradient title-responsive" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Tu Progreso
            </h2>
            <span className="badge badge-primary">
              {tier}
            </span>
          </div>
          <div
            className="level-badge-mobile"
            style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 700,
              background: 'var(--gradient-primary)',
              color: 'white',
              boxShadow: 'var(--elevation-3)'
            }}
          >
            {level}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {/* XP */}
          <div
            className="stat-card-mobile"
            style={{
              textAlign: 'center',
              padding: '1rem',
              borderRadius: '0.875rem',
              backgroundColor: 'var(--bg-tertiary)'
            }}
          >
            <div
              className="stat-value-mobile"
              style={{
                fontSize: '1.375rem',
                fontWeight: 700,
                marginBottom: '0.375rem',
                color: 'var(--text-accent)'
              }}
            >
              {progress.xp}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-secondary)'
              }}
            >
              XP Total
            </div>
          </div>

          {/* Streak */}
          <div
            className="stat-card-mobile"
            style={{
              textAlign: 'center',
              padding: '1rem',
              borderRadius: '0.875rem',
              backgroundColor: 'var(--bg-tertiary)'
            }}
          >
            <div className="stat-value-mobile" style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.375rem' }}>
              {progress.streak} 🔥
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-secondary)'
              }}
            >
              Racha
            </div>
          </div>

          {/* Achievements */}
          <div
            className="stat-card-mobile"
            style={{
              textAlign: 'center',
              padding: '1rem',
              borderRadius: '0.875rem',
              backgroundColor: 'var(--bg-tertiary)'
            }}
          >
            <div
              className="stat-value-mobile"
              style={{
                fontSize: '1.375rem',
                fontWeight: 700,
                marginBottom: '0.375rem',
                color: 'var(--success)'
              }}
            >
              {progress.achievements.length} 🏆
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-secondary)'
              }}
            >
              Logros
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}
            >
              Nivel {level} → {level + 1}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '0.375rem 0.75rem',
                borderRadius: '999px',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-secondary)'
              }}
            >
              {currentLevelXP} XP
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-secondary)'
              }}
            >
              {nextLevelXP} XP
            </span>
          </div>
        </div>

        {/* Exercises Count */}
        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              padding: '0.625rem 1rem',
              borderRadius: '0.625rem',
              display: 'inline-block',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-tertiary)'
            }}
          >
            💪 {progress.completedExercises.length} ejercicios completados
          </span>
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;
