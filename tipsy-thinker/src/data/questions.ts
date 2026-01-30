import type { Question, DrinkingRule, QuizConfig, Quiz } from '../types';

// Mock questions database organized by theme and difficulty
const questionsDatabase: Question[] = [
  // HISTORY - Easy
  { id: 1, question: 'In welk jaar viel de Berlijnse Muur?', answer: '1989', theme: 'history', difficulty: 'easy' },
  { id: 2, question: 'Wie was de eerste president van de Verenigde Staten?', answer: 'George Washington', theme: 'history', difficulty: 'easy' },
  { id: 3, question: 'In welke eeuw leefde Napoleon Bonaparte?', answer: '18e/19e eeuw (1769-1821)', theme: 'history', difficulty: 'easy' },
  { id: 4, question: 'Welk land ontdekte Columbus toen hij dacht India te bereiken?', answer: 'Amerika', theme: 'history', difficulty: 'easy' },
  { id: 5, question: 'Hoe heette het schip waarmee de Pilgrims naar Amerika voeren?', answer: 'De Mayflower', theme: 'history', difficulty: 'easy' },

  // HISTORY - Medium
  { id: 6, question: 'In welk jaar begon de Eerste Wereldoorlog?', answer: '1914', theme: 'history', difficulty: 'medium' },
  { id: 7, question: 'Wie was de Egyptische koningin die een relatie had met Julius Caesar en Marcus Antonius?', answer: 'Cleopatra', theme: 'history', difficulty: 'medium' },
  { id: 8, question: 'Welke Nederlandse stad werd in 1940 gebombardeerd door de Duitsers?', answer: 'Rotterdam', theme: 'history', difficulty: 'medium' },
  { id: 9, question: 'Hoe heette het verdrag dat de Eerste Wereldoorlog beëindigde?', answer: 'Verdrag van Versailles', theme: 'history', difficulty: 'medium' },
  { id: 10, question: 'Welke Russische tsaar werd tijdens de Russische Revolutie afgezet?', answer: 'Tsaar Nicolaas II', theme: 'history', difficulty: 'medium' },

  // HISTORY - Hard
  { id: 11, question: 'In welk jaar werd de Vrede van Westfalen getekend?', answer: '1648', theme: 'history', difficulty: 'hard' },
  { id: 12, question: 'Wie was de Romeinse keizer die het christendom legaliseerde?', answer: 'Constantijn de Grote', theme: 'history', difficulty: 'hard' },
  { id: 13, question: 'Welke slag in 1066 zorgde voor de Normandische verovering van Engeland?', answer: 'Slag bij Hastings', theme: 'history', difficulty: 'hard' },
  { id: 14, question: 'Wie schreef "De Vorst", een beroemd politiek traktaat uit de Renaissance?', answer: 'Niccolò Machiavelli', theme: 'history', difficulty: 'hard' },
  { id: 15, question: 'Welke stad was de hoofdstad van het Byzantijnse Rijk?', answer: 'Constantinopel (Istanbul)', theme: 'history', difficulty: 'hard' },

  // HISTORY - Very Hard
  { id: 16, question: 'Wie was de laatste Azteekse keizer?', answer: 'Cuauhtémoc', theme: 'history', difficulty: 'very-hard' },
  { id: 17, question: 'In welk jaar werd de Magna Carta ondertekend?', answer: '1215', theme: 'history', difficulty: 'very-hard' },
  { id: 18, question: 'Wie was de opperbevelhebber van de Spartanen bij de Slag bij Thermopylae?', answer: 'Koning Leonidas I', theme: 'history', difficulty: 'very-hard' },
  { id: 19, question: 'Welke Chinese dynastie bouwde het grootste deel van de Grote Muur?', answer: 'Ming-dynastie', theme: 'history', difficulty: 'very-hard' },
  { id: 20, question: 'Hoe heette de vredesovereenkomst die de Tachtigjarige Oorlog beëindigde?', answer: 'Vrede van Münster', theme: 'history', difficulty: 'very-hard' },

  // CONTEMPORARY - Easy
  { id: 21, question: 'Wie is de oprichter van Tesla?', answer: 'Elon Musk', theme: 'contemporary', difficulty: 'easy' },
  { id: 22, question: 'Welke app staat bekend om korte video\'s met muziek en dans?', answer: 'TikTok', theme: 'contemporary', difficulty: 'easy' },
  { id: 23, question: 'Welk land organiseerde het WK voetbal in 2022?', answer: 'Qatar', theme: 'contemporary', difficulty: 'easy' },
  { id: 24, question: 'Hoe heet de CEO van Amazon?', answer: 'Andy Jassy (voorheen Jeff Bezos)', theme: 'contemporary', difficulty: 'easy' },
  { id: 25, question: 'Welke streamingdienst maakte de serie "Squid Game"?', answer: 'Netflix', theme: 'contemporary', difficulty: 'easy' },

  // CONTEMPORARY - Medium
  { id: 26, question: 'In welk jaar brak de COVID-19 pandemie uit?', answer: '2019/2020', theme: 'contemporary', difficulty: 'medium' },
  { id: 27, question: 'Welke cryptocurrency werd als eerste gecreëerd?', answer: 'Bitcoin', theme: 'contemporary', difficulty: 'medium' },
  { id: 28, question: 'Hoe heet de AI-chatbot van OpenAI?', answer: 'ChatGPT', theme: 'contemporary', difficulty: 'medium' },
  { id: 29, question: 'Welk bedrijf kocht Twitter in 2022?', answer: 'X Corp (Elon Musk)', theme: 'contemporary', difficulty: 'medium' },
  { id: 30, question: 'Welke Nederlandse DJ won meerdere keren de DJ Mag Top 100?', answer: 'Martin Garrix / Tiësto / Armin van Buuren', theme: 'contemporary', difficulty: 'medium' },

  // CONTEMPORARY - Hard
  { id: 31, question: 'Hoe heet het metaverse-bedrijf waar Facebook naar hernoemd is?', answer: 'Meta', theme: 'contemporary', difficulty: 'hard' },
  { id: 32, question: 'Welke telescoop werd in 2021 gelanceerd als opvolger van Hubble?', answer: 'James Webb Space Telescope', theme: 'contemporary', difficulty: 'hard' },
  { id: 33, question: 'Wie won de Nobelprijs voor de Vrede in 2021?', answer: 'Maria Ressa en Dmitri Moerat', theme: 'contemporary', difficulty: 'hard' },
  { id: 34, question: 'Welk land verliet de EU in 2020?', answer: 'Verenigd Koninkrijk (Brexit)', theme: 'contemporary', difficulty: 'hard' },
  { id: 35, question: 'Hoe heet de elektrische truck van Tesla?', answer: 'Cybertruck', theme: 'contemporary', difficulty: 'hard' },

  // CONTEMPORARY - Very Hard
  { id: 36, question: 'Welke overeenkomst over klimaatverandering werd in 2015 in Parijs getekend?', answer: 'Akkoord van Parijs', theme: 'contemporary', difficulty: 'very-hard' },
  { id: 37, question: 'Wie is de huidige secretaris-generaal van de Verenigde Naties?', answer: 'António Guterres', theme: 'contemporary', difficulty: 'very-hard' },
  { id: 38, question: 'Welk bedrijf ontwikkelde het CRISPR-Cas9 gen-editing systeem?', answer: 'Geen bedrijf - ontwikkeld door Jennifer Doudna en Emmanuelle Charpentier', theme: 'contemporary', difficulty: 'very-hard' },
  { id: 39, question: 'Hoe heet de eerste privé ruimtemissie met alleen burgers aan boord?', answer: 'Inspiration4', theme: 'contemporary', difficulty: 'very-hard' },
  { id: 40, question: 'Welke cryptocurrency platform crashte spectaculair in 2022?', answer: 'FTX', theme: 'contemporary', difficulty: 'very-hard' },

  // GENERAL TRIVIA - Easy
  { id: 41, question: 'Hoeveel continenten zijn er?', answer: '7', theme: 'general-trivia', difficulty: 'easy' },
  { id: 42, question: 'Wat is de hoofdstad van Australië?', answer: 'Canberra', theme: 'general-trivia', difficulty: 'easy' },
  { id: 43, question: 'Hoeveel planeten heeft ons zonnestelsel?', answer: '8', theme: 'general-trivia', difficulty: 'easy' },
  { id: 44, question: 'Wat is het grootste zoogdier op aarde?', answer: 'De blauwe vinvis', theme: 'general-trivia', difficulty: 'easy' },
  { id: 45, question: 'In welk land staat de Eiffeltoren?', answer: 'Frankrijk', theme: 'general-trivia', difficulty: 'easy' },

  // GENERAL TRIVIA - Medium
  { id: 46, question: 'Wat is de chemische formule voor water?', answer: 'H2O', theme: 'general-trivia', difficulty: 'medium' },
  { id: 47, question: 'Wie schilderde de Mona Lisa?', answer: 'Leonardo da Vinci', theme: 'general-trivia', difficulty: 'medium' },
  { id: 48, question: 'Wat is de langste rivier ter wereld?', answer: 'De Nijl', theme: 'general-trivia', difficulty: 'medium' },
  { id: 49, question: 'Hoeveel botten heeft het menselijk lichaam?', answer: '206', theme: 'general-trivia', difficulty: 'medium' },
  { id: 50, question: 'Wat is de munteenheid van Japan?', answer: 'Yen', theme: 'general-trivia', difficulty: 'medium' },

  // GENERAL TRIVIA - Hard
  { id: 51, question: 'Wat is het atoomnummer van goud?', answer: '79', theme: 'general-trivia', difficulty: 'hard' },
  { id: 52, question: 'Wie schreef "Crime and Punishment"?', answer: 'Fjodor Dostojevski', theme: 'general-trivia', difficulty: 'hard' },
  { id: 53, question: 'Wat is de diepste plek in de oceaan?', answer: 'Marianentrog (Challenger Deep)', theme: 'general-trivia', difficulty: 'hard' },
  { id: 54, question: 'Hoeveel toetsen heeft een standaard piano?', answer: '88', theme: 'general-trivia', difficulty: 'hard' },
  { id: 55, question: 'Wat is de snelste vis ter wereld?', answer: 'Zeilvis (Sailfish)', theme: 'general-trivia', difficulty: 'hard' },

  // GENERAL TRIVIA - Very Hard
  { id: 56, question: 'Wat is het kleinste land ter wereld qua oppervlakte?', answer: 'Vaticaanstad', theme: 'general-trivia', difficulty: 'very-hard' },
  { id: 57, question: 'Wie ontdekte penicilline?', answer: 'Alexander Fleming', theme: 'general-trivia', difficulty: 'very-hard' },
  { id: 58, question: 'Wat is de hardste natuurlijke stof op aarde?', answer: 'Diamant', theme: 'general-trivia', difficulty: 'very-hard' },
  { id: 59, question: 'Hoeveel chromosomen heeft een mens?', answer: '46', theme: 'general-trivia', difficulty: 'very-hard' },
  { id: 60, question: 'Wie componeerde "De Vier Jaargetijden"?', answer: 'Antonio Vivaldi', theme: 'general-trivia', difficulty: 'very-hard' },
];

