export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">De Tipsy Thinker</p>
        <p className="text-primary-200 text-sm mb-4">By Hugo & Jacob</p>
        <p className="text-primary-300 text-xs">
          De leukste pubquizzen voor jouw feestje, borrel of gewoon een gezellige avond.
        </p>
        <p className="text-primary-400 text-xs mt-4">
          &copy; {new Date().getFullYear()} De Tipsy Thinker. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}
