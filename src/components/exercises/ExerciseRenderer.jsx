import { useState } from 'react';
import { progressManager } from '../../utils/progressManager';
import { XP_REWARDS } from '../../utils/xpCalculator';

const ExerciseRenderer = ({ exercise, moduleId, lessonId, onComplete }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    let correct = false;

    switch (exercise.type) {
      case 'quiz':
      case 'predict-output':
        correct = selectedOption === exercise.correctAnswer;
        break;
      case 'fill-blank':
        const answers = userAnswer.split(',').map(a => a.trim());
        correct = JSON.stringify(answers) === JSON.stringify(exercise.blanks);
        break;
      case 'kotlin-translate':
      case 'code-challenge':
        // Simple validation - en producción usarías un evaluador más sofisticado
        correct = userAnswer.trim().replace(/\s+/g, ' ') ===
                  exercise.correctAnswer?.trim().replace(/\s+/g, ' ');
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
          <div className="space-y-3">
            <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
              {exercise.question}
            </p>
            {exercise.code && (
              <pre
                className="p-4 rounded-lg mb-4 overflow-x-auto"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <code style={{ color: 'var(--text-primary)' }}>{exercise.code}</code>
              </pre>
            )}
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                disabled={showFeedback}
                className="w-full text-left p-4 rounded-lg border-2 transition-all"
                style={{
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
                  color: 'var(--text-primary)'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
              {exercise.question}
            </p>
            <pre
              className="p-4 rounded-lg overflow-x-auto"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            >
              <code style={{ color: 'var(--text-primary)' }}>{exercise.code}</code>
            </pre>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Separa respuestas con comas"
              disabled={showFeedback}
              className="w-full p-3 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        );

      case 'kotlin-translate':
        return (
          <div className="space-y-4">
            <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
              {exercise.question}
            </p>
            <div>
              <label className="block mb-2 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Código Kotlin:
              </label>
              <pre
                className="p-4 rounded-lg overflow-x-auto"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <code style={{ color: 'var(--text-primary)' }}>{exercise.kotlinCode}</code>
              </pre>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Tu código Python:
              </label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showFeedback}
                rows={4}
                className="w-full p-3 rounded-lg border font-mono"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>
        );

      case 'code-challenge':
        return (
          <div className="space-y-4">
            <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
              {exercise.question}
            </p>
            {exercise.hints && (
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <p className="font-semibold mb-2" style={{ color: 'var(--text-accent)' }}>
                  Pistas:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {exercise.hints.map((hint, i) => (
                    <li key={i} style={{ color: 'var(--text-secondary)' }}>
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
              rows={6}
              placeholder="Escribe tu código aquí..."
              className="w-full p-3 rounded-lg border font-mono"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        );

      default:
        return <p>Tipo de ejercicio no soportado</p>;
    }
  };

  return (
    <div
      className="p-6 rounded-lg shadow-lg mb-6"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-accent)'
          }}
        >
          {getExerciseTypeLabel(exercise.type)}
        </span>
        {progressManager.isExerciseCompleted(moduleId, lessonId, exercise.id) && (
          <span style={{ color: 'var(--success)' }}>✓ Completado</span>
        )}
      </div>

      {/* Exercise Content */}
      {renderExerciseContent()}

      {/* Feedback */}
      {showFeedback && (
        <div
          className="mt-4 p-4 rounded-lg"
          style={{
            backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isCorrect ? 'var(--success)' : 'var(--error)'}`
          }}
        >
          <p
            className="font-semibold mb-2"
            style={{ color: isCorrect ? 'var(--success)' : 'var(--error)' }}
          >
            {isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}
          </p>
          <p style={{ color: 'var(--text-primary)' }}>{exercise.explanation}</p>
          {!isCorrect && exercise.correctAnswer && exercise.type !== 'quiz' && exercise.type !== 'predict-output' && (
            <div className="mt-3">
              <p className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                Solución:
              </p>
              <pre
                className="p-3 rounded overflow-x-auto"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <code style={{ color: 'var(--text-primary)' }}>{exercise.correctAnswer}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={(exercise.type === 'quiz' || exercise.type === 'predict-output') && selectedOption === null}
            className="px-6 py-3 rounded-lg font-semibold transition-all"
            style={{
              backgroundColor: 'var(--highlight)',
              color: '#fff',
              opacity: (exercise.type === 'quiz' || exercise.type === 'predict-output') && selectedOption === null ? 0.5 : 1
            }}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg font-semibold transition-all"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)'
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
