// src/components/quiz/QuestionCard.jsx
import { useState } from 'react';

const QuestionCard = ({ data, onAnswer, onNext, isLast }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
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
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getButtonColor(index, option)}`}
            >
              {option}
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
            >
              {isLast ? "Voir mon résultat" : "Question Suivante →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;