import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAthleteContext } from '../contexts/AthleteContext';
import AthleteProfile from '../components/athlete/AthleteProfile';

const AthleteList: React.FC = () => {
  const { athletes, deleteAthlete } = useAthleteContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAthletes = athletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setSelectedAthleteId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAthleteId) {
      deleteAthlete(selectedAthleteId);
      setOpenDialog(false);
      setSelectedAthleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedAthleteId(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Athletes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/athletes/new"
        >
          Add Athlete
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search athletes by name, sport, or position..."
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
      </Box>

      {filteredAthletes.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No athletes found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {athletes.length === 0 
              ? "You haven't added any athletes yet." 
              : "No athletes match your search criteria."}
          </Typography>
          {athletes.length === 0 && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/athletes/new"
              sx={{ mt: 2 }}
            >
              Add Your First Athlete
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredAthletes.map(athlete => (
            <Grid item xs={12} sm={6} md={4} key={athlete.id}>
              <Card elevation={2}>
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        bgcolor: 'primary.main',
                        mr: 2
                      }}
                    >
                      {athlete.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h2">
                        {athlete.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {athlete.sport} • {athlete.position}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Age/Grade:</strong> {athlete.ageGrade}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Season:</strong> {athlete.season}
                  </Typography>
                  <Typography variant="body2" noWrap>
                    <strong>Goals:</strong> {athlete.goals}
                  </Typography>
                </CardContent>
                
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => navigate(`/athletes/${athlete.id}`)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="small" 
                    color="secondary"
                    onClick={() => handleDeleteClick(athlete.id)}
                    startIcon={<DeleteIcon />}
                    sx={{ ml: 'auto' }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
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
            Are you sure you want to delete this athlete? This will also delete all associated assessments and cannot be undone.
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

export default AthleteList; 