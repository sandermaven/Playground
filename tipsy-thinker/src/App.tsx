import { HashRouter, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import ConfiguratorPage from './pages/ConfiguratorPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <QuizProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/configurator" element={<ConfiguratorPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/bedankt" element={<ThankYouPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
        </Routes>
      </HashRouter>
    </QuizProvider>
  );
}

export default App;
