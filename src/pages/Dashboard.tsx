import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAthleteContext } from '../contexts/AthleteContext';
import { formatDate } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { athletes, assessments } = useAthleteContext();

  // Get recent assessments (last 5)
  const recentAssessments = [...assessments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Coach Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Athletes
              </Typography>
              <Typography variant="h3" color="primary">
                {athletes.length}
              </Typography>
              <Button 
                component={Link} 
                to="/athletes" 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2 }}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assessments
              </Typography>
              <Typography variant="h3" color="primary">
                {assessments.length}
              </Typography>
              <Button 
                component={Link} 
                to="/assessments" 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2 }}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                <Button 
                  component={Link} 
                  to="/athletes/new" 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                >
                  Add New Athlete
                </Button>
                <Button 
                  component={Link} 
                  to="/assessments/new" 
                  variant="contained" 
                  color="secondary" 
                  fullWidth
                >
                  Create Assessment
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Assessments
            </Typography>
            {recentAssessments.length > 0 ? (
              <List>
                {recentAssessments.map((assessment, index) => {
                  const athlete = athletes.find(a => a.id === assessment.athleteId);
                  return (
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
                          primary={athlete ? athlete.name : 'Unknown Athlete'}
                          secondary={`Assessment on ${formatDate(new Date(assessment.date))}`}
                        />
                      </ListItem>
                    </React.Fragment>
                  );
                })}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No assessments yet. Create your first assessment to get started.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 