import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAthleteContext } from '../contexts/AthleteContext';
import { formatDate, calculateOverallScore } from '../utils/helpers';

const AssessmentList: React.FC = () => {
  const { athletes, assessments, deleteAssessment } = useAthleteContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [athleteFilter, setAthleteFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAthleteFilterChange = (event: SelectChangeEvent) => {
    setAthleteFilter(event.target.value);
  };

  const filteredAssessments = assessments.filter(assessment => {
    const athlete = athletes.find(a => a.id === assessment.athleteId);
    const athleteName = athlete ? athlete.name.toLowerCase() : '';
    const dateMatch = formatDate(new Date(assessment.date)).toLowerCase().includes(searchTerm.toLowerCase());
    const nameMatch = athleteName.includes(searchTerm.toLowerCase());
    
    // Apply athlete filter
    if (athleteFilter !== 'all' && assessment.athleteId !== athleteFilter) {
      return false;
    }
    
    return dateMatch || nameMatch;
  });

  const handleDeleteClick = (id: string) => {
    setSelectedAssessmentId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAssessmentId) {
      deleteAssessment(selectedAssessmentId);
      setOpenDialog(false);
      setSelectedAssessmentId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedAssessmentId(null);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / 30) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'info';
    if (percentage >= 40) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Assessments
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/assessments/new"
        >
          New Assessment
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search assessments..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="athlete-filter-label">Filter by Athlete</InputLabel>
          <Select
            labelId="athlete-filter-label"
            value={athleteFilter}
            label="Filter by Athlete"
            onChange={handleAthleteFilterChange}
          >
            <MenuItem value="all">All Athletes</MenuItem>
            {athletes.map(athlete => (
              <MenuItem key={athlete.id} value={athlete.id}>
                {athlete.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredAssessments.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No assessments found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {assessments.length === 0 
              ? "You haven't created any assessments yet." 
              : "No assessments match your search criteria."}
          </Typography>
          {assessments.length === 0 && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/assessments/new"
              sx={{ mt: 2 }}
            >
              Create Your First Assessment
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredAssessments.map(assessment => {
            const athlete = athletes.find(a => a.id === assessment.athleteId);
            const overallScore = calculateOverallScore(
              assessment.performanceMetrics.technicalSkills,
              assessment.performanceMetrics.tacticalAwareness,
              assessment.performanceMetrics.physicalFitness,
              assessment.performanceMetrics.mentalFortitude,
              assessment.performanceMetrics.teamwork,
              assessment.performanceMetrics.coachability
            );
            
            return (
              <Grid item xs={12} sm={6} md={4} key={assessment.id}>
                <Card elevation={2}>
                  <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" component="h2">
                        {athlete ? athlete.name : 'Unknown Athlete'}
                      </Typography>
                      <Chip 
                        label={`${overallScore}/30`} 
                        color={getScoreColor(overallScore)}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Assessment Date: {formatDate(new Date(assessment.date))}
                    </Typography>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Technical: {assessment.performanceMetrics.technicalSkills}/5
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Tactical: {assessment.performanceMetrics.tacticalAwareness}/5
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Physical: {assessment.performanceMetrics.physicalFitness}/5
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Mental: {assessment.performanceMetrics.mentalFortitude}/5
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Teamwork: {assessment.performanceMetrics.teamwork}/5
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          Coachability: {assessment.performanceMetrics.coachability}/5
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  
                  <CardActions>
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/assessments/${assessment.id}`)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="small" 
                      color="secondary"
                      onClick={() => handleDeleteClick(assessment.id)}
                      startIcon={<DeleteIcon />}
                      sx={{ ml: 'auto' }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this assessment? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssessmentList; 