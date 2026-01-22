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
        <div className="container mx-auto header-mobile" style={{ padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {currentView !== 'dashboard' && (
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-xl transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--elevation-1)'
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
      <main className="container mx-auto" style={{ padding: '2rem 1.5rem' }}>
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div>
            <GamificationPanel key={refreshKey} />

            <div style={{ marginTop: '3rem' }}>
              <h2
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  marginBottom: '2rem'
                }}
              >
                Módulos de Aprendizaje
              </h2>

              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {modulesData.map((module, index) => {
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
                      className="text-left transition-all hover:scale-[1.02] card-hover card-mobile"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        boxShadow: 'var(--elevation-1)',
                        padding: '1.5rem',
                        borderRadius: '1.25rem'
                      }}
                    >
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{module.icon}</div>
                      <h3
                        style={{
                          color: 'var(--text-primary)',
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          marginBottom: '0.75rem'
                        }}
                      >
                        {module.title}
                      </h3>
                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.875rem',
                          marginBottom: '1.25rem',
                          lineHeight: 1.6
                        }}
                      >
                        {module.description}
                      </p>

                      {/* Progress Bar */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            marginBottom: '0.5rem',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          <span>Progreso</span>
                          <span style={{ fontWeight: 600 }}>{progress}%</span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: '0.5rem',
                            borderRadius: '999px',
                            overflow: 'hidden',
                            backgroundColor: 'var(--bg-tertiary)'
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              borderRadius: '999px',
                              width: `${progress}%`,
                              background: 'var(--gradient-success)',
                              transition: 'width 0.5s ease'
                            }}
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: 'var(--text-accent)'
                        }}
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
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{selectedModule.icon}</div>
              <h2
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}
              >
                {selectedModule.title}
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.125rem',
                  lineHeight: 1.6
                }}
              >
                {selectedModule.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                    className="text-left transition-all card-hover"
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--elevation-1)',
                      padding: '1.75rem',
                      borderRadius: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.875rem' }}>
                          <span
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: 700,
                              width: '2.5rem',
                              height: '2.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '0.75rem',
                              color: 'white',
                              background: 'var(--gradient-primary)'
                            }}
                          >
                            {index + 1}
                          </span>
                          <h3
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)'
                            }}
                          >
                            {lesson.title}
                          </h3>
                        </div>
                        <div
                          style={{
                            fontSize: '0.9375rem',
                            marginLeft: '3.5rem',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {lesson.exercises.length} ejercicios •{' '}
                          {completedExercises}/{lesson.exercises.length} completados
                        </div>
                      </div>
                      {completedExercises === lesson.exercises.length && (
                        <span
                          style={{
                            fontSize: '1.5rem',
                            color: 'var(--success)'
                          }}
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
            {/* Lesson Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2
                className="title-responsive"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '0.625rem'
                }}
              >
                {selectedLesson.title}
              </h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <span>{selectedLesson.exercises?.length || 0} ejercicios</span>
              </div>
            </div>

            {/* Lesson Content Card */}
            <div
              className="lesson-content-mobile"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--elevation-1)',
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '2rem'
              }}
            >
              <div className="lesson-content" style={{ color: 'var(--text-primary)' }}>
                <ReactMarkdown
                  components={{
                    h1: () => null, // El título h1 ya se muestra fuera del contenido
                    h2: ({node, ...props}) => <h2 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.25rem', fontSize: '1.5rem', fontWeight: 700 }} {...props} />,
                    h3: ({node, ...props}) => <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }} {...props} />,
                    p: ({node, ...props}) => <p style={{ color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: 1.8 }} {...props} />,
                    code: ({node, inline, ...props}) =>
                      inline ? (
                        <code style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-accent)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.9em' }} {...props} />
                      ) : (
                        <code style={{ color: 'var(--text-primary)' }} {...props} />
                      ),
                    pre: ({node, ...props}) => <pre style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '16px', overflowX: 'auto', marginTop: '1.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }} {...props} />,
                    strong: ({node, ...props}) => <strong style={{ color: 'var(--highlight)', fontWeight: 600 }} {...props} />,
                    li: ({node, ...props}) => <li style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.7 }} {...props} />,
                    ul: ({node, ...props}) => <ul style={{ marginTop: '1.25rem', marginBottom: '1.25rem', marginLeft: '1.5rem', listStyleType: 'disc' }} {...props} />,
                    ol: ({node, ...props}) => <ol style={{ marginTop: '1.25rem', marginBottom: '1.25rem', marginLeft: '1.5rem', listStyleType: 'decimal' }} {...props} />,
                    a: ({node, ...props}) => <a style={{ color: 'var(--text-accent)', textDecoration: 'underline' }} {...props} />,
                    blockquote: ({node, ...props}) => <blockquote style={{ borderLeft: '4px solid var(--highlight)', paddingLeft: '1.5rem', marginTop: '1.5rem', marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }} {...props} />,
                    hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginTop: '2rem', marginBottom: '2rem' }} {...props} />,
                  }}
                >
                  {selectedLesson.content}
                </ReactMarkdown>
              </div>
            </div>

            <div>
              <h3
                className="subtitle-responsive"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '1.25rem'
                }}
              >
                Ejercicios
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {selectedLesson.exercises.map((exercise, index) => (
                  <ExerciseRenderer
                    key={exercise.id}
                    exercise={exercise}
                    moduleId={selectedModule.id}
                    lessonId={selectedLesson.id}
                    onComplete={handleExerciseComplete}
                    animationDelay={index * 100}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="mt-16 py-10 text-center"
        style={{
          borderTop: '1px solid var(--border-color)',
          color: 'var(--text-secondary)'
        }}
      >
        <p className="text-sm">Python for AI Engineers • Hecho con React + Vite + Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
