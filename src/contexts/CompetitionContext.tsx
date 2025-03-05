import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Competition } from '../types';

interface CompetitionContextType {
  competitions: Competition[];
  currentCompetition: Competition | null;
  setCurrentCompetition: (competition: Competition | null) => void;
  addCompetition: (competition: Competition) => void;
  updateCompetition: (competition: Competition) => void;
  deleteCompetition: (id: string) => void;
  getAthleteCompetitions: (athleteId: string) => Competition[];
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

interface CompetitionProviderProps {
  children: ReactNode;
}

export const CompetitionProvider: React.FC<CompetitionProviderProps> = ({ children }) => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [currentCompetition, setCurrentCompetition] = useState<Competition | null>(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedCompetitions = localStorage.getItem('competitions');
    
    if (storedCompetitions) {
      setCompetitions(JSON.parse(storedCompetitions));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('competitions', JSON.stringify(competitions));
  }, [competitions]);

  const addCompetition = (competition: Competition) => {
    setCompetitions([...competitions, competition]);
  };

  const updateCompetition = (updatedCompetition: Competition) => {
    setCompetitions(competitions.map(competition => 
      competition.id === updatedCompetition.id ? updatedCompetition : competition
    ));
  };

  const deleteCompetition = (id: string) => {
    setCompetitions(competitions.filter(competition => competition.id !== id));
  };

  const getAthleteCompetitions = (athleteId: string) => {
    return competitions.filter(competition => competition.athleteId === athleteId);
  };

  return (
    <CompetitionContext.Provider
      value={{
        competitions,
        currentCompetition,
        setCurrentCompetition,
        addCompetition,
        updateCompetition,
        deleteCompetition,
        getAthleteCompetitions,
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetitionContext = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetitionContext must be used within a CompetitionProvider');
  }
  return context;
}; 