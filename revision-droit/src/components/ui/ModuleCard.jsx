// src/components/ui/ModuleCard.jsx
export default function ModuleCard({ titre, description, Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 group">
      <div className="mb-4 bg-gray-50 w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-indigo-50 transition-colors">
        {/* On rend l'icône dynamiquement */}
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{titre}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}