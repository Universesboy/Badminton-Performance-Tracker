import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const CompetitionList: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Competitions
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/competitions/new"
          disabled
        >
          Add Competition
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          The competition tracking feature will be implemented in a future update.
        </Alert>
        
        <Typography variant="body1" paragraph>
          This section will allow you to:
        </Typography>
        
        <ul>
          <li>
            <Typography variant="body1" gutterBottom>
              Record competition details including date, opponent, and results
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              Set pre-competition goals for athletes
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              Track key statistics and performance metrics during competitions
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              Document highlight moments and areas of challenge
            </Typography>
          </li>
          <li>
            <Typography variant="body1" gutterBottom>
              Evaluate mental readiness, execution of game plan, and adaptability
            </Typography>
          </li>
        </ul>
        
        <Typography variant="body1" sx={{ mt: 2 }}>
          Check back soon for this feature!
        </Typography>
      </Paper>
    </Box>
  );
};

export default CompetitionList; 