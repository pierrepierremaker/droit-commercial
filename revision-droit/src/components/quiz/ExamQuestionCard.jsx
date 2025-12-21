import { useState, useEffect } from 'react';
import { SkipForward } from 'lucide-react';

const ExamQuestionCard = ({ data, onAnswer, currentAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [skipped, setSkipped] = useState(false);

  // Restaurer la réponse précédente si on revient en arrière
  useEffect(() => {
    if (currentAnswer) {
      setSelectedOption(currentAnswer.answeredIndex);
      setSkipped(currentAnswer.skipped || false);
    } else {
      setSelectedOption(null);
      setSkipped(false);
    }
  }, [currentAnswer]);

  const handleOptionClick = (index) => {
    // Empêcher de répondre plusieurs fois
    if (selectedOption !== null || skipped) return;
    
    setSelectedOption(index);
    setSkipped(false);
    onAnswer(index, false);
  };

  const handleSkip = () => {
    // Empêcher de passer plusieurs fois
    if (selectedOption !== null || skipped) return;
    
    setSelectedOption(null);
    setSkipped(true);
    onAnswer(null, true);
  };

  const getButtonColor = (index) => {
    if (skipped) {
      return "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
    }

    if (selectedOption === index) {
      return "bg-blue-100 border-blue-500 text-blue-800 font-medium ring-2 ring-blue-200";
    }

    return "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50";
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
              disabled={skipped}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getButtonColor(index)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{index + 1}</span>
                  <span>{option}</span>
                </div>
                {selectedOption === index && !skipped && (
                  <span className="text-blue-600 font-bold">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Bouton Ne pas répondre */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <button
            onClick={handleSkip}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
              skipped 
                ? 'bg-yellow-50 border-yellow-400 text-yellow-800 font-medium' 
                : 'bg-gray-50 border-gray-300 text-gray-600 hover:border-yellow-400 hover:bg-yellow-50'
            }`}
          >
            <SkipForward className="w-5 h-5" />
            <span className="font-medium">
              {skipped ? '✓ Question passée (0 point)' : 'Ne pas répondre (0 point)'}
            </span>
          </button>
          
          {skipped && (
            <p className="text-xs text-gray-500 text-center mt-2 italic">
              Vous pourrez revenir à cette question plus tard
            </p>
          )}
        </div>

        {/* Info barème */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 font-medium mb-1">📊 Barème de l'examen :</p>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">+1</span>
              <span>Bonne réponse</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold">-1</span>
              <span>Mauvaise réponse</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-bold">0</span>
              <span>Pas de réponse</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionCard;
