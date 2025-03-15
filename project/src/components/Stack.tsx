import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StackProps {
  completed: number;
  total: number;
}

export function Stack({ completed, total }: StackProps) {
  const blocks = Array.from({ length: total }, (_, index) => index < completed);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-72">
      <div className="flex justify-between mb-10">
        <span className="text-xl font-semibold">Stack Progress</span>
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <span className="text-xl">{completed}/{total} Completed</span>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-2">
        {blocks.map((isCompleted, index) => (
          <div
            key={index}
            className={`h-8 rounded-md transition-all duration-500 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
