import { Scale } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Changement du titre ici */}
        <h1 className="text-xl font-bold flex items-center gap-2 text-indigo-700">
          <Scale className="w-6 h-6" /> Droit Commercial
        </h1>
        {/* Le bouton Connexion a été supprimé ici */}
      </div>
    </nav>
  );
}