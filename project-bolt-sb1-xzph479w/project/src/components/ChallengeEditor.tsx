import React from 'react';
import { Challenge } from '../types';

interface ChallengeEditorProps {
  challenge: Challenge;
  userCode: string;
  onCodeChange: (code: string) => void;
  onSubmit: () => void;
}

export function ChallengeEditor({ challenge, userCode, onCodeChange, onSubmit }: ChallengeEditorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
        <p className="text-gray-600 mb-4">{challenge.description}</p>
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <textarea
            value={userCode}
            onChange={(e) => onCodeChange(e.target.value)}
            className="w-full h-64 font-mono text-sm p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck="false"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => onSubmit()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Solution
          </button>
          <button
            onClick={() => onCodeChange(challenge.buggyCode)}
            className="text-gray-600 hover:text-gray-800"
          >
            Reset Code
          </button>
        </div>
      </div>
    </div>
  );
}