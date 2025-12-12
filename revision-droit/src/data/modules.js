// src/data/modules.js
import { BookOpen, Scale, FileText } from 'lucide-react';

export const modulesData = [
  { 
    id: 1,
    titre: "Actes de commerce", 
    description: "Définition et régime juridique des actes de commerce.", 
    icon: Scale, // On passe la référence du composant, pas le JSX direct
    color: "text-blue-500" 
  },
  { 
    id: 2,
    titre: "Fonds de commerce", 
    description: "Éléments constitutifs, vente et nantissement.", 
    icon: BookOpen, 
    color: "text-purple-500" 
  },
  { 
    id: 3,
    titre: "Baux commerciaux", 
    description: "Statut des baux, renouvellement et loyers.", 
    icon: FileText, 
    color: "text-green-500" 
  },
];