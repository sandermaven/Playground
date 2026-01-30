import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { themeLabels } from '../types';

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Stel je eigen
            <span className="block text-accent-400">Pubquiz samen</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
            In 3 simpele stappen naar een unieke quiz voor jouw feestje, borrel of gezellige avond.
          </p>
          <Link
            to="/configurator"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Start je Quiz
          </Link>
          <p className="mt-4 text-primary-200 text-sm">Slechts &euro;7,99 per quiz</p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Hoe werkt het?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            In slechts 3 stappen heb je een gepersonaliseerde pubquiz in je inbox.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center p-6 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-colors">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Kies thema & niveau</h3>
              <p className="text-gray-600">
                Selecteer je favoriete onderwerpen en bepaal hoe moeilijk de vragen moeten zijn.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-6 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-colors">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reken af (&euro;7,99)</h3>
              <p className="text-gray-600">
                Veilig en snel betalen. Geen account nodig, alleen je e-mailadres.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-6 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-colors">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ontvang direct je quiz</h3>
              <p className="text-gray-600">
                Je krijgt een e-mail met een link naar je persoonlijke quiz-presentatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Kies uit verschillende thema's
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Combineer thema's voor een unieke quiz-ervaring
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(themeLabels) as [string, string][]).map(([key, label]) => (
              <div
                key={key}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center border-2 border-transparent hover:border-primary-300"
              >
                <div className="text-4xl mb-3">
                  {key === 'history' && '🏛️'}
                  {key === 'contemporary' && '📱'}
                  {key === 'general-trivia' && '🎯'}
                  {key === 'mix' && '🎲'}
                </div>
                <h3 className="font-semibold text-gray-800">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Waarom De Tipsy Thinker?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 text-xl">✓</span>
                  <div>
                    <strong className="text-gray-800">Direct klaar voor gebruik</strong>
                    <p className="text-gray-600">Geen gedoe met zelf vragen verzinnen</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 text-xl">✓</span>
                  <div>
                    <strong className="text-gray-800">Persoonlijk samengesteld</strong>
                    <p className="text-gray-600">Kies precies de thema's en moeilijkheid die jij wilt</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 text-xl">✓</span>
                  <div>
                    <strong className="text-gray-800">Speelse drankregels</strong>
                    <p className="text-gray-600">Maak het extra gezellig met optionele drankregels</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 text-xl">✓</span>
                  <div>
                    <strong className="text-gray-800">Makkelijk te presenteren</strong>
                    <p className="text-gray-600">Overzichtelijke slides die je direct kunt laten zien</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-2xl">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary-600 mb-2">&euro;7,99</p>
                  <p className="text-gray-600 mb-4">per pubquiz</p>
                  <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                    <li>• 10 unieke vragen</li>
                    <li>• Kant-en-klare presentatie</li>
                    <li>• Direct in je inbox</li>
                    <li>• Onbeperkt te gebruiken</li>
                  </ul>
                  <Link
                    to="/configurator"
                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Bestel nu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Klaar voor een onvergetelijke quiz-avond?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Binnen 5 minuten heb je jouw persoonlijke pubquiz in je inbox!
          </p>
          <Link
            to="/configurator"
            className="inline-block bg-white text-primary-600 hover:bg-primary-50 text-lg font-bold px-10 py-4 rounded-full shadow-lg transition-colors"
          >
            Stel je quiz samen
          </Link>
        </div>
      </section>
    </Layout>
  );
}
