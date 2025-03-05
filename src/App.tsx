import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AthleteProvider } from './contexts/AthleteContext';
import Layout from './components/common/Layout';

// Import pages
import Dashboard from './pages/Dashboard';
import AthleteList from './pages/AthleteList';
import AthleteDetail from './pages/AthleteDetail';
import AssessmentList from './pages/AssessmentList';
import AssessmentForm from './pages/AssessmentForm';
import PerformanceView from './pages/PerformanceView';
import CompetitionList from './pages/CompetitionList';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AthleteProvider>
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
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </AthleteProvider>
    </ThemeProvider>
  );
}

export default App; 