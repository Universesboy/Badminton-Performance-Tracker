import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Competition } from '../../types';

interface CompetitionCardProps {
  competition: Competition;
  athleteName: string;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, competitionId: string) => void;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CompetitionCard: React.FC<CompetitionCardProps> = ({ 
  competition, 
  athleteName, 
  onMenuClick 
}) => {
  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="h2" gutterBottom noWrap sx={{ maxWidth: '80%' }}>
            {competition.opponent}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => onMenuClick(e, competition.id)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatDate(competition.date)}
        </Typography>
        
        <Box sx={{ my: 1 }}>
          <Chip 
            label={athleteName} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Result: {competition.result}
        </Typography>
        
        {competition.keyStatistics.length > 0 && (
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Key Statistics:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {competition.keyStatistics.slice(0, 2).map((stat, index) => (
                <Chip
                  key={index}
                  label={stat}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
              {competition.keyStatistics.length > 2 && (
                <Chip
                  label={`+${competition.keyStatistics.length - 2} more`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
            </Box>
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        <Button 
          component={Link} 
          to={`/competitions/${competition.id}`}
          size="small" 
          startIcon={<VisibilityIcon />}
        >
          View
        </Button>
        <Button 
          component={Link} 
          to={`/competitions/edit/${competition.id}`}
          size="small" 
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default CompetitionCard; 