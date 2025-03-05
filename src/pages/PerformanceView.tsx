import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Alert,
  Divider,
  SelectChangeEvent
} from '@mui/material';
import { useAthleteContext } from '../contexts/AthleteContext';
import { formatDate, calculateOverallScore } from '../utils/helpers';

const PerformanceView: React.FC = () => {
  const { athletes, assessments } = useAthleteContext();
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>('');
  const [athleteAssessments, setAthleteAssessments] = useState<any[]>([]);

  useEffect(() => {
    if (athletes.length > 0 && !selectedAthleteId) {
      setSelectedAthleteId(athletes[0].id);
    }
  }, [athletes, selectedAthleteId]);

  useEffect(() => {
    if (selectedAthleteId) {
      const filtered = assessments
        .filter(assessment => assessment.athleteId === selectedAthleteId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setAthleteAssessments(filtered);
    } else {
      setAthleteAssessments([]);
    }
  }, [selectedAthleteId, assessments]);

  const handleAthleteChange = (event: SelectChangeEvent) => {
    setSelectedAthleteId(event.target.value);
  };

  const getPerformanceData = () => {
    if (athleteAssessments.length === 0) return null;

    // Get dates and scores for chart
    const dates = athleteAssessments.map(a => formatDate(new Date(a.date)));
    const scores = athleteAssessments.map(a => 
      calculateOverallScore(
        a.performanceMetrics.technicalSkills,
        a.performanceMetrics.tacticalAwareness,
        a.performanceMetrics.physicalFitness,
        a.performanceMetrics.mentalFortitude,
        a.performanceMetrics.teamwork,
        a.performanceMetrics.coachability
      )
    );

    // Get individual metric scores for radar chart
    const latestAssessment = athleteAssessments[0];
    const metrics = [
      latestAssessment.performanceMetrics.technicalSkills,
      latestAssessment.performanceMetrics.tacticalAwareness,
      latestAssessment.performanceMetrics.physicalFitness,
      latestAssessment.performanceMetrics.mentalFortitude,
      latestAssessment.performanceMetrics.teamwork,
      latestAssessment.performanceMetrics.coachability
    ];

    return {
      dates,
      scores,
      metrics
    };
  };

  const selectedAthlete = athletes.find(a => a.id === selectedAthleteId);
  const performanceData = getPerformanceData();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Performance Analytics
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="athlete-select-label">Select Athlete</InputLabel>
          <Select
            labelId="athlete-select-label"
            value={selectedAthleteId}
            label="Select Athlete"
            onChange={handleAthleteChange}
          >
            {athletes.map((athlete) => (
              <MenuItem key={athlete.id} value={athlete.id}>
                {athlete.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {athletes.length === 0 ? (
          <Alert severity="info">
            No athletes found. Add athletes to view performance analytics.
          </Alert>
        ) : athleteAssessments.length === 0 ? (
          <Alert severity="info">
            No assessments found for {selectedAthlete?.name}. Create assessments to view performance analytics.
          </Alert>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              {selectedAthlete?.name}'s Performance Overview
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Performance visualization charts will be implemented in a future update.
            </Alert>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Latest Assessment
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Date: {formatDate(new Date(athleteAssessments[0].date))}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Technical Skills:</strong> {athleteAssessments[0].performanceMetrics.technicalSkills}/5
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Tactical Awareness:</strong> {athleteAssessments[0].performanceMetrics.tacticalAwareness}/5
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Physical Fitness:</strong> {athleteAssessments[0].performanceMetrics.physicalFitness}/5
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Mental Fortitude:</strong> {athleteAssessments[0].performanceMetrics.mentalFortitude}/5
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Teamwork:</strong> {athleteAssessments[0].performanceMetrics.teamwork}/5
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Coachability:</strong> {athleteAssessments[0].performanceMetrics.coachability}/5
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Performance Trend
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Based on {athleteAssessments.length} assessments
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>Current Trend:</strong> {athleteAssessments[0].progress.trend}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Latest Score:</strong> {performanceData?.scores[0]}/30
                      </Typography>
                      {performanceData && performanceData.scores.length > 1 && (
                        <Typography variant="body2" gutterBottom>
                          <strong>Previous Score:</strong> {performanceData.scores[1]}/30
                          {performanceData.scores[0] > performanceData.scores[1] 
                            ? ' (Improved)' 
                            : performanceData.scores[0] < performanceData.scores[1] 
                              ? ' (Declined)' 
                              : ' (No change)'}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PerformanceView; 