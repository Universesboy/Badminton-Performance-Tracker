import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  Divider
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAthleteContext } from '../contexts/AthleteContext';
import QuickAssessment from '../components/assessment/QuickAssessment';
import DevelopmentPlan from '../components/performance/DevelopmentPlan';
import { Assessment, PerformanceMetric, DevelopmentPlan as DevelopmentPlanType } from '../types';
import { generateId, formatDate } from '../utils/helpers';
import { SelectChangeEvent } from '@mui/material';

const steps = ['Select Athlete', 'Performance Assessment', 'Development Plan', 'Review & Save'];

const AssessmentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { athletes, assessments, addAssessment, updateAssessment } = useAthleteContext();
  
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>('');
  const [assessmentDate, setAssessmentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric>({
    technicalSkills: 3,
    tacticalAwareness: 3,
    physicalFitness: 3,
    mentalFortitude: 3,
    teamwork: 3,
    coachability: 3
  });
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlanType>({
    strengths: [],
    areasForImprovement: [],
    shortTermGoals: [],
    mediumTermGoals: [],
    longTermGoals: [],
    recommendedDrills: []
  });

  // Check if we're editing an existing assessment
  const existingAssessment = id && id !== 'new' 
    ? assessments.find(a => a.id === id) 
    : null;

  // Initialize form with existing assessment data if editing
  useEffect(() => {
    if (existingAssessment) {
      setSelectedAthleteId(existingAssessment.athleteId);
      setAssessmentDate(existingAssessment.date);
      setPerformanceMetrics(existingAssessment.performanceMetrics);
      setDevelopmentPlan(existingAssessment.developmentPlan);
      
      // Skip athlete selection step if editing
      if (activeStep === 0) {
        setActiveStep(1);
      }
    } else if (location.state && location.state.athleteId) {
      // If coming from athlete detail page with athleteId in state
      setSelectedAthleteId(location.state.athleteId);
      if (activeStep === 0) {
        setActiveStep(1);
      }
    }
  }, [existingAssessment, location.state, activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAthleteChange = (event: SelectChangeEvent) => {
    setSelectedAthleteId(event.target.value as string);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssessmentDate(event.target.value);
  };

  const handlePerformanceMetricsChange = (metrics: PerformanceMetric) => {
    setPerformanceMetrics(metrics);
    handleNext();
  };

  const handleDevelopmentPlanChange = (plan: DevelopmentPlanType) => {
    setDevelopmentPlan(plan);
    handleNext();
  };

  const handleSave = () => {
    const assessmentData: Assessment = {
      id: existingAssessment ? existingAssessment.id : generateId(),
      athleteId: selectedAthleteId,
      date: assessmentDate,
      performanceMetrics,
      developmentPlan,
      progress: existingAssessment ? existingAssessment.progress : {
        history: [{
          date: assessmentDate,
          overallScore: Object.values(performanceMetrics).reduce((sum, val) => sum + val, 0),
          keyFocus: developmentPlan.areasForImprovement[0] || ''
        }],
        trend: 'improving',
        notes: ''
      },
      technicalSkills: existingAssessment ? existingAssessment.technicalSkills : [],
      competitions: existingAssessment ? existingAssessment.competitions : [],
    };

    if (existingAssessment) {
      updateAssessment(assessmentData);
    } else {
      addAssessment(assessmentData);
    }

    // Navigate back to assessments list
    navigate('/assessments');
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Athlete
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="athlete-select-label">Athlete</InputLabel>
              <Select
                labelId="athlete-select-label"
                value={selectedAthleteId}
                label="Athlete"
                onChange={handleAthleteChange}
              >
                {athletes.map((athlete) => (
                  <MenuItem key={athlete.id} value={athlete.id}>
                    {athlete.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Assessment Date"
              type="date"
              value={assessmentDate}
              onChange={handleDateChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {athletes.length === 0 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                You need to add athletes before creating assessments.
              </Alert>
            )}
          </Box>
        );
      case 1:
        return (
          <QuickAssessment
            initialValues={performanceMetrics}
            onSave={handlePerformanceMetricsChange}
          />
        );
      case 2:
        return (
          <DevelopmentPlan
            initialValues={developmentPlan}
            onSave={handleDevelopmentPlanChange}
          />
        );
      case 3:
        const athlete = athletes.find(a => a.id === selectedAthleteId);
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review Assessment
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Athlete:</strong> {athlete ? athlete.name : 'Unknown'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Date:</strong> {formatDate(new Date(assessmentDate))}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Overall Score:</strong> {Object.values(performanceMetrics).reduce((sum, val) => sum + val, 0)}/30
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                <strong>Performance Metrics:</strong>
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2">Technical Skills: {performanceMetrics.technicalSkills}/5</Typography>
                <Typography variant="body2">Tactical Awareness: {performanceMetrics.tacticalAwareness}/5</Typography>
                <Typography variant="body2">Physical Fitness: {performanceMetrics.physicalFitness}/5</Typography>
                <Typography variant="body2">Mental Fortitude: {performanceMetrics.mentalFortitude}/5</Typography>
                <Typography variant="body2">Teamwork: {performanceMetrics.teamwork}/5</Typography>
                <Typography variant="body2">Coachability: {performanceMetrics.coachability}/5</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                <strong>Development Plan:</strong>
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Strengths:</strong> {developmentPlan.strengths.length > 0 
                    ? developmentPlan.strengths.join(', ') 
                    : 'None specified'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Areas for Improvement:</strong> {developmentPlan.areasForImprovement.length > 0 
                    ? developmentPlan.areasForImprovement.join(', ') 
                    : 'None specified'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Short-term Goals:</strong> {developmentPlan.shortTermGoals.length > 0 
                    ? developmentPlan.shortTermGoals.join(', ') 
                    : 'None specified'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Medium-term Goals:</strong> {developmentPlan.mediumTermGoals.length > 0 
                    ? developmentPlan.mediumTermGoals.join(', ') 
                    : 'None specified'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Long-term Goals:</strong> {developmentPlan.longTermGoals.length > 0 
                    ? developmentPlan.longTermGoals.join(', ') 
                    : 'None specified'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Recommended Drills:</strong> {developmentPlan.recommendedDrills.length > 0 
                    ? developmentPlan.recommendedDrills.join(', ') 
                    : 'None specified'}
                </Typography>
              </Box>
            </Paper>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {existingAssessment ? 'Edit Assessment' : 'New Assessment'}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ mb: 3 }}>
        {getStepContent(activeStep)}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!selectedAthleteId}
          >
            {existingAssessment ? 'Update Assessment' : 'Save Assessment'}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !selectedAthleteId) ||
              (activeStep === 1 && Object.values(performanceMetrics).some(val => val === 0)) ||
              (activeStep === 2 && (
                developmentPlan.strengths.length === 0 &&
                developmentPlan.areasForImprovement.length === 0
              ))
            }
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AssessmentForm; 