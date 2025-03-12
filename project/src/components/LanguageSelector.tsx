import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  languages: Language[];
}

export function LanguageSelector({ selectedLanguage, onLanguageChange, languages }: LanguageSelectorProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Programming Language
      </label>
      <div className="grid grid-cols-4 gap-2">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => onLanguageChange(language)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedLanguage === language
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}