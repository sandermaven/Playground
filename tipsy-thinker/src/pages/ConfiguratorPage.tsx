import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useQuiz } from '../context/QuizContext';
import type { Theme, Difficulty, DrinkingRule } from '../types';
import { themeLabels, difficultyLabels, drinkingRuleLabels } from '../types';

type Step = 'themes' | 'difficulty' | 'drinking' | 'summary';

export default function ConfiguratorPage() {
  const navigate = useNavigate();
  const { config, setThemes, setDifficulty, setDrinkingRule } = useQuiz();
  const [currentStep, setCurrentStep] = useState<Step>('themes');
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>(config.themes);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(config.difficulty);
  const [selectedDrinkingRule, setSelectedDrinkingRule] = useState<DrinkingRule>(config.drinkingRule);

  const steps: Step[] = ['themes', 'difficulty', 'drinking', 'summary'];
  const stepIndex = steps.indexOf(currentStep);

  const toggleTheme = (theme: Theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(t => t !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const handleNext = () => {
    if (currentStep === 'themes') {
      setThemes(selectedThemes);
      setCurrentStep('difficulty');
    } else if (currentStep === 'difficulty') {
      setDifficulty(selectedDifficulty);
      setCurrentStep('drinking');
    } else if (currentStep === 'drinking') {
      setDrinkingRule(selectedDrinkingRule);
      setCurrentStep('summary');
    }
  };

  const handleBack = () => {
    if (currentStep === 'difficulty') {
      setCurrentStep('themes');
    } else if (currentStep === 'drinking') {
      setCurrentStep('difficulty');
    } else if (currentStep === 'summary') {
      setCurrentStep('drinking');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const canProceed = () => {
    if (currentStep === 'themes') return selectedThemes.length > 0;
    return true;
  };

  const themeEmojis: Record<Theme, string> = {
    'history': '🏛️',
    'contemporary': '📱',
    'general-trivia': '🎯',
    'mix': '🎲',
  };

  const difficultyColors: Record<Difficulty, string> = {
    'easy': 'bg-green-100 border-green-400 text-green-700',
    'medium': 'bg-yellow-100 border-yellow-400 text-yellow-700',
    'hard': 'bg-orange-100 border-orange-400 text-orange-700',
    'very-hard': 'bg-red-100 border-red-400 text-red-700',
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index <= stepIndex
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < stepIndex ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Thema's</span>
            <span>Niveau</span>
            <span>Regels</span>
            <span>Overzicht</span>
          </div>
        </div>

        {/* Price badge */}
        <div className="text-center mb-6">
          <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold">
            Totaal: &euro;7,99
          </span>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {currentStep === 'themes' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Kies je thema's</h2>
              <p className="text-gray-600 mb-6">Selecteer een of meerdere thema's voor je pubquiz</p>
              <div className="grid grid-cols-2 gap-4">
                {(Object.entries(themeLabels) as [Theme, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => toggleTheme(key)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedThemes.includes(key)
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-3xl block mb-2">{themeEmojis[key]}</span>
                    <span className="font-semibold text-gray-800">{label}</span>
                    {selectedThemes.includes(key) && (
                      <span className="block text-primary-600 text-sm mt-1">Geselecteerd ✓</span>
                    )}
                  </button>
                ))}
              </div>
              {selectedThemes.length === 0 && (
                <p className="text-orange-600 text-sm mt-4">Selecteer minimaal één thema</p>
              )}
            </>
          )}

          {currentStep === 'difficulty' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Kies de moeilijkheidsgraad</h2>
              <p className="text-gray-600 mb-6">Hoe uitdagend moet je quiz worden?</p>
              <div className="space-y-3">
                {(Object.entries(difficultyLabels) as [Difficulty, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDifficulty(key)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                      selectedDifficulty === key
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyColors[key]}`}>
                        {label}
                      </span>
                    </div>
                    {selectedDifficulty === key && (
                      <span className="text-primary-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {currentStep === 'drinking' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Drankregels (optioneel)</h2>
              <p className="text-gray-600 mb-6">Maak je quiz extra gezellig met speelse drankregels!</p>
              <div className="space-y-3">
                {(Object.entries(drinkingRuleLabels) as [DrinkingRule, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDrinkingRule(key)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                      selectedDrinkingRule === key
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {key === 'drink-on-wrong' && '🍺'}
                        {key === 'give-drink' && '🍻'}
                        {key === 'none' && '☕'}
                      </span>
                      <span className="font-medium text-gray-800">{label}</span>
                    </div>
                    {selectedDrinkingRule === key && (
                      <span className="text-primary-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {currentStep === 'summary' && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Je quiz samenvatting</h2>
              <p className="text-gray-600 mb-6">Controleer je keuzes voordat je afrekent</p>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-700 mb-2">Thema's</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedThemes.map(theme => (
                      <span key={theme} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                        {themeEmojis[theme]} {themeLabels[theme]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-700 mb-2">Moeilijkheidsgraad</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyColors[selectedDifficulty]}`}>
                    {difficultyLabels[selectedDifficulty]}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-700 mb-2">Drankregels</h3>
                  <span className="text-gray-800">
                    {selectedDrinkingRule === 'drink-on-wrong' && '🍺 '}
                    {selectedDrinkingRule === 'give-drink' && '🍻 '}
                    {selectedDrinkingRule === 'none' && '☕ '}
                    {drinkingRuleLabels[selectedDrinkingRule]}
                  </span>
                </div>

                <div className="bg-primary-50 p-4 rounded-xl border-2 border-primary-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Totaal</span>
                    <span className="text-2xl font-bold text-primary-600">&euro;7,99</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          {stepIndex > 0 ? (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Terug
            </button>
          ) : (
            <div />
          )}

          {currentStep === 'summary' ? (
            <button
              onClick={handleCheckout}
              className="px-8 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Afrekenen &rarr;
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                canProceed()
                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Volgende &rarr;
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
