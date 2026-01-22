import { useState } from 'react';
import { progressManager } from '../../utils/progressManager';
import { XP_REWARDS } from '../../utils/xpCalculator';

const ExerciseRenderer = ({ exercise, moduleId, lessonId, onComplete, animationDelay = 0 }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Normaliza texto eliminando todos los espacios para comparación flexible
  const normalizeForComparison = (text) => {
    if (!text) return '';
    return text.replace(/\s+/g, '');
  };

  const handleSubmit = () => {
    let correct = false;

    switch (exercise.type) {
      case 'quiz':
      case 'predict-output':
        correct = selectedOption === exercise.correctAnswer;
        break;
      case 'fill-blank':
        const answers = userAnswer.split(',').map(a => a.trim());
        const normalizedAnswers = answers.map(a => normalizeForComparison(a));
        const normalizedBlanks = exercise.blanks.map(b => normalizeForComparison(b));
        correct = JSON.stringify(normalizedAnswers) === JSON.stringify(normalizedBlanks);
        break;
      case 'kotlin-translate':
      case 'code-challenge':
        // Comparación flexible que ignora diferencias de espacios
        correct = normalizeForComparison(userAnswer) ===
                  normalizeForComparison(exercise.correctAnswer);
        break;
      default:
        correct = false;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct && !progressManager.isExerciseCompleted(moduleId, lessonId, exercise.id)) {
      const xp = XP_REWARDS[exercise.type.toUpperCase().replace('-', '_')] || XP_REWARDS.QUIZ;
      progressManager.completeExercise(moduleId, lessonId, exercise.id, xp);
      onComplete && onComplete(xp);
    }
  };

  const handleReset = () => {
    setUserAnswer('');
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const getExerciseTypeLabel = (type) => {
    const labels = {
      'quiz': 'Quiz',
      'fill-blank': 'Completa el Código',
      'predict-output': '¿Qué Imprime?',
      'find-error': 'Encuentra el Error',
      'kotlin-translate': 'Traduce de Kotlin',
      'code-challenge': 'Desafío de Código'
    };
    return labels[type] || type;
  };

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'quiz':
      case 'predict-output':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {exercise.question}
            </p>
            {exercise.code && (
              <pre
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  marginBottom: '0.5rem',
                  overflowX: 'auto',
                  fontSize: '0.8125rem'
                }}
              >
                <code style={{ color: 'var(--text-primary)' }}>{exercise.code}</code>
              </pre>
            )}
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                disabled={showFeedback}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.875rem 1rem',
                  borderRadius: '0.75rem',
                  border: '2px solid',
                  fontSize: '0.9375rem',
                  transition: 'all 0.2s ease',
                  backgroundColor:
                    selectedOption === index
                      ? 'var(--bg-tertiary)'
                      : 'var(--bg-secondary)',
                  borderColor:
                    showFeedback && index === exercise.correctAnswer
                      ? 'var(--success)'
                      : selectedOption === index
                      ? 'var(--highlight)'
                      : 'var(--border-color)',
                  color: 'var(--text-primary)',
                  boxShadow: selectedOption === index ? 'var(--elevation-1)' : 'none'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {exercise.question}
            </p>
            <pre
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '1rem',
                borderRadius: '0.75rem',
                overflowX: 'auto',
                fontSize: '0.8125rem'
              }}
            >
              <code style={{ color: 'var(--text-primary)' }}>{exercise.code}</code>
            </pre>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Separa respuestas con comas"
              disabled={showFeedback}
              className="input-m3"
              style={{ fontSize: '0.9375rem', padding: '0.875rem' }}
            />
          </div>
        );

      case 'kotlin-translate':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {exercise.question}
            </p>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Código Kotlin:
              </label>
              <pre
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  overflowX: 'auto',
                  fontSize: '0.8125rem'
                }}
              >
                <code style={{ color: 'var(--text-primary)' }}>{exercise.kotlinCode}</code>
              </pre>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Tu código Python:
              </label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showFeedback}
                rows={4}
                className="textarea-m3 font-mono"
                style={{ fontSize: '0.875rem', padding: '0.875rem' }}
              />
            </div>
          </div>
        );

      case 'code-challenge':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {exercise.question}
            </p>
            {exercise.hints && (
              <div
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '1rem',
                  borderRadius: '0.75rem'
                }}
              >
                <p style={{ fontWeight: 600, marginBottom: '0.625rem', fontSize: '0.875rem', color: 'var(--text-accent)' }}>
                  Pistas:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {exercise.hints.map((hint, i) => (
                    <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showFeedback}
              rows={5}
              placeholder="Escribe tu código aquí..."
              className="textarea-m3 font-mono"
              style={{ fontSize: '0.875rem', padding: '0.875rem' }}
            />
          </div>
        );

      default:
        return <p>Tipo de ejercicio no soportado</p>;
    }
  };

  return (
    <div
      className="exercise-card-mobile"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--elevation-1)',
        padding: '1.25rem',
        borderRadius: '1rem'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span
          style={{
            padding: '0.5rem 0.875rem',
            borderRadius: '0.625rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-accent)'
          }}
        >
          {getExerciseTypeLabel(exercise.type)}
        </span>
        {progressManager.isExerciseCompleted(moduleId, lessonId, exercise.id) && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--success)' }}>
            ✓ Completado
          </span>
        )}
      </div>

      {/* Exercise Content */}
      {renderExerciseContent()}

      {/* Feedback */}
      {showFeedback && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem',
            borderRadius: '0.875rem',
            backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `2px solid ${isCorrect ? 'var(--success)' : 'var(--error)'}`
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: isCorrect ? 'var(--success)' : 'var(--error)'
            }}
          >
            {isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}
          </p>
          <p style={{ lineHeight: 1.6, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{exercise.explanation}</p>
          {!isCorrect && exercise.correctAnswer && exercise.type !== 'quiz' && exercise.type !== 'predict-output' && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Solución:
              </p>
              <pre
                style={{
                  padding: '1rem',
                  borderRadius: '0.625rem',
                  overflowX: 'auto',
                  fontSize: '0.8125rem',
                  backgroundColor: 'var(--bg-tertiary)'
                }}
              >
                <code style={{ color: 'var(--text-primary)' }}>{exercise.correctAnswer}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={(exercise.type === 'quiz' || exercise.type === 'predict-output') && selectedOption === null}
            className="btn-primary btn-mobile"
            style={{
              padding: '0.875rem 1.5rem',
              borderRadius: '0.625rem',
              fontWeight: 600,
              fontSize: '0.9375rem',
              opacity: (exercise.type === 'quiz' || exercise.type === 'predict-output') && selectedOption === null ? 0.5 : 1
            }}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="btn-secondary btn-mobile"
            style={{
              padding: '0.875rem 1.5rem',
              borderRadius: '0.625rem',
              fontWeight: 600,
              fontSize: '0.9375rem'
            }}
          >
            Intentar de Nuevo
          </button>
        )}
      </div>
    </div>
  );
};

export default ExerciseRenderer;
