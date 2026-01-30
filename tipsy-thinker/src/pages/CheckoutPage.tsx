import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useQuiz } from '../context/QuizContext';
import { generateQuiz, saveQuiz } from '../data/questions';
import { themeLabels, difficultyLabels, drinkingRuleLabels } from '../types';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { config, setEmail, setQuizId } = useQuiz();
  const [email, setEmailInput] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Vul een geldig e-mailadres in');
      return;
    }

    if (email !== emailConfirm) {
      setError('De e-mailadressen komen niet overeen');
      return;
    }

    if (config.themes.length === 0) {
      setError('Je hebt geen thema\'s geselecteerd. Ga terug naar de configurator.');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate the quiz
    const quiz = generateQuiz(config);
    saveQuiz(quiz);

    // Save order details
    setEmail(email);
    setQuizId(quiz.id);

    // Navigate to thank you page
    navigate(`/bedankt?quizId=${quiz.id}`);
  };

  const themeEmojis: Record<string, string> = {
    'history': '🏛️',
    'contemporary': '📱',
    'general-trivia': '🎯',
    'mix': '🎲',
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Afrekenen</h1>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Order summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Je bestelling</h2>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Thema's:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {config.themes.map(theme => (
                      <span key={theme} className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded text-xs">
                        {themeEmojis[theme]} {themeLabels[theme]}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500">Niveau:</span>
                  <span className="ml-2 text-gray-800">{difficultyLabels[config.difficulty]}</span>
                </div>

                <div>
                  <span className="text-gray-500">Drankregels:</span>
                  <span className="ml-2 text-gray-800">{drinkingRuleLabels[config.drinkingRule]}</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Totaal</span>
                <span className="text-2xl font-bold text-primary-600">&euro;7,99</span>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Je ontvangt je quiz direct na betaling per e-mail
              </p>
            </div>
          </div>

          {/* Payment form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Jouw gegevens</h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="jouw@email.nl"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Hier ontvang je de link naar je quiz
                    </p>
                  </div>

                  <div>
                    <label htmlFor="emailConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                      Bevestig e-mailadres *
                    </label>
                    <input
                      type="email"
                      id="emailConfirm"
                      value={emailConfirm}
                      onChange={(e) => setEmailConfirm(e.target.value)}
                      placeholder="jouw@email.nl"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                </div>

                <hr className="my-6" />

                <h3 className="text-lg font-semibold text-gray-800 mb-4">Betaalmethode</h3>

                {/* Mock payment methods */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-4 border-2 border-primary-500 bg-primary-50 rounded-lg cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="text-primary-600" />
                    <span className="font-medium">iDEAL</span>
                    <span className="ml-auto text-2xl">🏦</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300">
                    <input type="radio" name="payment" className="text-primary-600" />
                    <span className="font-medium">Creditcard</span>
                    <span className="ml-auto text-2xl">💳</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300">
                    <input type="radio" name="payment" className="text-primary-600" />
                    <span className="font-medium">PayPal</span>
                    <span className="ml-auto text-2xl">🅿️</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Betaling verwerken...
                    </span>
                  ) : (
                    `Betaal €7,99`
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Veilig betalen via onze beveiligde betaalomgeving
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
