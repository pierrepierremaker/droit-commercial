import { useState, useEffect, useCallback } from 'react';
import ExamQuestionCard from './ExamQuestionCard';
import { Clock, AlertCircle } from 'lucide-react';

// Import des questions
import { questionsData } from '../../data/questions'; 
import { annales20242025 } from '../../data/annales20242025';
import { annales20232024 } from '../../data/annales20232024';
import { annales20222023 } from '../../data/annales20222023';
import { annales20212022 } from '../../data/annales20212022';

const ExamMode = ({ quizId, onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { questionIndex, answeredIndex, skipped }
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes en secondes
  const [isFinished, setIsFinished] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Charger les questions selon le quizId
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setTimeLeft(60 * 60);
    setIsFinished(false);
    setShowWarning(false);

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
        setQuestions(questionsData);
        break;
    }
  }, [quizId]);

  // Timer
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        // Afficher l'alerte à 5 minutes
        if (prev === 5 * 60) {
          setShowWarning(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, questions.length]);

  const handleAnswer = useCallback((answeredIndex, skipped = false) => {
    const newAnswer = {
      questionIndex: currentIndex,
      answeredIndex: skipped ? null : answeredIndex,
      skipped,
      correctAnswer: questions[currentIndex].correctAnswer
    };

    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionIndex === currentIndex);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });

    // Passer automatiquement à la question suivante
    setTimeout(() => handleNext(), 300);
  }, [currentIndex, questions, handleNext]);

  // Raccourcis clavier
  useEffect(() => {
    if (isFinished) return;

    const handleKeyPress = (e) => {
      const currentAnswer = answers.find(a => a.questionIndex === currentIndex);
      // Ne pas permettre de répondre si déjà répondu (évite les double réponses)
      if (currentAnswer) return;

      // Touches 1-2 (ou plus selon les options) pour sélectionner une réponse
      if (['1', '2', '3', '4'].includes(e.key)) {
        const index = parseInt(e.key) - 1;
        if (index < questions[currentIndex]?.options.length) {
          handleAnswer(index, false);
        }
      }
      // Touche S ou 0 pour passer la question
      if (e.key.toLowerCase() === 's' || e.key === '0') {
        handleAnswer(null, true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFinished, currentIndex, questions, answers, handleAnswer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach(answer => {
      if (answer.skipped) {
        // Ne rien faire, +0
      } else if (answer.answeredIndex === answer.correctAnswer) {
        score += 1; // Bonne réponse
      } else {
        score -= 1; // Mauvaise réponse
      }
    });
    return score;
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionIndex === currentIndex);
  };

  if (isFinished) {
    const finalScore = calculateScore();
    const maxPossible = questions.length;
    // Calcul de la note sur 20 : score va de -max à +max
    // Si score = max -> 20/20, si score = 0 -> 0/20, si score = -max -> 0/20
    const noteSur20 = Math.max(0, Math.round((finalScore / maxPossible) * 20 * 100) / 100);
    const percentage = Math.max(0, Math.round((finalScore / maxPossible) * 100));
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto animate-fade-in mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">📝 Résultat de l'examen</h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className={`text-6xl font-black mb-2 ${noteSur20 >= 10 ? 'text-green-600' : 'text-red-500'}`}>
              {noteSur20.toFixed(2)}<span className="text-3xl">/20</span>
            </div>
            <p className="text-gray-600 font-medium">Note finale</p>
            <p className="text-sm text-gray-500 mt-2">
              Score brut : {finalScore > 0 ? '+' : ''}{finalScore} points (sur {maxPossible}) • {percentage}%
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-lg text-gray-800">Détails :</h3>
          
          {answers.map((answer, idx) => {
            const question = questions[answer.questionIndex];
            const isCorrect = answer.answeredIndex === answer.correctAnswer;
            const isSkipped = answer.skipped;
            
            return (
              <div key={idx} className={`p-4 rounded-lg border-2 ${
                isSkipped ? 'bg-gray-50 border-gray-200' : 
                isCorrect ? 'bg-green-50 border-green-200' : 
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-gray-800 flex-1">
                    Q{answer.questionIndex + 1}. {question.question}
                  </div>
                  <div className={`font-bold ml-4 ${
                    isSkipped ? 'text-gray-500' : 
                    isCorrect ? 'text-green-600' : 
                    'text-red-600'
                  }`}>
                    {isSkipped ? '0' : isCorrect ? '+1' : '-1'}
                  </div>
                </div>
                
                {!isSkipped && (
                  <div className="text-sm space-y-1 mt-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Votre réponse :</span> {question.options[answer.answeredIndex]}
                    </p>
                    {!isCorrect && (
                      <p className="text-green-700">
                        <span className="font-medium">Bonne réponse :</span> {question.options[answer.correctAnswer]}
                      </p>
                    )}
                    <p className="text-gray-500 italic mt-2">{question.explanation}</p>
                  </div>
                )}
                
                {isSkipped && (
                  <p className="text-sm text-gray-500 italic">Question non répondue</p>
                )}
              </div>
            );
          })}
        </div>

        <button 
          onClick={onExit} 
          className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Retour au menu
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-center p-10 text-gray-500">Chargement...</div>;
  }

  const currentAnswer = getCurrentAnswer();
  const timeWarning = timeLeft <= 5 * 60;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header avec timer et navigation */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${timeWarning ? 'text-red-500' : 'text-blue-600'}`} />
            <span className={`text-2xl font-mono font-bold ${timeWarning ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button 
            onClick={onExit} 
            className="hover:text-red-500 transition px-3 py-1 bg-white border border-gray-200 rounded text-sm font-medium"
          >
            Quitter
          </button>
        </div>

        {showWarning && timeWarning && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-2 text-sm text-red-700">
            <AlertCircle className="w-4 h-4" />
            <span>⚠️ Moins de 5 minutes restantes !</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
          <span>Question {currentIndex + 1} / {questions.length}</span>
          <span className="text-xs">
            Répondues : {answers.filter(a => !a.skipped).length} | 
            Passées : {answers.filter(a => a.skipped).length}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <ExamQuestionCard 
        key={currentIndex}
        data={questions[currentIndex]}
        onAnswer={handleAnswer}
        currentAnswer={currentAnswer}
      />

      {/* Info raccourcis */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700 text-center">
          💡 <span className="font-medium">Raccourcis clavier :</span> <kbd className="px-2 py-1 bg-white border rounded text-xs">1</kbd> ou <kbd className="px-2 py-1 bg-white border rounded text-xs">2</kbd> pour répondre • <kbd className="px-2 py-1 bg-white border rounded text-xs">S</kbd> pour passer
        </p>
      </div>
    </div>
  );
};

export default ExamMode;
