import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme, PaletteMode } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AthleteProvider } from './contexts/AthleteContext';
import { CompetitionProvider } from './contexts/CompetitionContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useThemeContext } from './contexts/ThemeContext';
import Layout from './components/common/Layout';

// Import pages
import Dashboard from './pages/Dashboard';
import AthleteList from './pages/AthleteList';
import AthleteDetail from './pages/AthleteDetail';
import AssessmentList from './pages/AssessmentList';
import AssessmentForm from './pages/AssessmentForm';
import PerformanceView from './pages/PerformanceView';
import CompetitionList from './pages/CompetitionList';
import CompetitionDetail from './pages/CompetitionDetail';
import CompetitionForm from './pages/CompetitionForm';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Create theme options for both light and dark modes
const getThemeOptions = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      primary: {
        main: '#3f51b5', // Same for both themes
      },
      secondary: {
        main: '#f50057', // Same for both themes
      },
      background: {
        default: mode === 'light' ? '#f9f9f9' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      error: {
        main: '#f44336',
      },
      warning: {
        main: '#ff9800',
      },
      info: {
        main: '#2196f3',
      },
      success: {
        main: '#4caf50',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      h4: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          } as const,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light' 
              ? '0px 2px 8px rgba(0, 0, 0, 0.05)' 
              : '0px 2px 8px rgba(0, 0, 0, 0.2)',
          } as const,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
          } as const,
        },
      },
    },
  };
};

// Wrapper component to access theme context
const AppWithTheme: React.FC = () => {
  const { themeMode } = useThemeContext();
  
  // Create theme based on current mode
  const theme = React.useMemo(
    () => createTheme(getThemeOptions(themeMode as PaletteMode)),
    [themeMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AthleteProvider>
        <CompetitionProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/athletes" element={<AthleteList />} />
                <Route path="/athletes/:id" element={<AthleteDetail />} />
                <Route path="/assessments" element={<AssessmentList />} />
                <Route path="/assessments/new" element={<AssessmentForm />} />
                <Route path="/assessments/:id" element={<AssessmentForm />} />
                <Route path="/performance" element={<PerformanceView />} />
                <Route path="/competitions" element={<CompetitionList />} />
                <Route path="/competitions/new" element={<CompetitionForm />} />
                <Route path="/competitions/:id" element={<CompetitionDetail />} />
                <Route path="/competitions/edit/:id" element={<CompetitionForm />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </CompetitionProvider>
      </AthleteProvider>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
}

export default App; 