import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { ProgressBar } from './components/ProgressBar';
import { ChallengeEditor } from './components/ChallengeEditor';
import { challenges } from './data/challenges';
import { ChallengeState } from './types';
import { Trophy, AlertCircle } from 'lucide-react';

const TOTAL_TIME = 20 * 15; // 30 minutes

function App() {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeStates, setChallengeStates] = useState<ChallengeState[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  useEffect(() => {
    setChallengeStates(
      challenges.map(challenge => ({
        completed: false,
        userCode: challenge.buggyCode
      }))
    );
    setCurrentChallengeIndex(0);
    setGameStarted(false);
    setGameOver(false);
    setTimeLeft(TOTAL_TIME);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 || completedChallenges === totalChallenges) {
      setGameOver(true);
      setCompletionTime(TOTAL_TIME - timeLeft);
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

    const currentChallenge = challenges[currentChallengeIndex];
    const userCode = challengeStates[currentChallengeIndex].userCode;
    
    if (userCode.replace(/\s/g, '') === currentChallenge.correctCode.replace(/\s/g, '')) {
      setChallengeStates(states =>
        states.map((state, i) =>
          i === currentChallengeIndex ? { ...state, completed: true } : state
        )
      );
    }
  };

  const handleNext = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(currentChallengeIndex - 1);
    }
  };

  const handleExit = () => {
    setGameOver(true);
    setCompletionTime(TOTAL_TIME - timeLeft);
  };

  const completedChallenges = challengeStates.filter(state => state.completed).length;
  const currentChallenge = challenges[currentChallengeIndex];
  const totalChallenges = challenges.length;

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Game Over!</h1>
            <p className="text-xl mb-4">Team: {teamName}</p>
            <p className="text-xl mb-6">
              You completed {completedChallenges} out of {totalChallenges} challenges
            </p>
            {completionTime !== null && (
              <p className="text-xl mb-6">Completion Time: {Math.floor(completionTime / 60)}m {completionTime % 60}s</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Debug Challenge</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">How to Play</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Fix the bugs in the provided code snippets</li>
              <li>Complete as many challenges as you can within 30 minutes</li>
              <li>Submit your solution to check if it's correct</li>
            </ul>
            <input 
              type="text" 
              placeholder="Enter Team Name" 
              value={teamName} 
              onChange={(e) => setTeamName(e.target.value)} 
              className="mt-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              disabled={!teamName.trim()}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Challenge
            </button>
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
        
        <ChallengeEditor
          challenge={currentChallenge}
          userCode={challengeStates[currentChallengeIndex].userCode}
          onCodeChange={handleCodeChange}
          onSubmit={handleSubmit}
        />

        <div className="flex justify-between mt-4">
          <button onClick={handlePrev} disabled={currentChallengeIndex === 0} className="bg-gray-500 text-white px-4 py-2 rounded-md disabled:opacity-50">Previous</button>
          <button onClick={handleExit} className="bg-red-600 text-white px-4 py-2 rounded-md">Exit</button>
          <button onClick={handleNext} disabled={currentChallengeIndex === challenges.length - 1} className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;