import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/home/Dashboard';
import QuizManager from './components/quiz/QuizManager';
import ExamMode from './components/quiz/ExamMode';
// 1. On importe les analytics
import { Analytics } from "@vercel/analytics/react"

function App() {
  // view: 'home' | 'quiz' | 'exam'
  const [view, setView] = useState('home');
  // quizId: 'general' | 'annales2023' | null
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [isExamMode, setIsExamMode] = useState(false);

  const startQuiz = (quizId, examMode = false) => {
    setCurrentQuizId(quizId);
    setIsExamMode(examMode);
    setView(examMode ? 'exam' : 'quiz');
  };

  const backToHome = () => {
    setView('home');
    setCurrentQuizId(null);
    setIsExamMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {view === 'home' ? (
          <Dashboard onStart={startQuiz} />
        ) : view === 'exam' ? (
          <ExamMode 
            quizId={currentQuizId}
            onExit={backToHome}
          />
        ) : (
          <QuizManager 
            quizId={currentQuizId} 
            onExit={backToHome}
          />
        )}
      </main>

      {/* 2. On place le composant ici, il ne sera pas visible mais il comptera les visites */}
      <Analytics />
    </div>
  );
}

export default App;