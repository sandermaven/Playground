// Quiz configuration types

export type Theme =
  | 'history'
  | 'contemporary'
  | 'general-trivia'
  | 'mix';

export type Difficulty =
  | 'easy'
  | 'medium'
  | 'hard'
  | 'very-hard';

export type DrinkingRule =
  | 'drink-on-wrong'
  | 'give-drink'
  | 'none';

export interface QuizConfig {
  themes: Theme[];
  difficulty: Difficulty;
  drinkingRule: DrinkingRule;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
  theme: Theme;
  difficulty: Difficulty;
  drinkingHint?: string;
}

export interface Quiz {
  id: string;
  config: QuizConfig;
  questions: Question[];
  createdAt: Date;
}

export interface OrderDetails {
  email: string;
  quizConfig: QuizConfig;
  quizId?: string;
}

// Theme display names
export const themeLabels: Record<Theme, string> = {
  'history': 'Geschiedenis',
  'contemporary': 'Hedendaags',
  'general-trivia': 'Algemene Trivia',
  'mix': 'Mix van Oud & Nieuw',
};

// Difficulty display names
export const difficultyLabels: Record<Difficulty, string> = {
  'easy': 'Makkelijk',
  'medium': 'Gemiddeld',
  'hard': 'Moeilijk',
  'very-hard': 'Zeer Moeilijk',
};

// Drinking rule display names
export const drinkingRuleLabels: Record<DrinkingRule, string> = {
  'drink-on-wrong': 'Bij fout antwoord: drankje nemen',
  'give-drink': 'Bij goed antwoord: drankje uitdelen',
  'none': 'Geen drankregels (neutraal)',
};
