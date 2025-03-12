import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const progress = (completed / total) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <span className="font-medium">Progress</span>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{completed}/{total} Completed</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}