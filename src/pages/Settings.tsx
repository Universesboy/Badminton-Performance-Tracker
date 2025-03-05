import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import { useAthleteContext } from '../contexts/AthleteContext';

const Settings: React.FC = () => {
  const { athletes, assessments } = useAthleteContext();
  const [darkMode, setDarkMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    setSnackbarOpen(true);
  };

  const handleClearDataClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClearData = () => {
    // In a real app, this would clear all data
    localStorage.removeItem('athletes');
    localStorage.removeItem('assessments');
    setOpenDialog(false);
    // Force page reload to clear state
    window.location.reload();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={2} sx={{ mb: 3 }}>
        <List>
          <ListItem>
            <ListItemText 
              primary="Dark Mode" 
              secondary="Toggle between light and dark theme"
            />
            <Switch
              edge="end"
              checked={darkMode}
              onChange={handleDarkModeToggle}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Data Summary" 
              secondary={`${athletes.length} athletes, ${assessments.length} assessments`}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Clear All Data" 
              secondary="This will permanently delete all athletes and assessments"
              primaryTypographyProps={{ color: 'error' }}
            />
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleClearDataClick}
              disabled={athletes.length === 0 && assessments.length === 0}
            >
              Clear Data
            </Button>
          </ListItem>
        </List>
      </Paper>

      <Alert severity="info" sx={{ mt: 2 }}>
        More settings will be available in future updates.
      </Alert>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>Confirm Data Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all data? This action cannot be undone and will remove all athletes and assessments from the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleClearData} color="error" autoFocus>
            Delete All Data
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for dark mode toggle */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="This feature will be implemented in a future update"
      />
    </Box>
  );
};

export default Settings; 