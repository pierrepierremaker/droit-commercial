# 📚 Application de Révision - Droit Commercial

Application web interactive pour réviser les concepts fondamentaux du droit commercial à travers des quiz et des annales d'examens.

## ✨ Fonctionnalités

- **Quiz interactifs** : Testez vos connaissances sur les thématiques clés du droit commercial
- **Annales d'examens** : Accédez aux questions des années précédentes (2021-2025)
- **Modules thématiques** :
  - Actes de commerce
  - Fonds de commerce
  - Baux commerciaux
- **Interface moderne** : Design responsive et intuitif avec Tailwind CSS
- **Suivi des performances** : Analytics intégrés pour suivre votre progression

## 🚀 Technologies utilisées

- **React 19** - Framework JavaScript
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS v4** - Framework CSS utility-first
- **Lucide React** - Bibliothèque d'icônes
- **Vercel Analytics** - Suivi des performances

## 📦 Installation

```bash
# Cloner le repository
git clone [url-du-repo]
cd revision-droit

# Installer les dépendances
npm install
```

## 🛠️ Développement

```bash
# Lancer le serveur de développement
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

## 🏗️ Build

```bash
# Créer une version de production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 🧹 Linting

```bash
# Vérifier le code avec ESLint
npm run lint
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── home/           # Composants de la page d'accueil
│   │   ├── Dashboard.jsx
│   │   └── Hero.jsx
│   ├── layout/         # Composants de mise en page
│   │   └── Navbar.jsx
│   ├── quiz/           # Composants du quiz
│   │   ├── QuestionCard.jsx
│   │   └── QuizManager.jsx
│   └── ui/             # Composants UI réutilisables
│       └── ModuleCard.jsx
├── data/               # Données des questions et modules
│   ├── annales20212022.js
│   ├── annales20222023.js
│   ├── annales20232024.js
│   ├── annales20242025.js
│   ├── modules.js
│   └── questions.js
├── App.jsx             # Composant principal
└── main.jsx            # Point d'entrée
```

## 🎯 Utilisation

1. **Page d'accueil** : Sélectionnez un module thématique ou une année d'annales
2. **Quiz** : Répondez aux questions en sélectionnant la réponse correcte
3. **Résultats** : Consultez votre score et les corrections détaillées
4. **Navigation** : Retournez à l'accueil pour choisir un nouveau quiz

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📝 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé avec ❤️ pour faciliter l'apprentissage du droit commercial.
