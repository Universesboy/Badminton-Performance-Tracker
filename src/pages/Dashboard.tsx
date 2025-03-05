import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAthleteContext } from '../contexts/AthleteContext';
import { useCompetitionContext } from '../contexts/CompetitionContext';

const Dashboard: React.FC = () => {
  const { athletes, assessments } = useAthleteContext();
  const { competitions } = useCompetitionContext();
  const [recentAssessments, setRecentAssessments] = useState<any[]>([]);
  const [recentCompetitions, setRecentCompetitions] = useState<any[]>([]);

  useEffect(() => {
    // Get recent assessments with athlete info
    const assessmentsWithAthleteInfo = assessments.map(assessment => {
      const athlete = athletes.find(a => a.id === assessment.athleteId);
      return {
        ...assessment,
        athleteName: athlete ? athlete.name : 'Unknown Athlete'
      };
    });
    
    // Sort by date (most recent first) and take top 5
    const recent = [...assessmentsWithAthleteInfo]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    
    setRecentAssessments(recent);
  }, [assessments, athletes]);

  useEffect(() => {
    // Get recent competitions with athlete info
    const competitionsWithAthleteInfo = competitions.map(competition => {
      const athlete = athletes.find(a => a.id === competition.athleteId);
      return {
        ...competition,
        athleteName: athlete ? athlete.name : 'Unknown Athlete'
      };
    });
    
    // Sort by date (most recent first) and take top 5
    const recent = [...competitionsWithAthleteInfo]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    
    setRecentCompetitions(recent);
  }, [competitions, athletes]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            background: 'linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)',
            color: 'white'
          }}>
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Typography variant="h5" component="h2">
                  Athletes
                </Typography>
              </Box>
              <Typography variant="h2" component="div" sx={{ mb: 1 }}>
                {athletes.length}
              </Typography>
              <Typography variant="body2">
                Total registered athletes
              </Typography>
            </CardContent>
            <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
            <CardActions>
              <Button 
                component={Link} 
                to="/athletes" 
                size="small" 
                sx={{ color: 'white' }}
                endIcon={<ArrowForwardIcon />}
              >
                Manage Athletes
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            background: 'linear-gradient(45deg, #f50057 30%, #ff4081 90%)',
            color: 'white'
          }}>
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                  <AssessmentIcon />
                </Avatar>
                <Typography variant="h5" component="h2">
                  Assessments
                </Typography>
              </Box>
              <Typography variant="h2" component="div" sx={{ mb: 1 }}>
                {assessments.length}
              </Typography>
              <Typography variant="body2">
                Total recorded assessments
              </Typography>
            </CardContent>
            <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
            <CardActions>
              <Button 
                component={Link} 
                to="/assessments" 
                size="small" 
                sx={{ color: 'white' }}
                endIcon={<ArrowForwardIcon />}
              >
                View Assessments
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
            color: 'white'
          }}>
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                  <EmojiEventsIcon />
                </Avatar>
                <Typography variant="h5" component="h2">
                  Competitions
                </Typography>
              </Box>
              <Typography variant="h2" component="div" sx={{ mb: 1 }}>
                {competitions.length}
              </Typography>
              <Typography variant="body2">
                Total competition records
              </Typography>
            </CardContent>
            <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
            <CardActions>
              <Button 
                component={Link} 
                to="/competitions" 
                size="small" 
                sx={{ color: 'white' }}
                endIcon={<ArrowForwardIcon />}
              >
                View Competitions
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Items */}
      <Grid container spacing={3}>
        {/* Recent Assessments */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Recent Assessments
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                component={Link}
                to="/assessments/new"
              >
                New
              </Button>
            </Box>
            
            {recentAssessments.length === 0 ? (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No assessments recorded yet.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={Link}
                  to="/assessments/new"
                  sx={{ mt: 2 }}
                >
                  Record Your First Assessment
                </Button>
              </Box>
            ) : (
              <List sx={{ width: '100%' }}>
                {recentAssessments.map((assessment) => (
                  <React.Fragment key={assessment.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#f50057' }}>
                          <AssessmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={assessment.athleteName}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'block' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {formatDate(assessment.date)}
                            </Typography>
                            {`Overall Rating: ${assessment.performanceMetrics.technicalSkills}/5`}
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="View details">
                          <IconButton 
                            edge="end" 
                            component={Link} 
                            to={`/assessments/${assessment.id}`}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            )}
            
            {recentAssessments.length > 0 && (
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button
                  component={Link}
                  to="/assessments"
                  endIcon={<ArrowForwardIcon />}
                >
                  View All
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Competitions */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Recent Competitions
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                component={Link}
                to="/competitions/new"
              >
                New
              </Button>
            </Box>
            
            {recentCompetitions.length === 0 ? (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No competitions recorded yet.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={Link}
                  to="/competitions/new"
                  sx={{ mt: 2 }}
                >
                  Record Your First Competition
                </Button>
              </Box>
            ) : (
              <List sx={{ width: '100%' }}>
                {recentCompetitions.map((competition) => (
                  <React.Fragment key={competition.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#4caf50' }}>
                          <EmojiEventsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography component="span" variant="body1">
                              {competition.opponent}
                            </Typography>
                            <Chip 
                              label={competition.athleteName} 
                              size="small" 
                              sx={{ ml: 1, fontSize: '0.7rem' }} 
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'block' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {formatDate(competition.date)}
                            </Typography>
                            {competition.result}
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="View details">
                          <IconButton 
                            edge="end" 
                            component={Link} 
                            to={`/competitions/${competition.id}`}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            )}
            
            {recentCompetitions.length > 0 && (
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button
                  component={Link}
                  to="/competitions"
                  endIcon={<ArrowForwardIcon />}
                >
                  View All
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 