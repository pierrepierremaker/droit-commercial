import React from 'react';

const Dashboard = ({ onStart }) => {
  
  // Configuration de tes boutons (C'est ici que tu ajoutes des années !)
  const modules = [
    {
      id: 'general',
      title: 'Révision Générale',
      subtitle: 'Mode infini aléatoire',
      icon: '⚡', // Tu peux remettre les SVG si tu préfères, j'ai mis des emojis pour simplifier la lecture du code
      color: 'blue',
      badge: null
    },
    {
      id: 'annales20242025',
      title: 'Annales 2024-2025',
      subtitle: 'Dernier partiel officiel',
      icon: '25',
      color: 'purple',
      badge: 'Nouveau'
    },
    {
      id: 'annales20232024',
      title: 'Annales 2023-2024',
      subtitle: 'Sujet année précédente',
      icon: '24',
      color: 'orange',
      badge: null
    },
    {
      id: 'annales20222023',
      title: 'Annales 2022-2023',
      subtitle: 'Entraînement classique',
      icon: '23',
      color: 'green',
      badge: null
    },
    {
      id: 'annales20212022',
      title: 'Annales 2021-2022',
      subtitle: 'Pour les experts',
      icon: '22',
      color: 'red',
      badge: null
    }
  ];

  // Fonction pour gérer les couleurs dynamiquement
  const getColorClasses = (color) => {
    const colors = {
      blue:   'bg-blue-100 text-blue-600 group-hover:bg-blue-600 border-blue-200 hover:border-blue-400',
      purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 border-purple-200 hover:border-purple-400',
      orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 border-orange-200 hover:border-orange-400',
      green:  'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 border-emerald-200 hover:border-emerald-400',
      red:    'bg-rose-100 text-rose-600 group-hover:bg-rose-600 border-rose-200 hover:border-rose-400',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Banque de QCM Droit</h1>
        <p className="text-gray-500">4 ans d'annales pour t'entraîner</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div 
            key={module.id}
            onClick={() => onStart(module.id)}
            className={`bg-white p-6 rounded-xl shadow-sm border transition group cursor-pointer hover:shadow-md ${getColorClasses(module.color).split(' ').slice(-1)}`} // Hack pour la bordure au hover
          >
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition group-hover:text-white ${getColorClasses(module.color).split(' ').slice(0, 3).join(' ')}`}>
              <span className="font-bold text-xl">{module.icon}</span>
            </div>
            
            <h3 className="text-lg font-bold mb-1">{module.title}</h3>
            <p className="text-gray-500 text-xs mb-3">{module.subtitle}</p>
            
            {module.badge && (
              <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${module.color === 'purple' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                {module.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;