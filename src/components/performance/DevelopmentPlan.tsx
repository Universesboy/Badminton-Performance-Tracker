import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DevelopmentPlan as DevelopmentPlanType } from '../../types';

interface DevelopmentPlanProps {
  initialValues?: DevelopmentPlanType;
  onSave: (plan: DevelopmentPlanType) => void;
  readOnly?: boolean;
}

const defaultPlan: DevelopmentPlanType = {
  strengths: [],
  areasForImprovement: [],
  shortTermGoals: [],
  mediumTermGoals: [],
  longTermGoals: [],
  recommendedDrills: []
};

const DevelopmentPlan: React.FC<DevelopmentPlanProps> = ({
  initialValues = defaultPlan,
  onSave,
  readOnly = false
}) => {
  const [plan, setPlan] = useState<DevelopmentPlanType>(initialValues);
  const [newItems, setNewItems] = useState<{
    strengths: string;
    areasForImprovement: string;
    shortTermGoals: string;
    mediumTermGoals: string;
    longTermGoals: string;
    recommendedDrills: string;
  }>({
    strengths: '',
    areasForImprovement: '',
    shortTermGoals: '',
    mediumTermGoals: '',
    longTermGoals: '',
    recommendedDrills: ''
  });

  useEffect(() => {
    setPlan(initialValues);
  }, [initialValues]);

  const handleNewItemChange = (section: keyof typeof newItems, value: string) => {
    setNewItems(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleAddItem = (section: keyof DevelopmentPlanType) => {
    if (!newItems[section].trim()) return;
    
    setPlan(prev => ({
      ...prev,
      [section]: [...prev[section], newItems[section].trim()]
    }));

    setNewItems(prev => ({
      ...prev,
      [section]: ''
    }));
  };

  const handleDeleteItem = (section: keyof DevelopmentPlanType, index: number) => {
    setPlan(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(plan);
  };

  const renderSection = (
    title: string,
    section: keyof DevelopmentPlanType,
    placeholder: string
  ) => (
    <Grid item xs={12} md={section === 'recommendedDrills' ? 12 : 6}>
      <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <List dense sx={{ mb: 2 }}>
          {plan[section].length === 0 ? (
            <ListItem>
              <ListItemText primary="No items added yet" sx={{ color: 'text.secondary' }} />
            </ListItem>
          ) : (
            plan[section].map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  !readOnly && (
                    <IconButton 
                      edge="end" 
                      size="small" 
                      onClick={() => handleDeleteItem(section, index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )
                }
              >
                <ListItemText 
                  primary={item}
                  primaryTypographyProps={{ 
                    style: { 
                      whiteSpace: 'normal',
                      wordBreak: 'break-word'
                    } 
                  }}
                />
              </ListItem>
            ))
          )}
        </List>
        {!readOnly && (
          <TextField
            fullWidth
            size="small"
            placeholder={placeholder}
            value={newItems[section]}
            onChange={(e) => handleNewItemChange(section, e.target.value)}
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => handleAddItem(section)}
                    disabled={!newItems[section].trim()}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddItem(section);
              }
            }}
          />
        )}
      </Paper>
    </Grid>
  );

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Detailed Performance Analysis
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {renderSection(
            'Strengths',
            'strengths',
            'Add a strength...'
          )}
          
          {renderSection(
            'Areas for Improvement',
            'areasForImprovement',
            'Add an area for improvement...'
          )}

          <Grid item xs={12}>
            <Divider>
              <Typography variant="subtitle1" color="text.secondary">
                Development Goals
              </Typography>
            </Divider>
          </Grid>
          
          {renderSection(
            'Short-term Goals (1-2 Weeks)',
            'shortTermGoals',
            'Add a short-term goal...'
          )}
          
          {renderSection(
            'Medium-term Goals (1 Month)',
            'mediumTermGoals',
            'Add a medium-term goal...'
          )}
          
          {renderSection(
            'Long-term Goals (Season)',
            'longTermGoals',
            'Add a long-term goal...'
          )}
          
          <Grid item xs={12}>
            <Divider>
              <Typography variant="subtitle1" color="text.secondary">
                Recommended Training
              </Typography>
            </Divider>
          </Grid>
          
          {renderSection(
            'Recommended Drills/Exercises',
            'recommendedDrills',
            'Add a recommended drill or exercise...'
          )}
        </Grid>

        {!readOnly && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Development Plan
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DevelopmentPlan; 