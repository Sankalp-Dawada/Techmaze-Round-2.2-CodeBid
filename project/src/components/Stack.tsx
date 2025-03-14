import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StackProps {
  completed: number;
  total: number;
}

export function Stack({ completed, total }: StackProps) {
  const blocks = Array.from({ length: total }, (_, index) => index < completed);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <span className="font-medium">Stack Progress</span>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>{completed}/{total} Completed</span>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-1">
        {blocks.map((isCompleted, index) => (
          <div
            key={index}
            className={`h-6 rounded-md transition-all duration-500 ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
}