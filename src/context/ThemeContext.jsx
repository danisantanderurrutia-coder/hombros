import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  palette: 'fcinq',
  setPalette: () => {},
  togglePalette: () => {},
  isFcinq: true,
  isHaus: false
});

export function ThemeProvider({ children }) {
  const [palette, setPalette] = useState(() => {
    return localStorage.getItem('hombros_palette') || 'fcinq';
  });

  useEffect(() => {
    localStorage.setItem('hombros_palette', palette);
    document.documentElement.setAttribute('data-theme', palette);
  }, [palette]);

  const togglePalette = () => {
    setPalette(prev => (prev === 'fcinq' ? 'haus' : 'fcinq'));
  };

  return (
    <ThemeContext.Provider value={{ 
      palette, 
      setPalette, 
      togglePalette, 
      isFcinq: palette === 'fcinq',
      isHaus: palette === 'haus'
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
