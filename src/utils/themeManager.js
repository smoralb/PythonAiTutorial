// Theme Manager - Handles theme switching

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYNTHWAVE: 'synthwave',
  MONOKAI: 'monokai',
  DRACULA: 'dracula',
  NORD: 'nord'
};

export const THEME_INFO = {
  [THEMES.LIGHT]: {
    name: 'Claro',
    description: 'Tema claro moderno',
    icon: '☀️'
  },
  [THEMES.DARK]: {
    name: 'Oscuro',
    description: 'Tema oscuro para reducir fatiga visual',
    icon: '🌙'
  },
  [THEMES.SYNTHWAVE]: {
    name: 'Synthwave',
    description: 'Colores retro-futuristas vibrantes',
    icon: '🎮'
  },
  [THEMES.MONOKAI]: {
    name: 'Monokai',
    description: 'Tema clásico de editores de código',
    icon: '💻'
  },
  [THEMES.DRACULA]: {
    name: 'Dracula',
    description: 'Tema popular con tonos púrpura',
    icon: '🧛'
  },
  [THEMES.NORD]: {
    name: 'Nord',
    description: 'Paleta ártica y minimalista',
    icon: '❄️'
  }
};

export const themeManager = {
  // Apply theme to document
  applyTheme(themeName) {
    const validTheme = Object.values(THEMES).includes(themeName) ? themeName : THEMES.LIGHT;
    document.documentElement.setAttribute('data-theme', validTheme);
    return validTheme;
  },

  // Get current theme from document
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || THEMES.LIGHT;
  },

  // Get all available themes
  getAvailableThemes() {
    return Object.values(THEMES).map(theme => ({
      id: theme,
      ...THEME_INFO[theme]
    }));
  },

  // Get theme info
  getThemeInfo(themeName) {
    return THEME_INFO[themeName] || THEME_INFO[THEMES.LIGHT];
  }
};
