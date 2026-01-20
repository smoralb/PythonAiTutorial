import { useState, useEffect } from 'react';
import { modulesData } from './data/modulesData';
import { progressManager } from './utils/progressManager';
import ThemeSelector from './components/ui/ThemeSelector';
import GamificationPanel from './components/ui/GamificationPanel';
import ExerciseRenderer from './components/exercises/ExerciseRenderer';
import ReactMarkdown from 'react-markdown';

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, module, lesson
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Initialize progress on first load
    progressManager.initProgress();
  }, []);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setCurrentView('module');
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentView('lesson');
  };

  const handleBack = () => {
    if (currentView === 'lesson') {
      setCurrentView('module');
      setSelectedLesson(null);
    } else if (currentView === 'module') {
      setCurrentView('dashboard');
      setSelectedModule(null);
    }
  };

  const handleExerciseComplete = (xp) => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-30 shadow-md"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {currentView !== 'dashboard' && (
              <button
                onClick={handleBack}
                className="p-2 rounded-lg transition-all"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                ← Volver
              </button>
            )}
            <h1
              className="text-xl md:text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              🐍 Python for AI Engineers
            </h1>
          </div>
          <ThemeSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div>
            <GamificationPanel key={refreshKey} />

            <div className="mt-8">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Módulos de Aprendizaje
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modulesData.map((module) => {
                  const totalExercises = module.lessons.reduce(
                    (sum, lesson) => sum + lesson.exercises.length,
                    0
                  );
                  const progress = progressManager.getModuleProgress(
                    module.id,
                    totalExercises
                  );

                  return (
                    <button
                      key={module.id}
                      onClick={() => handleModuleClick(module)}
                      className="text-left p-6 rounded-lg shadow-lg transition-all hover:scale-105"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div className="text-4xl mb-3">{module.icon}</div>
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {module.title}
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {module.description}
                      </p>

                      {/* Progress Bar */}
                      <div>
                        <div
                          className="flex justify-between text-xs mb-2"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span>Progreso</span>
                          <span>{progress}%</span>
                        </div>
                        <div
                          className="w-full h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: 'var(--success)'
                            }}
                          />
                        </div>
                      </div>

                      <div
                        className="mt-3 text-xs"
                        style={{ color: 'var(--text-accent)' }}
                      >
                        {module.lessons.length} lecciones • {totalExercises} ejercicios
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Module View */}
        {currentView === 'module' && selectedModule && (
          <div>
            <div className="mb-8">
              <div className="text-5xl mb-4">{selectedModule.icon}</div>
              <h2
                className="text-3xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {selectedModule.title}
              </h2>
              <p
                className="text-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                {selectedModule.description}
              </p>
            </div>

            <div className="space-y-4">
              {selectedModule.lessons.map((lesson, index) => {
                const completedExercises = lesson.exercises.filter((ex) =>
                  progressManager.isExerciseCompleted(
                    selectedModule.id,
                    lesson.id,
                    ex.id
                  )
                ).length;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className="w-full text-left p-6 rounded-lg shadow-lg transition-all hover:scale-102"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-2xl font-bold"
                            style={{ color: 'var(--highlight)' }}
                          >
                            {index + 1}
                          </span>
                          <h3
                            className="text-xl font-bold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {lesson.title}
                          </h3>
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {lesson.exercises.length} ejercicios •{' '}
                          {completedExercises}/{lesson.exercises.length} completados
                        </div>
                      </div>
                      {completedExercises === lesson.exercises.length && (
                        <span
                          className="text-2xl"
                          style={{ color: 'var(--success)' }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Lesson View */}
        {currentView === 'lesson' && selectedLesson && (
          <div>
            <div
              className="prose max-w-none p-6 rounded-lg mb-8"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <h2 style={{ color: 'var(--text-primary)' }}>
                {selectedLesson.title}
              </h2>
              <div style={{ color: 'var(--text-primary)' }}>
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 style={{ color: 'var(--text-primary)' }} {...props} />,
                    h2: ({node, ...props}) => <h2 style={{ color: 'var(--text-primary)' }} {...props} />,
                    h3: ({node, ...props}) => <h3 style={{ color: 'var(--text-primary)' }} {...props} />,
                    p: ({node, ...props}) => <p style={{ color: 'var(--text-primary)' }} {...props} />,
                    code: ({node, inline, ...props}) =>
                      inline ? (
                        <code style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-accent)', padding: '2px 6px', borderRadius: '4px' }} {...props} />
                      ) : (
                        <code style={{ color: 'var(--text-primary)' }} {...props} />
                      ),
                    pre: ({node, ...props}) => <pre style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' }} {...props} />,
                    strong: ({node, ...props}) => <strong style={{ color: 'var(--highlight)' }} {...props} />,
                    li: ({node, ...props}) => <li style={{ color: 'var(--text-primary)' }} {...props} />,
                  }}
                >
                  {selectedLesson.content}
                </ReactMarkdown>
              </div>
            </div>

            <div>
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Ejercicios
              </h3>
              {selectedLesson.exercises.map((exercise) => (
                <ExerciseRenderer
                  key={exercise.id}
                  exercise={exercise}
                  moduleId={selectedModule.id}
                  lessonId={selectedLesson.id}
                  onComplete={handleExerciseComplete}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="mt-12 py-6 text-center"
        style={{
          borderTop: '1px solid var(--border-color)',
          color: 'var(--text-secondary)'
        }}
      >
        <p>Python for AI Engineers • Hecho con React + Vite + Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
