import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';

const Dashboard = ({ onStart }) => {
  
  // Configuration des boutons
  const modules = [
    {
      id: 'general',
      title: 'Révision Générale',
      // Texte explicatif pour dire que ce n'est pas encore prêt
      subtitle: 'Indisponible : Questions types tirées du cours à venir prochainement.', 
      icon: '⚡', 
      color: 'gray', // On passe la couleur en gris
      badge: 'Bientôt',
      disabled: true // On ajoute une propriété pour bloquer le clic
    },
    {
      id: 'annales20242025',
      title: 'Annales 2024-2025',
      subtitle: '', // Sous-titre supprimé
      icon: '25',
      color: 'purple',
      badge: 'Nouveau'
    },
    {
      id: 'annales20232024',
      title: 'Annales 2023-2024',
      subtitle: '', // Sous-titre supprimé
      icon: '24',
      color: 'orange',
      badge: null
    },
    {
      id: 'annales20222023',
      title: 'Annales 2022-2023',
      subtitle: '', // Sous-titre supprimé
      icon: '23',
      color: 'green',
      badge: null
    },
    {
      id: 'annales20212022',
      title: 'Annales 2021-2022',
      subtitle: '', // Sous-titre supprimé
      icon: '22',
      color: 'red',
      badge: null
    }
  ];

  // Fonction pour gérer les couleurs dynamiquement (Ajout du gris)
  const getColorClasses = (color, disabled) => {
    // Si c'est désactivé, on force un style grisâtre peu importe la couleur demandée
    if (disabled) {
        return 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-75';
    }

    const colors = {
      blue:   'bg-blue-100 text-blue-600 group-hover:bg-blue-600 border-blue-200 hover:border-blue-400',
      purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 border-purple-200 hover:border-purple-400',
      orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 border-orange-200 hover:border-orange-400',
      green:  'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 border-emerald-200 hover:border-emerald-400',
      red:    'bg-rose-100 text-rose-600 group-hover:bg-rose-600 border-rose-200 hover:border-rose-400',
      gray:   'bg-gray-100 text-gray-500 border-gray-200', // Fallback si besoin
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10 flex flex-col min-h-[80vh]">
      
      {/* --- HEADER --- */}
      <div className="text-center space-y-3 mt-4">
        <h1 className="text-3xl font-bold text-gray-900">Droit Commercial</h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">
          Site pour s'entraîner pour l'exam de droit commercial sans TD (QCM à points négatifs)
        </p>
      </div>

      {/* --- GRID --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
        {modules.map((module) => (
          <div 
            key={module.id}
            className={`p-6 rounded-xl shadow-sm border transition bg-white
              ${module.disabled ? '' : 'hover:shadow-md'}`} 
          >
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition 
              ${module.disabled ? 'bg-gray-200 text-gray-400' : `${getColorClasses(module.color).split(' ').slice(0, 3).join(' ')}`}`}>
              <span className="font-bold text-xl">{module.icon}</span>
            </div>
            
            <h3 className={`text-lg font-bold mb-1 ${module.disabled ? 'text-gray-400' : 'text-gray-900'}`}>
                {module.title}
            </h3>
            
            {/* Affichage du sous-titre seulement s'il existe */}
            {module.subtitle && (
                <p className="text-gray-400 text-xs mb-3 italic">{module.subtitle}</p>
            )}
            
            {module.badge && (
              <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-4
                ${module.disabled ? 'bg-gray-200 text-gray-500' : (module.color === 'purple' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600')}`}>
                {module.badge}
              </span>
            )}

            {/* Boutons de mode */}
            {!module.disabled && (
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => onStart(module.id, false)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition border border-blue-200"
                >
                  <BookOpen className="w-4 h-4" />
                  Entraînement
                </button>
                <button
                  onClick={() => onStart(module.id, true)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 rounded-lg text-sm font-medium hover:from-orange-100 hover:to-red-100 transition border border-orange-200"
                >
                  <GraduationCap className="w-4 h-4" />
                  Mode Examen
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* --- FOOTER --- */}
      <div className="text-center py-6 border-t border-gray-100 mt-auto">
        <p className="text-gray-400 text-xs">
          Réalisé par <span className="font-semibold text-indigo-400">pierrepierremaker</span>
        </p>
      </div>

    </div>
  );
};

export default Dashboard;