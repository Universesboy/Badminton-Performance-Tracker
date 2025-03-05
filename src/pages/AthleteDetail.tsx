import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  Paper,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Alert,
  Chip,
  Rating
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useAthleteContext } from '../contexts/AthleteContext';
import { useCompetitionContext } from '../contexts/CompetitionContext';
import AthleteProfile from '../components/athlete/AthleteProfile';
import QuickAssessment from '../components/assessment/QuickAssessment';
import DevelopmentPlan from '../components/performance/DevelopmentPlan';
import { formatDate } from '../utils/helpers';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Athlete, Assessment, Competition } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`athlete-tabpanel-${index}`}
      aria-labelledby={`athlete-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AthleteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { athletes, assessments, getAthleteAssessments, deleteAthlete } = useAthleteContext();
  const { competitions, getAthleteCompetitions } = useCompetitionContext();
  const [tabValue, setTabValue] = useState(0);
  
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [athleteAssessments, setAthleteAssessments] = useState<Assessment[]>([]);
  const [athleteCompetitions, setAthleteCompetitions] = useState<Competition[]>([]);
  
  // Sort assessments by date (newest first)
  const sortedAssessments = [...athleteAssessments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get the most recent assessment
  const latestAssessment = sortedAssessments.length > 0 ? sortedAssessments[0] : null;

  useEffect(() => {
    if (id) {
      if (id === 'new') {
        // Handle 'new' athlete case - don't try to find an existing athlete
        return;
      }
      
      const foundAthlete = athletes.find(a => a.id === id);
      if (foundAthlete) {
        setAthlete(foundAthlete);
        setAthleteAssessments(getAthleteAssessments(id));
        setAthleteCompetitions(getAthleteCompetitions(id));
      } else {
        navigate('/athletes');
      }
    }
  }, [id, athletes, getAthleteAssessments, getAthleteCompetitions, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!athlete && id !== 'new') {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" color="text.secondary">
          Athlete not found
        </Typography>
        <Button 
          component={Link} 
          to="/athletes" 
          variant="contained" 
          sx={{ mt: 2 }}
        >
          Back to Athletes
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {id === 'new' ? (
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Athlete
          </Typography>
          <AthleteProfile onSave={() => navigate('/athletes')} />
        </Box>
      ) : athlete ? (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              {athlete.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/assessments/new"
              state={{ athleteId: athlete.id }}
            >
              New Assessment
            </Button>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              aria-label="athlete details tabs"
            >
              <Tab label="Profile" icon={<PersonIcon />} />
              <Tab label="Performance" icon={<ShowChartIcon />} />
              <Tab label="Assessments" icon={<AssessmentIcon />} />
              <Tab label="Competitions" icon={<EmojiEventsIcon />} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <AthleteProfile athlete={athlete} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {latestAssessment ? (
              <DevelopmentPlan 
                initialValues={latestAssessment.developmentPlan} 
                onSave={() => {}} 
                readOnly={true}
              />
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No assessments yet
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Create an assessment to track this athlete's development plan.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={Link}
                  to={`/assessments/new?athleteId=${id}`}
                >
                  Create Assessment
                </Button>
              </Box>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            {latestAssessment ? (
              <DevelopmentPlan 
                initialValues={latestAssessment.developmentPlan} 
                onSave={() => {}} 
                readOnly={true}
              />
            ) : (
              <Alert severity="info">
                No assessment data available. Create an assessment first to view and manage the development plan.
              </Alert>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            {latestAssessment ? (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Performance History
                </Typography>
                <Alert severity="info">
                  Performance history visualization will be implemented in a future update.
                </Alert>
              </Box>
            ) : (
              <Alert severity="info">
                No assessment data available. Create an assessment first to view performance history.
              </Alert>
            )}
          </TabPanel>
        </Box>
      ) : null}
    </Box>
  );
};

export default AthleteDetail; 