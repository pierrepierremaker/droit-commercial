# 📚 Application de Révision - Droit Commercial

Application web interactive pour réviser les concepts fondamentaux du droit commercial à travers des quiz et des annales d'examens.

## ✨ Fonctionnalités

- **Deux modes d'apprentissage** :
  - 🎯 **Mode Entraînement** : Réponses instantanées avec explications détaillées
  - 📝 **Mode Examen** : Conditions réelles d'examen avec timer de 60 minutes et barème officiel
- **Quiz interactifs** : Testez vos connaissances sur les thématiques clés du droit commercial
- **Annales d'examens** : Accédez aux questions des années précédentes (2021-2025)
- **Modules thématiques** :
  - Actes de commerce
  - Fonds de commerce
  - Baux commerciaux
- **Interface moderne** : Design responsive et intuitif avec Tailwind CSS
- **Suivi des performances** : Analytics intégrés pour suivre votre progression

### 📝 Mode Examen

Le mode examen simule les conditions réelles de l'épreuve :

- ⏱️ **Timer de 60 minutes** : Chronomètre dégressif avec alerte à 5 minutes
- 📊 **Barème officiel** :
  - ✅ Bonne réponse : **+1 point**
  - ❌ Mauvaise réponse : **-1 point**
  - ⏭️ Pas de réponse : **0 point** (évite les pénalités si vous ne savez pas)
- 🔄 **Navigation libre** : Possibilité de revenir sur les questions précédentes
- 📈 **Résultats détaillés** : Analyse complète avec corrections et explications

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

### Mode Entraînement
1. **Page d'accueil** : Sélectionnez un module thématique ou une année d'annales
2. **Cliquez sur "Entraînement"** : Accédez au mode quiz classique
3. **Répondez aux questions** : Obtenez des corrections instantanées avec explications
4. **Consultez votre score** : Visualisez vos résultats à la fin

### Mode Examen
1. **Page d'accueil** : Choisissez votre sujet d'examen
2. **Cliquez sur "Mode Examen"** : Lancez la simulation d'examen
3. **Gérez votre temps** : Vous disposez de 60 minutes
4. **Stratégie de réponse** :
   - Répondez si vous êtes sûr(e) : **+1 ou -1 point**
   - Passez la question si vous hésitez : **0 point** (évite les malus)
5. **Naviguez librement** : Vous pouvez revenir sur les questions
6. **Terminez l'examen** : Consultez vos résultats détaillés avec toutes les corrections

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## 📝 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé avec ❤️ pour faciliter l'apprentissage du droit commercial.
