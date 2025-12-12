// src/components/layout/Navbar.jsx
import { Scale } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2 text-indigo-700">
          <Scale className="w-6 h-6" /> Révision Droit
        </h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium">
          Connexion
        </button>
      </div>
    </nav>
  );
}