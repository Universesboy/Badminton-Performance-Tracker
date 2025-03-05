import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCompetitionContext } from '../contexts/CompetitionContext';
import { useAthleteContext } from '../contexts/AthleteContext';
import { Competition, Athlete } from '../types';

const CompetitionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { competitions, deleteCompetition } = useCompetitionContext();
  const { athletes } = useAthleteContext();

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const foundCompetition = competitions.find(c => c.id === id);
      if (foundCompetition) {
        setCompetition(foundCompetition);
        const foundAthlete = athletes.find(a => a.id === foundCompetition.athleteId);
        if (foundAthlete) {
          setAthlete(foundAthlete);
        }
      } else {
        // Competition not found, redirect to list
        navigate('/competitions');
      }
    }
  }, [id, competitions, athletes, navigate]);

  if (!competition || !athlete) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography>Loading competition details...</Typography>
      </Box>
    );
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteCompetition(competition.id);
    setDeleteDialogOpen(false);
    navigate('/competitions');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/competitions"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Competitions
        </Button>
        <Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            component={Link}
            to={`/competitions/edit/${competition.id}`}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              {competition.opponent}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {formatDate(competition.date)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                Athlete:
              </Typography>
              <Chip label={athlete.name} color="primary" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Result
            </Typography>
            <Typography variant="body1">
              {competition.result}
            </Typography>
            {competition.playingTime && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Playing Time: {competition.playingTime}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Pre-Competition Goals
            </Typography>
            {competition.preCompetitionGoals.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {competition.preCompetitionGoals.map((goal, index) => (
                  <Chip key={index} label={goal} variant="outlined" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No goals were set for this competition.
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Key Statistics
            </Typography>
            {competition.keyStatistics.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {competition.keyStatistics.map((stat, index) => (
                  <Chip key={index} label={stat} variant="outlined" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No statistics were recorded for this competition.
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Highlight Moments
            </Typography>
            {competition.highlightMoments.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {competition.highlightMoments.map((highlight, index) => (
                  <Chip key={index} label={highlight} variant="outlined" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No highlights were recorded for this competition.
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Challenge Areas
            </Typography>
            {competition.challengeAreas.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {competition.challengeAreas.map((challenge, index) => (
                  <Chip key={index} label={challenge} variant="outlined" />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No challenges were recorded for this competition.
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Performance Ratings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Mental Readiness
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {competition.mentalReadiness}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      / 5
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Game Plan Execution
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {competition.executionOfGamePlan}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      / 5
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Adaptability
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {competition.adaptability}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      / 5
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {competition.additionalObservations && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Additional Observations
              </Typography>
              <Typography variant="body1" paragraph>
                {competition.additionalObservations}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this competition record? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompetitionDetail; 