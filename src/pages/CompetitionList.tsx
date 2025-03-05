import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Alert,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useCompetitionContext } from '../contexts/CompetitionContext';
import { useAthleteContext } from '../contexts/AthleteContext';
import CompetitionCard from '../components/competition/CompetitionCard';

const CompetitionList: React.FC = () => {
  const { competitions, deleteCompetition } = useCompetitionContext();
  const { athletes } = useAthleteContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date-desc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);

  // Handle sort menu
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const sortMenuOpen = Boolean(sortAnchorEl);

  const handleSortMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelect = (option: string) => {
    setSortOption(option);
    handleSortMenuClose();
  };

  // Actions menu for each competition
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, competitionId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedCompetitionId(competitionId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCompetitionId(null);
  };

  const handleDeleteCompetition = () => {
    if (selectedCompetitionId) {
      deleteCompetition(selectedCompetitionId);
      handleMenuClose();
    }
  };

  // Filter competitions by search term
  const filteredCompetitions = competitions.filter((competition) => {
    const searchTermLower = searchTerm.toLowerCase();
    const athlete = athletes.find(a => a.id === competition.athleteId);

    return (
      competition.opponent.toLowerCase().includes(searchTermLower) ||
      (athlete && athlete.name.toLowerCase().includes(searchTermLower)) ||
      competition.result.toLowerCase().includes(searchTermLower)
    );
  });

  // Sort competitions
  const sortedCompetitions = [...filteredCompetitions].sort((a, b) => {
    switch (sortOption) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'opponent-asc':
        return a.opponent.localeCompare(b.opponent);
      case 'opponent-desc':
        return b.opponent.localeCompare(a.opponent);
      default:
        return 0;
    }
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get athlete name by ID
  const getAthleteName = (athleteId: string) => {
    const athlete = athletes.find(a => a.id === athleteId);
    return athlete ? athlete.name : 'Unknown Athlete';
  };

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
        >
          Add Competition
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TextField
            placeholder="Search competitions..."
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Sort competitions">
              <Button
                startIcon={<SortIcon />}
                variant="outlined"
                onClick={handleSortMenuClick}
                size="medium"
              >
                Sort
              </Button>
            </Tooltip>
            <Menu
              anchorEl={sortAnchorEl}
              open={sortMenuOpen}
              onClose={handleSortMenuClose}
            >
              <MenuItem 
                onClick={() => handleSortSelect('date-desc')}
                selected={sortOption === 'date-desc'}
              >
                Latest First
              </MenuItem>
              <MenuItem 
                onClick={() => handleSortSelect('date-asc')}
                selected={sortOption === 'date-asc'}
              >
                Oldest First
              </MenuItem>
              <MenuItem 
                onClick={() => handleSortSelect('opponent-asc')}
                selected={sortOption === 'opponent-asc'}
              >
                Opponent (A-Z)
              </MenuItem>
              <MenuItem 
                onClick={() => handleSortSelect('opponent-desc')}
                selected={sortOption === 'opponent-desc'}
              >
                Opponent (Z-A)
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {competitions.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <EmojiEventsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No competitions recorded yet
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Start tracking your competitions to analyze performance and growth over time.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={Link}
              to="/competitions/new"
            >
              Add Your First Competition
            </Button>
          </Box>
        ) : sortedCompetitions.length === 0 ? (
          <Alert severity="info">
            No competitions match your search criteria. Try a different search term.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {sortedCompetitions.map((competition) => (
              <Grid item xs={12} sm={6} md={4} key={competition.id}>
                <CompetitionCard 
                  competition={competition}
                  athleteName={getAthleteName(competition.athleteId)}
                  onMenuClick={handleMenuClick}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          component={Link} 
          to={`/competitions/${selectedCompetitionId}`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          View
        </MenuItem>
        <MenuItem 
          component={Link} 
          to={`/competitions/edit/${selectedCompetitionId}`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteCompetition}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CompetitionList; 