export interface Athlete {
  id: string;
  name: string;
  sport: string;
  position: string;
  ageGrade: string;
  season: string;
  goals: string;
  profileImage?: string;
}

export type RatingScale = 1 | 2 | 3 | 4 | 5;

export interface PerformanceMetric {
  technicalSkills: RatingScale;
  tacticalAwareness: RatingScale;
  physicalFitness: RatingScale;
  mentalFortitude: RatingScale;
  teamwork: RatingScale;
  coachability: RatingScale;
}

export interface DevelopmentPlan {
  strengths: string[];
  areasForImprovement: string[];
  shortTermGoals: string[];
  mediumTermGoals: string[];
  longTermGoals: string[];
  recommendedDrills: string[];
}

export interface ProgressTracker {
  date: string;
  overallScore: number;
  keyFocus: string;
}

export type PerformanceTrend = 'improving' | 'plateaued' | 'inconsistent' | 'declining' | 'breakthrough';

export interface TechnicalSkill {
  name: string;
  rating: RatingScale;
  notes: string;
}

export interface Competition {
  id: string;
  date: string;
  opponent: string;
  result: string;
  playingTime: string;
  preCompetitionGoals: string[];
  keyStatistics: string[];
  highlightMoments: string[];
  challengeAreas: string[];
  mentalReadiness: RatingScale;
  executionOfGamePlan: RatingScale;
  adaptability: RatingScale;
  additionalObservations: string;
}

export interface SelfAssessment {
  whatWentWell: string;
  challenges: string;
  preparationEffectiveness: string;
  skillFocus: string;
  coachSupportNeeded: string;
}

export interface Assessment {
  id: string;
  athleteId: string;
  date: string;
  performanceMetrics: PerformanceMetric;
  developmentPlan: DevelopmentPlan;
  progress: {
    history: ProgressTracker[];
    trend: PerformanceTrend;
    notes: string;
  };
  technicalSkills: TechnicalSkill[];
  competitions: Competition[];
  selfAssessment?: SelfAssessment;
} 