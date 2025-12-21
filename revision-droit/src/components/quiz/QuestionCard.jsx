// src/components/quiz/QuestionCard.jsx
import { useState, useEffect } from 'react';

const QuestionCard = ({ data, onAnswer, onNext, isLast }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Support de la touche Entrée pour passer à la question suivante
  useEffect(() => {
    if (!hasAnswered) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasAnswered, onNext]);

  const handleOptionClick = (index) => {
    if (hasAnswered) return;

    setSelectedOption(index);
    setHasAnswered(true);
    
    const isCorrect = index === data.correctAnswer;
    onAnswer(isCorrect);
  };

  const getButtonColor = (index, optionText) => {
    if (!hasAnswered) return "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50";

    // Si c'est la BONNE réponse
    if (index === data.correctAnswer) {
      return "bg-green-100 border-green-500 text-green-800 font-medium";
    }

    // Si c'est la MAUVAISE réponse sélectionnée par l'utilisateur
    if (index === selectedOption && index !== data.correctAnswer) {
      return "bg-red-100 border-red-500 text-red-800";
    }

    // Les autres options
    return "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100" data-question-card>
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
          {data.question}
        </h3>

        <div className="space-y-3">
          {data.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={hasAnswered}
              data-option-button
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getButtonColor(index, option)}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {!hasAnswered && <span className="text-xs text-gray-400 font-mono">{index + 1}</span>}
              </div>
            </button>
          ))}
        </div>

        {/* FEEDBACK & EXPLICATION */}
        {hasAnswered && (
          <div className="mt-8 animate-fade-in">
            <div className={`p-4 rounded-lg mb-4 ${selectedOption === data.correctAnswer ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
              <div className="font-bold mb-1">
                {selectedOption === data.correctAnswer ? '✅ Bonne réponse !' : '❌ Aïe, raté.'}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {data.explanation}
              </p>
            </div>

            <button
              onClick={onNext}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2"
              autoFocus
            >
              {isLast ? "Voir mon résultat" : "Question Suivante →"}
              <span className="text-xs opacity-75">(Entrée)</span>
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              💡 Utilisez les touches {data.options.length === 2 ? '1-2' : `1-${data.options.length}`} pour répondre rapidement
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;