import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { ProgressBar } from './components/ProgressBar';
import { ChallengeEditor } from './components/ChallengeEditor';
import { challenges } from './data/challenges'; // Import the challenges array
import { ChallengeState } from './types';
import { Trophy, AlertCircle } from 'lucide-react';

const TOTAL_TIME = 30 * 60; // 30 minutes in seconds

// Define your start and end dates here (example)
const GAME_START_DATE = new Date('2025-03-14T12:54:00'); // Game start date and time
const GAME_END_DATE = new Date('2025-03-26T12:55:00'); // Game end date and time

function App() {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeStates, setChallengeStates] = useState<ChallengeState[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [gameAvailable, setGameAvailable] = useState<boolean>(false);
  const [timeUntilGameStarts, setTimeUntilGameStarts] = useState<string>("");

  // Check if the game is available based on the start and end dates
  useEffect(() => {
    const currentDate = new Date();
    if (currentDate >= GAME_START_DATE && currentDate <= GAME_END_DATE) {
      setGameAvailable(true);
    } else {
      setGameAvailable(false);
    }
  }, []);

  // Update remaining time until game starts
  useEffect(() => {
    if (!gameAvailable) {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const timeDiff = GAME_START_DATE.getTime() - currentDate.getTime();
        
        if (timeDiff <= 0) {
          setTimeUntilGameStarts("Game has started");
          clearInterval(interval);  // Clear the interval if the game has started
        } else {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          setTimeUntilGameStarts(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameAvailable]);

  // Initialize challenge states when the app starts
  useEffect(() => {
    setChallengeStates(
      challenges.map((challenge) => ({
        completed: false,
        userCode: challenge.buggyCode,
      }))
    );
    setCurrentChallengeIndex(0);
    setGameStarted(false);
    setGameOver(false);
    setTimeLeft(TOTAL_TIME);
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 || completedChallenges === challenges.length) {
      setGameOver(true);
      setCompletionTime(TOTAL_TIME - timeLeft);
    }
  }, [timeLeft, gameOver, gameStarted]);

  // Handle code changes
  const handleCodeChange = (code: string) => {
    setChallengeStates((states) =>
      states.map((state, i) =>
        i === currentChallengeIndex ? { ...state, userCode: code } : state
      )
    );
  };

  // Handle submit
  const handleSubmit = () => {
    if (!gameStarted) {
      setGameStarted(true);
      return;
    }

    const currentChallenge = challenges[currentChallengeIndex];
    const userCode = challengeStates[currentChallengeIndex].userCode;

    // Compare code
    if (userCode.replace(/\s/g, '') === currentChallenge.correctCode.replace(/\s/g, '')) {
      setChallengeStates((states) =>
        states.map((state, i) =>
          i === currentChallengeIndex ? { ...state, completed: true } : state
        )
      );
    } else {
      alert("Wrong answer! Try again.");
    }
  };

  // Handle next challenge
  const handleNext = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    }
  };

  // Handle previous challenge
  const handlePrev = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(currentChallengeIndex - 1);
    }
  };

  // Handle exit
  const handleExit = () => {
    setGameOver(true);
    setCompletionTime(TOTAL_TIME - timeLeft);
  };

  // Get the number of completed challenges
  const completedChallenges = challengeStates.filter((state) => state.completed).length;

  // Current challenge data
  const currentChallenge = challenges[currentChallengeIndex];

  // Format time for display: minutes, seconds, milliseconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Game Over screen
  if (gameOver) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Game Over!</h1>
            <p className="text-xl mb-4">Team: {teamName}</p>
            <p className="text-xl mb-6">
              You completed {completedChallenges} out of {challenges.length} challenges
            </p>
            {completionTime !== null && (
              <p className="text-xl mb-6">Completion Time: {formatTime(completionTime)}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Game Not Available screen
  if (!gameAvailable) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Game Unavailable</h1>
            <p className="text-xl mb-4">
              The game is not available at this time. Please check back between the game start and end times.
            </p>
            <p className="text-xl mb-4">
              The game starts at: {GAME_START_DATE.toLocaleString()} <br />
              The game ends at: {GAME_END_DATE.toLocaleString()}
            </p>
            <p className="text-xl mt-6">Time remaining until the game starts: {timeUntilGameStarts}</p>
          </div>
        </div>
      </div>
    );
  }

  // Before the game starts
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-center mb-8">TechTetris</h1>
          <h1 className="text-2xl text-center mb-8">Round 2-2</h1>
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

  // During the game
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <Timer timeLeft={timeLeft} totalTime={TOTAL_TIME} />
          <ProgressBar completed={completedChallenges} total={challenges.length} />
        </div>

        {challengeStates[currentChallengeIndex].completed ? (
          <p className="text-green-600 font-bold text-xl text-center">Completed ✅</p>
        ) : (
          <ChallengeEditor
            challenge={currentChallenge}
            userCode={challengeStates[currentChallengeIndex].userCode}
            onCodeChange={handleCodeChange}
            onSubmit={handleSubmit}
          />
        )}

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
