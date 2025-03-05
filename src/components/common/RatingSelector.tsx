import React from 'react';
import { 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Tooltip, 
  Box, 
  Typography
} from '@mui/material';
import { getRatingDescription, getRatingColor } from '../../utils/helpers';
import { RatingScale } from '../../types';

interface RatingSelectorProps {
  name: string;
  label: string;
  value: RatingScale;
  onChange: (value: RatingScale) => void;
  descriptions?: { [key: number]: string };
}

const RatingSelector: React.FC<RatingSelectorProps> = ({
  name,
  label,
  value,
  onChange,
  descriptions,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value) as RatingScale);
  };

  const getDescription = (rating: number) => {
    if (descriptions && descriptions[rating]) {
      return descriptions[rating];
    }
    return getRatingDescription(rating);
  };

  return (
    <FormControl component="fieldset" sx={{ my: 1, width: '100%' }}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        name={name}
        value={value.toString()}
        onChange={handleChange}
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <Tooltip 
            key={rating} 
            title={getDescription(rating)}
            arrow
            placement="top"
          >
            <FormControlLabel
              value={rating.toString()}
              control={
                <Radio 
                  sx={{
                    color: getRatingColor(rating),
                    '&.Mui-checked': {
                      color: getRatingColor(rating),
                    },
                  }}
                />
              }
              label={
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="body2">{rating}</Typography>
                  <Typography variant="caption" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {getDescription(rating)}
                  </Typography>
                </Box>
              }
              sx={{
                m: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}
            />
          </Tooltip>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RatingSelector; 