import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { QuizConfig, OrderDetails, Theme, Difficulty, DrinkingRule } from '../types';

interface QuizContextType {
  config: QuizConfig;
  orderDetails: OrderDetails | null;
  setThemes: (themes: Theme[]) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setDrinkingRule: (rule: DrinkingRule) => void;
  setEmail: (email: string) => void;
  setQuizId: (id: string) => void;
  resetConfig: () => void;
}

const defaultConfig: QuizConfig = {
  themes: [],
  difficulty: 'medium',
  drinkingRule: 'none',
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<QuizConfig>(defaultConfig);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const setThemes = (themes: Theme[]) => {
    setConfig(prev => ({ ...prev, themes }));
  };

  const setDifficulty = (difficulty: Difficulty) => {
    setConfig(prev => ({ ...prev, difficulty }));
  };

  const setDrinkingRule = (drinkingRule: DrinkingRule) => {
    setConfig(prev => ({ ...prev, drinkingRule }));
  };

  const setEmail = (email: string) => {
    setOrderDetails({ email, quizConfig: config });
  };

  const setQuizId = (quizId: string) => {
    setOrderDetails(prev => prev ? { ...prev, quizId } : null);
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    setOrderDetails(null);
  };

  return (
    <QuizContext.Provider
      value={{
        config,
        orderDetails,
        setThemes,
        setDifficulty,
        setDrinkingRule,
        setEmail,
        setQuizId,
        resetConfig,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
