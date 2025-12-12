// src/components/home/Hero.jsx
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="text-center my-10 space-y-4">
      <h2 className="text-4xl font-extrabold text-gray-900">
        Prêt à réviser ?
      </h2>
      <p className="text-gray-600 text-lg">
        Choisis un module ci-dessous pour commencer l'entraînement.
      </p>
      
      <div className="relative max-w-md mx-auto mt-8">
        <input 
          type="text" 
          placeholder="Rechercher un sujet (ex: bail, fonds...)" 
          className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
}