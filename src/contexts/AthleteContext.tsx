import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Athlete, Assessment } from '../types';

interface AthleteContextType {
  athletes: Athlete[];
  assessments: Assessment[];
  currentAthlete: Athlete | null;
  setCurrentAthlete: (athlete: Athlete | null) => void;
  addAthlete: (athlete: Athlete) => void;
  updateAthlete: (athlete: Athlete) => void;
  deleteAthlete: (id: string) => void;
  addAssessment: (assessment: Assessment) => void;
  updateAssessment: (assessment: Assessment) => void;
  deleteAssessment: (id: string) => void;
  getAthleteAssessments: (athleteId: string) => Assessment[];
}

const AthleteContext = createContext<AthleteContextType | undefined>(undefined);

interface AthleteProviderProps {
  children: ReactNode;
}

export const AthleteProvider: React.FC<AthleteProviderProps> = ({ children }) => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [currentAthlete, setCurrentAthlete] = useState<Athlete | null>(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedAthletes = localStorage.getItem('athletes');
    const storedAssessments = localStorage.getItem('assessments');
    
    if (storedAthletes) {
      setAthletes(JSON.parse(storedAthletes));
    }
    
    if (storedAssessments) {
      setAssessments(JSON.parse(storedAssessments));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('athletes', JSON.stringify(athletes));
  }, [athletes]);

  useEffect(() => {
    localStorage.setItem('assessments', JSON.stringify(assessments));
  }, [assessments]);

  const addAthlete = (athlete: Athlete) => {
    setAthletes([...athletes, athlete]);
  };

  const updateAthlete = (updatedAthlete: Athlete) => {
    setAthletes(athletes.map(athlete => 
      athlete.id === updatedAthlete.id ? updatedAthlete : athlete
    ));
  };

  const deleteAthlete = (id: string) => {
    setAthletes(athletes.filter(athlete => athlete.id !== id));
    // Also delete all assessments for this athlete
    setAssessments(assessments.filter(assessment => assessment.athleteId !== id));
  };

  const addAssessment = (assessment: Assessment) => {
    setAssessments([...assessments, assessment]);
  };

  const updateAssessment = (updatedAssessment: Assessment) => {
    setAssessments(assessments.map(assessment => 
      assessment.id === updatedAssessment.id ? updatedAssessment : assessment
    ));
  };

  const deleteAssessment = (id: string) => {
    setAssessments(assessments.filter(assessment => assessment.id !== id));
  };

  const getAthleteAssessments = (athleteId: string) => {
    return assessments.filter(assessment => assessment.athleteId === athleteId);
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        assessments,
        currentAthlete,
        setCurrentAthlete,
        addAthlete,
        updateAthlete,
        deleteAthlete,
        addAssessment,
        updateAssessment,
        deleteAssessment,
        getAthleteAssessments,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};

export const useAthleteContext = () => {
  const context = useContext(AthleteContext);
  if (context === undefined) {
    throw new Error('useAthleteContext must be used within an AthleteProvider');
  }
  return context;
}; 