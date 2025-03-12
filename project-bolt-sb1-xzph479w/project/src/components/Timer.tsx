import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

export function Timer({ timeLeft, totalTime }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / totalTime) * 100;

  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md">
      <TimerIcon className="w-6 h-6 text-blue-600" />
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="font-medium">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}