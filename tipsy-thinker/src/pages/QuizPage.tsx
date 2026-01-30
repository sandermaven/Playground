import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuiz } from '../data/questions';
import type { Quiz } from '../types';
import { themeLabels, difficultyLabels } from '../types';

type SlideType = 'intro' | 'question' | 'answer' | 'end';

interface SlideState {
  type: SlideType;
  questionIndex: number;
}

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [slide, setSlide] = useState<SlideState>({ type: 'intro', questionIndex: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (quizId) {
      const foundQuiz = getQuiz(quizId);
      if (foundQuiz) {
        setQuiz(foundQuiz);
      }
    }
  }, [quizId]);

  const totalSlides = quiz ? quiz.questions.length * 2 + 2 : 0; // intro + (question + answer) * n + end
  const currentSlideNumber = slide.type === 'intro'
    ? 1
    : slide.type === 'end'
      ? totalSlides
      : slide.type === 'question'
        ? slide.questionIndex * 2 + 2
        : slide.questionIndex * 2 + 3;

  const goNext = useCallback(() => {
    if (!quiz) return;

    if (slide.type === 'intro') {
      setSlide({ type: 'question', questionIndex: 0 });
    } else if (slide.type === 'question') {
      setSlide({ ...slide, type: 'answer' });
    } else if (slide.type === 'answer') {
      if (slide.questionIndex < quiz.questions.length - 1) {
        setSlide({ type: 'question', questionIndex: slide.questionIndex + 1 });
      } else {
        setSlide({ type: 'end', questionIndex: slide.questionIndex });
      }
    }
  }, [quiz, slide]);

  const goPrev = useCallback(() => {
    if (!quiz) return;

    if (slide.type === 'end') {
      setSlide({ type: 'answer', questionIndex: quiz.questions.length - 1 });
    } else if (slide.type === 'answer') {
      setSlide({ ...slide, type: 'question' });
    } else if (slide.type === 'question') {
      if (slide.questionIndex > 0) {
        setSlide({ type: 'answer', questionIndex: slide.questionIndex - 1 });
      } else {
        setSlide({ type: 'intro', questionIndex: 0 });
      }
    }
  }, [quiz, slide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">Quiz niet gevonden</h1>
          <p className="text-primary-200 mb-6">Deze quiz bestaat niet of is verlopen.</p>
          <Link
            to="/"
            className="inline-block bg-primary-600 hover:bg-primary-500 px-6 py-3 rounded-lg transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[slide.questionIndex];

  const themeEmojis: Record<string, string> = {
    'history': '🏛️',
    'contemporary': '📱',
    'general-trivia': '🎯',
    'mix': '🎲',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 flex flex-col">
      {/* Controls bar */}
      <div className="bg-black/20 backdrop-blur-sm px-4 py-2 flex items-center justify-between text-white/80 text-sm">
        <div>
          <span className="font-semibold">De Tipsy Thinker</span>
          <span className="mx-2">•</span>
          <span>Slide {currentSlideNumber} / {totalSlides}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs">
            ← → om te navigeren • F voor fullscreen
          </span>
          <button
            onClick={toggleFullscreen}
            className="hover:text-white transition-colors"
            title="Fullscreen (F)"
          >
            {isFullscreen ? '⬜' : '⛶'}
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl">
          {/* Intro slide */}
          {slide.type === 'intro' && (
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                🍻 De Tipsy Thinker
              </h1>
              <p className="text-2xl text-primary-200 mb-8">Pubquiz</p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-2 gap-6 text-left mb-6">
                  <div>
                    <span className="text-primary-300 text-sm">Thema's</span>
                    <p className="text-white">
                      {quiz.config.themes.map(t => `${themeEmojis[t]} ${themeLabels[t]}`).join(', ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-primary-300 text-sm">Niveau</span>
                    <p className="text-white">{difficultyLabels[quiz.config.difficulty]}</p>
                  </div>
                  <div>
                    <span className="text-primary-300 text-sm">Aantal vragen</span>
                    <p className="text-white">{quiz.questions.length}</p>
                  </div>
                  <div>
                    <span className="text-primary-300 text-sm">Drankregels</span>
                    <p className="text-white">
                      {quiz.config.drinkingRule === 'drink-on-wrong' && '🍺 Bij fout: slok nemen'}
                      {quiz.config.drinkingRule === 'give-drink' && '🍻 Bij goed: slok uitdelen'}
                      {quiz.config.drinkingRule === 'none' && '☕ Geen'}
                    </p>
                  </div>
                </div>

                <p className="text-primary-200 text-lg">
                  Druk op <kbd className="bg-white/20 px-2 py-1 rounded">→</kbd> of <kbd className="bg-white/20 px-2 py-1 rounded">spatie</kbd> om te beginnen
                </p>
              </div>
            </div>
          )}

          {/* Question slide */}
          {slide.type === 'question' && currentQuestion && (
            <div className="text-center text-white">
              <div className="mb-8">
                <span className="bg-accent-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                  Vraag {slide.questionIndex + 1} van {quiz.questions.length}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12">
                <p className="text-3xl md:text-5xl font-medium leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>

              {currentQuestion.drinkingHint && quiz.config.drinkingRule !== 'none' && (
                <p className="mt-6 text-xl text-accent-400">
                  {currentQuestion.drinkingHint}
                </p>
              )}
            </div>
          )}

          {/* Answer slide */}
          {slide.type === 'answer' && currentQuestion && (
            <div className="text-center text-white">
              <div className="mb-8">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                  Antwoord vraag {slide.questionIndex + 1}
                </span>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 max-w-3xl mx-auto">
                <p className="text-xl text-primary-200">
                  {currentQuestion.question}
                </p>
              </div>

              <div className="bg-green-500/20 border-2 border-green-400 rounded-3xl p-12">
                <p className="text-4xl md:text-6xl font-bold text-green-300">
                  {currentQuestion.answer}
                </p>
              </div>

              {quiz.config.drinkingRule !== 'none' && (
                <p className="mt-6 text-xl text-accent-400">
                  {quiz.config.drinkingRule === 'drink-on-wrong' && '🍺 Fout? Neem een slok!'}
                  {quiz.config.drinkingRule === 'give-drink' && '🍻 Goed? Deel een slok uit!'}
                </p>
              )}
            </div>
          )}

          {/* End slide */}
          {slide.type === 'end' && (
            <div className="text-center text-white">
              <div className="text-8xl mb-6">🎉</div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                Einde Quiz!
              </h1>
              <p className="text-2xl text-primary-200 mb-8">
                Bedankt voor het spelen van De Tipsy Thinker
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto">
                <p className="text-lg text-primary-200 mb-4">
                  Tel de scores en bepaal de winnaar!
                </p>
                <p className="text-primary-300">
                  Nog een quiz nodig? Bezoek{' '}
                  <Link to="/" className="text-accent-400 hover:underline">
                    detipsythinker.nl
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="px-4 py-4 flex justify-between">
        <button
          onClick={goPrev}
          disabled={slide.type === 'intro'}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            slide.type === 'intro'
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          ← Vorige
        </button>

        <button
          onClick={goNext}
          disabled={slide.type === 'end'}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            slide.type === 'end'
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : 'bg-accent-500 text-white hover:bg-accent-600'
          }`}
        >
          Volgende →
        </button>
      </div>
    </div>
  );
}
