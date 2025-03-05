import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Divider,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Competition } from '../types';
import { useCompetitionContext } from '../contexts/CompetitionContext';
import { useAthleteContext } from '../contexts/AthleteContext';
import RatingSelector from '../components/common/RatingSelector';

const initialCompetition: Omit<Competition, 'id'> = {
  athleteId: '',
  date: new Date().toISOString().split('T')[0],
  opponent: '',
  result: '',
  playingTime: '',
  preCompetitionGoals: [],
  keyStatistics: [],
  highlightMoments: [],
  challengeAreas: [],
  mentalReadiness: 3,
  executionOfGamePlan: 3,
  adaptability: 3,
  additionalObservations: '',
};

const CompetitionForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addCompetition, updateCompetition, competitions } = useCompetitionContext();
  const { athletes } = useAthleteContext();
  
  const [formData, setFormData] = useState<Omit<Competition, 'id'>>(initialCompetition);
  const [newItem, setNewItem] = useState({ 
    goal: '', 
    statistic: '', 
    highlight: '', 
    challenge: '' 
  });
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    // If editing existing competition, load its data
    if (id) {
      const existingCompetition = competitions.find(c => c.id === id);
      if (existingCompetition) {
        setFormData(existingCompetition);
      }
    }
  }, [id, competitions]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setNewItem(prev => ({ ...prev, [field]: e.target.value }));
  };

  const addArrayItem = (field: keyof typeof formData, itemKey: keyof typeof newItem) => {
    if (newItem[itemKey]) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), newItem[itemKey]]
      }));
      setNewItem(prev => ({ ...prev, [itemKey]: '' }));
    }
  };

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.athleteId) {
      alert('Please select an athlete');
      return;
    }
    
    if (id) {
      // Update existing competition
      updateCompetition({ id, ...formData });
    } else {
      // Create new competition
      addCompetition({ id: uuidv4(), ...formData });
    }
    
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/competitions');
    }, 1500);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Edit Competition' : 'Add Competition'}
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="athlete-select-label">Athlete</InputLabel>
                <Select
                  labelId="athlete-select-label"
                  id="athleteId"
                  name="athleteId"
                  value={formData.athleteId}
                  label="Athlete"
                  onChange={handleSelectChange}
                >
                  {athletes.map((athlete) => (
                    <MenuItem key={athlete.id} value={athlete.id}>
                      {athlete.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleTextChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Opponent"
                name="opponent"
                value={formData.opponent}
                onChange={handleTextChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Result"
                name="result"
                value={formData.result}
                onChange={handleTextChange}
                required
                placeholder="e.g., Won 21-15, 21-18"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Playing Time"
                name="playingTime"
                value={formData.playingTime}
                onChange={handleTextChange}
                placeholder="e.g., 45 minutes"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Pre-Competition Goals</Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Goal"
                  value={newItem.goal}
                  onChange={(e) => handleNewItemChange(e, 'goal')}
                  onKeyPress={(e) => e.key === 'Enter' && addArrayItem('preCompetitionGoals', 'goal')}
                />
                <Button
                  variant="contained"
                  onClick={() => addArrayItem('preCompetitionGoals', 'goal')}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {formData.preCompetitionGoals.map((goal, index) => (
                  <Chip
                    key={index}
                    label={goal}
                    onDelete={() => removeArrayItem('preCompetitionGoals', index)}
                    sx={{ my: 0.5 }}
                  />
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Key Statistics</Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Statistic"
                  value={newItem.statistic}
                  onChange={(e) => handleNewItemChange(e, 'statistic')}
                  onKeyPress={(e) => e.key === 'Enter' && addArrayItem('keyStatistics', 'statistic')}
                  placeholder="e.g., 15 smash winners"
                />
                <Button
                  variant="contained"
                  onClick={() => addArrayItem('keyStatistics', 'statistic')}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {formData.keyStatistics.map((stat, index) => (
                  <Chip
                    key={index}
                    label={stat}
                    onDelete={() => removeArrayItem('keyStatistics', index)}
                    sx={{ my: 0.5 }}
                  />
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Highlight Moments</Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Highlight"
                  value={newItem.highlight}
                  onChange={(e) => handleNewItemChange(e, 'highlight')}
                  onKeyPress={(e) => e.key === 'Enter' && addArrayItem('highlightMoments', 'highlight')}
                />
                <Button
                  variant="contained"
                  onClick={() => addArrayItem('highlightMoments', 'highlight')}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {formData.highlightMoments.map((highlight, index) => (
                  <Chip
                    key={index}
                    label={highlight}
                    onDelete={() => removeArrayItem('highlightMoments', index)}
                    sx={{ my: 0.5 }}
                  />
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Challenge Areas</Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Challenge"
                  value={newItem.challenge}
                  onChange={(e) => handleNewItemChange(e, 'challenge')}
                  onKeyPress={(e) => e.key === 'Enter' && addArrayItem('challengeAreas', 'challenge')}
                />
                <Button
                  variant="contained"
                  onClick={() => addArrayItem('challengeAreas', 'challenge')}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
              </Box>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {formData.challengeAreas.map((challenge, index) => (
                  <Chip
                    key={index}
                    label={challenge}
                    onDelete={() => removeArrayItem('challengeAreas', index)}
                    sx={{ my: 0.5 }}
                  />
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Performance Ratings</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>Mental Readiness</Typography>
                  <RatingSelector
                    name="mentalReadiness"
                    label="Mental Readiness"
                    value={formData.mentalReadiness}
                    onChange={(value) => handleRatingChange('mentalReadiness', value)}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>Execution of Game Plan</Typography>
                  <RatingSelector
                    name="executionOfGamePlan"
                    label="Execution of Game Plan"
                    value={formData.executionOfGamePlan}
                    onChange={(value) => handleRatingChange('executionOfGamePlan', value)}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>Adaptability</Typography>
                  <RatingSelector
                    name="adaptability"
                    label="Adaptability"
                    value={formData.adaptability}
                    onChange={(value) => handleRatingChange('adaptability', value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Additional Observations"
                name="additionalObservations"
                value={formData.additionalObservations}
                onChange={handleTextChange}
              />
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/competitions')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {id ? 'Update Competition' : 'Add Competition'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Competition {id ? 'updated' : 'added'} successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CompetitionForm; 