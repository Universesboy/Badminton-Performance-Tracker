import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon for dark mode
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon for light mode
import { useThemeContext } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
  sx?: React.CSSProperties;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ sx }) => {
  const { themeMode, toggleThemeMode } = useThemeContext();

  return (
    <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleThemeMode}
        color="inherit"
        sx={{
          ml: 1,
          ...sx,
        }}
        aria-label="toggle theme"
      >
        {themeMode === 'light' ? (
          <Brightness4Icon /> // Show moon icon when in light mode
        ) : (
          <Brightness7Icon /> // Show sun icon when in dark mode
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 