// Drinking hints based on rules
const drinkingHints: Record<DrinkingRule, (isCorrect: boolean) => string> = {
  'drink-on-wrong': () => '🍺 Fout? Neem een slok!',
  'give-drink': () => '🍻 Goed? Deel een slok uit!',
  'none': () => '',
};

// Generate a unique quiz ID
const generateQuizId = (): string => {
  return `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a quiz based on configuration
export const generateQuiz = (config: QuizConfig): Quiz => {
  const { themes, difficulty, drinkingRule } = config;

  // Filter questions by selected themes and difficulty
  let eligibleQuestions = questionsDatabase.filter(q => {
    const themeMatch = themes.includes(q.theme) || themes.includes('mix');
    const difficultyMatch = q.difficulty === difficulty;
    return themeMatch && difficultyMatch;
  });

  // If 'mix' is selected, include all themes
  if (themes.includes('mix')) {
    eligibleQuestions = questionsDatabase.filter(q => q.difficulty === difficulty);
  }

  // Shuffle and pick 10 questions (or fewer if not enough available)
  const shuffledQuestions = shuffleArray(eligibleQuestions);
  const selectedQuestions = shuffledQuestions.slice(0, 10);

  // Add drinking hints if applicable
  const questionsWithHints = selectedQuestions.map(q => ({
    ...q,
    drinkingHint: drinkingRule !== 'none' ? drinkingHints[drinkingRule](true) : undefined,
  }));

  return {
    id: generateQuizId(),
    config,
    questions: questionsWithHints,
    createdAt: new Date(),
  };
};

// Store quizzes in memory (in production, this would be a database)
const quizStore: Map<string, Quiz> = new Map();

export const saveQuiz = (quiz: Quiz): void => {
  quizStore.set(quiz.id, quiz);
  // Also save to localStorage for persistence across page reloads
  try {
    const stored = localStorage.getItem('tipsy-quizzes') || '{}';
    const quizzes = JSON.parse(stored);
    quizzes[quiz.id] = quiz;
    localStorage.setItem('tipsy-quizzes', JSON.stringify(quizzes));
  } catch (e) {
    console.warn('Could not save quiz to localStorage', e);
  }
};

export const getQuiz = (id: string): Quiz | undefined => {
  // First check memory
  if (quizStore.has(id)) {
    return quizStore.get(id);
  }
  // Then check localStorage
  try {
    const stored = localStorage.getItem('tipsy-quizzes') || '{}';
    const quizzes = JSON.parse(stored);
    if (quizzes[id]) {
      const quiz = quizzes[id];
      quiz.createdAt = new Date(quiz.createdAt);
      quizStore.set(id, quiz);
      return quiz;
    }
  } catch (e) {
    console.warn('Could not load quiz from localStorage', e);
  }
  return undefined;
};
