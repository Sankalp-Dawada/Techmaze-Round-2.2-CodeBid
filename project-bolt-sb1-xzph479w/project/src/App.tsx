import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { ProgressBar } from './components/ProgressBar';
import { ChallengeEditor } from './components/ChallengeEditor';
import { LanguageSelector } from './components/LanguageSelector';
import { challenges } from './data/challenges';
import { ChallengeState, Language } from './types';
import { Trophy, AlertCircle } from 'lucide-react';

const TOTAL_TIME = 30 * 60; // 30 minutes
const LANGUAGES: Language[] = ['Java', 'C++', 'C', 'Python'];

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Java');
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeStates, setChallengeStates] = useState<ChallengeState[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Reset challenges when language changes
  useEffect(() => {
    const languageChallenges = challenges[selectedLanguage];
    setChallengeStates(
      languageChallenges.map(challenge => ({
        completed: false,
        userCode: challenge.buggyCode
      }))
    );
    setCurrentChallengeIndex(0);
    setGameStarted(false);
    setGameOver(false);
    setTimeLeft(TOTAL_TIME);
  }, [selectedLanguage]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, gameStarted]);

  const handleCodeChange = (code: string) => {
    setChallengeStates(states => 
      states.map((state, i) => 
        i === currentChallengeIndex ? { ...state, userCode: code } : state
      )
    );
  };

  const handleSubmit = () => {
    if (!gameStarted) {
      setGameStarted(true);
      return;
    }

    const currentChallenge = challenges[selectedLanguage][currentChallengeIndex];
    const userCode = challengeStates[currentChallengeIndex].userCode;
    
    if (userCode.replace(/\s/g, '') === currentChallenge.correctCode.replace(/\s/g, '')) {
      setChallengeStates(states =>
        states.map((state, i) =>
          i === currentChallengeIndex ? { ...state, completed: true } : state
        )
      );

      if (currentChallengeIndex < challenges[selectedLanguage].length - 1) {
        setCurrentChallengeIndex(i => i + 1);
      } else {
        setGameOver(true);
      }
    }
  };

  const completedChallenges = challengeStates.filter(state => state.completed).length;
  const currentChallenge = challenges[selectedLanguage][currentChallengeIndex];
  const totalChallenges = challenges[selectedLanguage].length;

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Debug Challenge</h1>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            languages={LANGUAGES}
          />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">How to Play</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Select your preferred programming language</li>
              <li>Fix the bugs in the provided code snippets</li>
              <li>Complete as many challenges as you can within 30 minutes</li>
              <li>Submit your solution to check if it's correct</li>
            </ul>
            <button
              onClick={handleSubmit}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors w-full"
            >
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Game Over!</h1>
            <p className="text-xl mb-6">
              You completed {completedChallenges} out of {totalChallenges} challenges
              {timeLeft === 0 ? " (Time's up!)" : ""}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedLanguage(selectedLanguage);  // This will trigger the reset effect
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <Timer timeLeft={timeLeft} totalTime={TOTAL_TIME} />
          <ProgressBar completed={completedChallenges} total={totalChallenges} />
        </div>
        
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          languages={LANGUAGES}
        />
        
        <ChallengeEditor
          challenge={currentChallenge}
          userCode={challengeStates[currentChallengeIndex].userCode}
          onCodeChange={handleCodeChange}
          onSubmit={handleSubmit}
        />

        {currentChallenge.hint && (
          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Hint</h4>
              <p className="text-blue-800">{currentChallenge.hint}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;