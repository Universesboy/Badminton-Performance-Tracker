import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  TextField,
  Button,
  Divider,
  Paper
} from '@mui/material';
import RatingSelector from '../common/RatingSelector';
import { PerformanceMetric, RatingScale } from '../../types';
import { calculateOverallScore } from '../../utils/helpers';

interface QuickAssessmentProps {
  initialValues?: PerformanceMetric;
  onSave: (metrics: PerformanceMetric) => void;
  readOnly?: boolean;
}

const defaultMetrics: PerformanceMetric = {
  technicalSkills: 3,
  tacticalAwareness: 3,
  physicalFitness: 3,
  mentalFortitude: 3,
  teamwork: 3,
  coachability: 3
};

const metricDescriptions = {
  technicalSkills: {
    1: 'Fundamental skills lacking',
    2: 'Basic techniques present, inconsistent execution',
    3: 'Consistent execution of core techniques',
    4: 'Advanced techniques well-executed',
    5: 'Exceptional technical mastery'
  },
  tacticalAwareness: {
    1: 'Limited understanding of game strategy',
    2: 'Basic awareness of positioning and strategy',
    3: 'Applies strategy appropriately in most situations',
    4: 'Anticipates play development, good decision making',
    5: 'Elite game intelligence and decision making'
  },
  physicalFitness: {
    1: 'Below required conditioning levels',
    2: 'Basic fitness, struggles with endurance',
    3: 'Adequate fitness for competitive play',
    4: 'Above average stamina and athletic ability',
    5: 'Exceptional physical conditioning'
  },
  mentalFortitude: {
    1: 'Easily discouraged, poor focus',
    2: 'Inconsistent mental toughness',
    3: 'Maintains composure in normal conditions',
    4: 'Thrives under pressure, consistent focus',
    5: 'Exceptional mental toughness and focus'
  },
  teamwork: {
    1: 'Individualistic play, limited cooperation',
    2: 'Basic teamwork, occasional collaboration',
    3: 'Good teammate, communicates adequately',
    4: 'Enhances team performance, supports others',
    5: 'Exemplary team player, elevates teammates'
  },
  coachability: {
    1: 'Resistant to feedback',
    2: 'Accepts feedback but slow to implement',
    3: 'Receptive to coaching, implements feedback',
    4: 'Actively seeks feedback, quick implementation',
    5: 'Exceptional at applying coaching instruction'
  }
};

const QuickAssessment: React.FC<QuickAssessmentProps> = ({
  initialValues = defaultMetrics,
  onSave,
  readOnly = false
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetric>(initialValues);
  const [notes, setNotes] = useState<{ [key: string]: string }>({
    technicalSkills: '',
    tacticalAwareness: '',
    physicalFitness: '',
    mentalFortitude: '',
    teamwork: '',
    coachability: ''
  });

  useEffect(() => {
    setMetrics(initialValues);
  }, [initialValues]);

  const handleRatingChange = (metric: keyof PerformanceMetric, value: RatingScale) => {
    if (readOnly) return;
    
    setMetrics(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const handleNoteChange = (metric: string, value: string) => {
    if (readOnly) return;
    
    setNotes(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const handleSave = () => {
    onSave(metrics);
  };

  const overallScore = calculateOverallScore(
    metrics.technicalSkills,
    metrics.tacticalAwareness,
    metrics.physicalFitness,
    metrics.mentalFortitude,
    metrics.teamwork,
    metrics.coachability
  );

  const getScoreColor = (score: number) => {
    const percentage = (score / 30) * 100;
    if (percentage >= 80) return 'success.main';
    if (percentage >= 60) return 'info.main';
    if (percentage >= 40) return 'warning.main';
    return 'error.main';
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Quick Assessment
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 1, 
              border: 1, 
              borderRadius: 1,
              borderColor: getScoreColor(overallScore),
              bgcolor: `${getScoreColor(overallScore)}20`,
            }}
          >
            <Typography variant="body1" sx={{ mr: 1 }}>
              Overall Score:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: getScoreColor(overallScore) }}>
              {overallScore}/30
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Rate each performance metric on a scale of 1-5
        </Typography>

        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RatingSelector
                name="technicalSkills"
                label="Technical Skills"
                value={metrics.technicalSkills}
                onChange={(value) => handleRatingChange('technicalSkills', value)}
                descriptions={metricDescriptions.technicalSkills}
              />
              <TextField
                label="Notes"
                value={notes.technicalSkills}
                onChange={(e) => handleNoteChange('technicalSkills', e.target.value)}
                fullWidth
                multiline
                rows={1}
                disabled={readOnly}
                sx={{ mt: 1, mb: 2 }}
              />
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <RatingSelector
                name="tacticalAwareness"
                label="Tactical Awareness"
                value={metrics.tacticalAwareness}
                onChange={(value) => handleRatingChange('tacticalAwareness', value)}
                descriptions={metricDescriptions.tacticalAwareness}
              />
              <TextField
                label="Notes"
                value={notes.tacticalAwareness}
                onChange={(e) => handleNoteChange('tacticalAwareness', e.target.value)}
                fullWidth
                multiline
                rows={1}
                disabled={readOnly}
                sx={{ mt: 1, mb: 2 }}
              />
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <RatingSelector
                name="physicalFitness"
                label="Physical Fitness"
                value={metrics.physicalFitness}
                onChange={(value) => handleRatingChange('physicalFitness', value)}
                descriptions={metricDescriptions.physicalFitness}
              />
              <TextField
                label="Notes"
                value={notes.physicalFitness}
                onChange={(e) => handleNoteChange('physicalFitness', e.target.value)}
                fullWidth
                multiline
                rows={1}
                disabled={readOnly}
                sx={{ mt: 1, mb: 2 }}
              />
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <RatingSelector
                name="mentalFortitude"
                label="Mental Fortitude"
                value={metrics.mentalFortitude}
                onChange={(value) => handleRatingChange('mentalFortitude', value)}
                descriptions={metricDescriptions.mentalFortitude}
              />
              <TextField
                label="Notes"
                value={notes.mentalFortitude}
                onChange={(e) => handleNoteChange('mentalFortitude', e.target.value)}
                fullWidth
                multiline
                rows={1}
                disabled={readOnly}
                sx={{ mt: 1, mb: 2 }}
              />
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <RatingSelector
                name="teamwork"
                label="Teamwork"
                value={metrics.teamwork}
                onChange={(value) => handleRatingChange('teamwork', value)}
                descriptions={metricDescriptions.teamwork}
              />
              <TextField
                label="Notes"
                value={notes.teamwork}
                onChange={(e) => handleNoteChange('teamwork', e.target.value)}
                fullWidth
                multiline
                rows={1}
                disabled={readOnly}
                sx={{ mt: 1, mb: 2 }}
              />
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <RatingSelector
                name="coachability"
                label="Coachability"
                value={metrics.coachability}
                onChange={(value) => handleRatingChange('coachability', value)}
                descriptions={metricDescriptions.coachability}
              />
              <TextField
                label="Notes"
                value={notes.coachability}
                onChange={(e) => handleNoteChange('coachability', e.target.value)}
                fullWidth
                multiline
                rows={1}
                disabled={readOnly}
                sx={{ mt: 1, mb: 2 }}
              />
            </Grid>
          </Grid>
        </Paper>

        {!readOnly && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Assessment
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickAssessment; 