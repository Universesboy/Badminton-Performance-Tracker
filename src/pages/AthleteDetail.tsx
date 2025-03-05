import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Tabs, 
  Tab, 
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useAthleteContext } from '../contexts/AthleteContext';
import AthleteProfile from '../components/athlete/AthleteProfile';
import QuickAssessment from '../components/assessment/QuickAssessment';
import DevelopmentPlan from '../components/performance/DevelopmentPlan';
import { formatDate } from '../utils/helpers';

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
  const { athletes, assessments, getAthleteAssessments } = useAthleteContext();
  const [tabValue, setTabValue] = useState(0);
  
  const athlete = athletes.find(a => a.id === id);
  const athleteAssessments = id ? getAthleteAssessments(id) : [];
  
  // Sort assessments by date (newest first)
  const sortedAssessments = [...athleteAssessments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get the most recent assessment
  const latestAssessment = sortedAssessments.length > 0 ? sortedAssessments[0] : null;

  useEffect(() => {
    if (!athlete && id !== 'new') {
      // Athlete not found, redirect to athletes list
      navigate('/athletes');
    }
  }, [athlete, id, navigate]);

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
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="athlete tabs">
              <Tab label="Profile" />
              <Tab label="Assessments" />
              <Tab label="Development Plan" />
              <Tab label="Performance History" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <AthleteProfile athlete={athlete} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {athleteAssessments.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No assessments yet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  Create your first assessment for this athlete to track their progress.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  component={Link}
                  to="/assessments/new"
                  state={{ athleteId: athlete.id }}
                >
                  Create Assessment
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Recent Assessments
                  </Typography>
                  <Paper variant="outlined">
                    <List>
                      {sortedAssessments.map((assessment, index) => (
                        <React.Fragment key={assessment.id}>
                          {index > 0 && <Divider />}
                          <ListItem
                            component={Link}
                            to={`/assessments/${assessment.id}`}
                            sx={{ 
                              textDecoration: 'none', 
                              color: 'inherit',
                              '&:hover': {
                                bgcolor: 'action.hover',
                              }
                            }}
                          >
                            <ListItemText
                              primary={`Assessment on ${formatDate(new Date(assessment.date))}`}
                              secondary={`Overall Score: ${assessment.performanceMetrics.technicalSkills + 
                                assessment.performanceMetrics.tacticalAwareness + 
                                assessment.performanceMetrics.physicalFitness + 
                                assessment.performanceMetrics.mentalFortitude + 
                                assessment.performanceMetrics.teamwork + 
                                assessment.performanceMetrics.coachability}/30`}
                            />
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
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