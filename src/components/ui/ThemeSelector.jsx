import { useState, useEffect } from 'react';
import { themeManager } from '../../utils/themeManager';
import { progressManager } from '../../utils/progressManager';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(progressManager.getTheme());
  const [isOpen, setIsOpen] = useState(false);

  const themes = themeManager.getAvailableThemes();

  useEffect(() => {
    themeManager.applyTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    themeManager.applyTheme(themeId);
    progressManager.saveTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-3 rounded-xl transition-all hover:scale-105"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--elevation-1)'
        }}
      >
        <span className="text-xl">
          {themeManager.getThemeInfo(currentTheme).icon}
        </span>
        <span className="hidden sm:inline font-medium">
          {themeManager.getThemeInfo(currentTheme).name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 mt-3 w-72 rounded-2xl z-50 overflow-hidden animate-scale-up"
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--elevation-4)'
            }}
          >
            <div className="p-3">
              {themes.map((theme, index) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl mb-2 last:mb-0 transition-all hover:scale-[1.02] ${
                    currentTheme === theme.id ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: currentTheme === theme.id ? 'var(--bg-tertiary)' : 'transparent',
                    color: 'var(--text-primary)',
                    ringColor: 'var(--highlight)',
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <span className="text-2xl">{theme.icon}</span>
                  <div className="text-left flex-1">
                    <div className="font-semibold">{theme.name}</div>
                    <div
                      className="text-xs mt-2 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {theme.description}
                    </div>
                  </div>
                  {currentTheme === theme.id && (
                    <svg
                      className="w-5 h-5 flex-shrink-0 animate-pop-in"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--success)' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
