/**
 * Generates a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Formats a date to MM/DD/YYYY
 */
export const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
};

/**
 * Calculates the overall score from performance metrics
 */
export const calculateOverallScore = (
  technicalSkills: number,
  tacticalAwareness: number,
  physicalFitness: number,
  mentalFortitude: number,
  teamwork: number,
  coachability: number
): number => {
  return technicalSkills + tacticalAwareness + physicalFitness + 
         mentalFortitude + teamwork + coachability;
};

/**
 * Get rating description based on rating value
 */
export const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'Needs Work';
    case 2:
      return 'Developing';
    case 3:
      return 'Satisfactory';
    case 4:
      return 'Proficient';
    case 5:
      return 'Excellent';
    default:
      return 'Not Rated';
  }
};

/**
 * Get color for rating value
 */
export const getRatingColor = (rating: number): string => {
  switch (rating) {
    case 1:
      return '#f44336'; // Red
    case 2:
      return '#ff9800'; // Orange
    case 3:
      return '#ffeb3b'; // Yellow
    case 4:
      return '#4caf50'; // Green
    case 5:
      return '#2196f3'; // Blue
    default:
      return '#9e9e9e'; // Grey
  }
};

/**
 * Get trend icon and color
 */
export const getTrendInfo = (trend: string): { icon: string; color: string } => {
  switch (trend) {
    case 'improving':
      return { icon: 'trending_up', color: '#4caf50' };
    case 'plateaued':
      return { icon: 'trending_flat', color: '#ffeb3b' };
    case 'inconsistent':
      return { icon: 'shuffle', color: '#ff9800' };
    case 'declining':
      return { icon: 'trending_down', color: '#f44336' };
    case 'breakthrough':
      return { icon: 'star', color: '#2196f3' };
    default:
      return { icon: 'help', color: '#9e9e9e' };
  }
}; 