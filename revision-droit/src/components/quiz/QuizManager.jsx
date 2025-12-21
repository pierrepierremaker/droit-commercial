import { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';

// ==========================================
// 1. IMPORT DE TOUTES LES ANNALES
// ==========================================
import { questionsData } from '../../data/questions'; 
import { annales20242025 } from '../../data/annales20242025';
import { annales20232024 } from '../../data/annales20232024';
import { annales20222023 } from '../../data/annales20222023'; // Nouveau
import { annales20212022 } from '../../data/annales20212022'; // Nouveau

const QuizManager = ({ quizId, onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // ==========================================
  // 2. ROUTAGE DES FICHIERS
  // ==========================================
  useEffect(() => {
    // Reset complet
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);

    // Choix du fichier
    switch (quizId) {
      case 'annales20242025':
        setQuestions(annales20242025);
        break;
      case 'annales20232024':
        setQuestions(annales20232024);
        break;
      case 'annales20222023':
        setQuestions(annales20222023);
        break;
      case 'annales20212022':
        setQuestions(annales20212022);
        break;
      default:
        // Par défaut : Entraînement général
        setQuestions(questionsData);
        break;
    }
  }, [quizId]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Raccourcis clavier
  useEffect(() => {
    if (isFinished) return;

    const handleKeyPress = (e) => {
      // Touches 1-4 pour sélectionner une réponse
      if (['1', '2', '3', '4'].includes(e.key)) {
        const questionCard = document.querySelector('[data-question-card]');
        if (questionCard) {
          const index = parseInt(e.key) - 1;
          const buttons = questionCard.querySelectorAll('[data-option-button]');
          if (buttons[index]) {
            buttons[index].click();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFinished, currentIndex]);

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = percentage >= 50 ? "🎉 C'est validé !" : "⚠️ À revoir";
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-lg mx-auto animate-fade-in mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Résultat</h2>
        <div className={`text-6xl font-black mb-2 ${percentage >= 50 ? 'text-green-600' : 'text-red-500'}`}>
          {score} <span className="text-2xl text-gray-400 font-normal">/ {questions.length}</span>
        </div>
        <p className="text-gray-500 mb-6 font-medium">Note : {percentage}% - {message}</p>
        <button onClick={onExit} className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
          Retour au menu
        </button>
      </div>
    );
  }

  if (questions.length === 0) return <div className="text-center p-10 text-gray-500">Chargement...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-500">
        <span>Question {currentIndex + 1}/{questions.length}</span>
        <button onClick={onExit} className="hover:text-red-500 transition px-3 py-1 bg-white border border-gray-200 rounded">Quitter</button>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
      </div>

      <QuestionCard 
        key={currentIndex} 
        data={questions[currentIndex]} 
        onAnswer={handleAnswer}
        onNext={handleNext}
        isLast={currentIndex === questions.length - 1}
      />
    </div>
  );
};

export default QuizManager;