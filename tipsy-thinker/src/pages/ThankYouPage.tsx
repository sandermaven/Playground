import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getQuiz } from '../data/questions';
import type { Quiz } from '../types';

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (quizId) {
      const foundQuiz = getQuiz(quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
      }
    }
  }, [quizId]);

  const quizUrl = quizId ? `${window.location.origin}/quiz/${quizId}` : '';

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {/* Success animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Bedankt voor je bestelling!
          </h1>
          <p className="text-gray-600 text-lg">
            Je pubquiz is klaar en wacht op je.
          </p>
        </div>

        {/* Email info */}
        <div className="bg-primary-50 rounded-2xl p-6 mb-8">
          <div className="text-4xl mb-4">📧</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Check je inbox
          </h2>
          <p className="text-gray-600">
            Je ontvangt binnen enkele minuten een e-mail met de link naar je quiz.
            Controleer ook je spam-folder!
          </p>
        </div>

        {/* Direct link */}
        {quizId && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">
              Of ga direct naar je quiz:
            </h3>
            <Link
              to={`/quiz/${quizId}`}
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Open mijn Quiz 🎉
            </Link>

            <div className="mt-4 text-sm text-gray-500">
              <p>Bewaar deze link om later terug te keren:</p>
              <code className="block bg-gray-100 p-2 rounded mt-2 text-xs break-all">
                {quizUrl}
              </code>
            </div>
          </div>
        )}

        {/* Quiz info */}
        {quiz && (
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-8">
            <h4 className="font-semibold text-gray-700 mb-2">Je quiz bevat:</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• {quiz.questions.length} vragen</li>
              <li>• Niveau: {quiz.config.difficulty}</li>
              <li>• Klaar om te presenteren</li>
            </ul>
          </div>
        )}

        {/* Another quiz CTA */}
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Nog een quiz nodig?
          </h3>
          <p className="text-gray-600 mb-4">
            Maak er meteen nog een met andere thema's!
          </p>
          <Link
            to="/configurator"
            className="inline-block border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Nieuwe quiz maken
          </Link>
        </div>
      </div>
    </Layout>
  );
}
