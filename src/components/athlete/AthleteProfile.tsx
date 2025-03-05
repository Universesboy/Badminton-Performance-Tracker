import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Grid,
  Avatar,
  Paper
} from '@mui/material';
import { useAthleteContext } from '../../contexts/AthleteContext';
import { Athlete } from '../../types';
import { generateId } from '../../utils/helpers';

interface AthleteProfileProps {
  athlete?: Athlete;
  onSave?: () => void;
}

const initialAthleteState: Athlete = {
  id: '',
  name: '',
  sport: 'Badminton',
  position: '',
  ageGrade: '',
  season: '',
  goals: '',
};

const AthleteProfile: React.FC<AthleteProfileProps> = ({ athlete, onSave }) => {
  const { addAthlete, updateAthlete } = useAthleteContext();
  const [formData, setFormData] = useState<Athlete>(initialAthleteState);
  const [isEditing, setIsEditing] = useState(!athlete);

  useEffect(() => {
    if (athlete) {
      setFormData(athlete);
      setIsEditing(false);
    } else {
      setFormData({
        ...initialAthleteState,
        id: generateId(),
      });
      setIsEditing(true);
    }
  }, [athlete]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (athlete) {
      updateAthlete(formData);
    } else {
      addAthlete(formData);
    }
    
    setIsEditing(false);
    
    if (onSave) {
      onSave();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (athlete) {
      setFormData(athlete);
      setIsEditing(false);
    } else {
      setFormData(initialAthleteState);
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" component="h2">
            {athlete ? 'Athlete Profile' : 'New Athlete'}
          </Typography>
          {athlete && !isEditing && (
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: 'primary.main',
                }}
              >
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'A'}
              </Avatar>
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Sport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Position/Specialty"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Age/Grade"
                    name="ageGrade"
                    value={formData.ageGrade}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Season"
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    fullWidth
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Goals for Season"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {isEditing && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AthleteProfile; 