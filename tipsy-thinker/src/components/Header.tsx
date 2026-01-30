import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="text-2xl font-bold text-primary-600 tracking-tight">
            De Tipsy Thinker
          </span>
          <span className="text-sm text-gray-500">By Hugo & Jacob</span>
        </Link>
        <nav>
          <Link
            to="/configurator"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Start je Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}
