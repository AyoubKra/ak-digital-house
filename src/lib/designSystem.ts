export const designSystem = {
  colors: {
    primary: '#D91E45',
    secondary: '#1A1C1E',
    dark: '#242729',
    light: '#FFFFFF',
    muted: '#999999',
    surface: '#F9F9F9',
    grey: '#E8E8E8',
    border: '#E0E0E0',
  },

  typography: {
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
    fontSize: {
      h1: 'clamp(1.75rem, 3vw, 2.25rem)',
      h2: 'clamp(1.5rem, 2.5vw, 1.75rem)',
      h3: 'clamp(1.25rem, 2vw, 1.5rem)',
      h4: '1.125rem',
      h5: '1rem',
      h6: '0.875rem',
      body: 'clamp(0.9375rem, 1vw, 1rem)',
      small: '0.875rem',
    },
    lineHeight: {
      heading: 1.2,
      body: 1.6,
      longContent: 1.8,
    },
  },

  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },

  shadows: {
    subtle: '0 1px 3px rgba(0,0,0,0.08)',
    medium: '0 10px 30px rgba(0,0,0,0.08)',
    prominent: '0 10px 30px rgba(243,214,119,0.15)',
  },

  buttons: {
    primary: {
      background: '#D91E45',
      color: '#242729',
      hover: 'brightness(0.95)',
    },
    secondary: {
      background: '#FFFFFF',
      border: '#D91E45',
      color: '#D91E45',
    },
    ghost: {
      background: 'transparent',
      color: '#242729',
    },
  },
} as const;

export type DesignSystem = typeof designSystem;
