
import React from 'react';
import { Settings, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  language: string;
  setLanguage: (language: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme, language, setLanguage }) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  return (
    <header className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${
            theme === 'dark' 
              ? 'from-purple-400 to-blue-400' 
              : 'from-purple-600 to-blue-600'
          } bg-clip-text text-transparent drop-shadow-lg`}>
            Chuanghiracaiten
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-white/10 border-purple-500/30 text-white focus:ring-purple-500 hover:bg-white/20'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500 hover:bg-gray-50'
            }`}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className={theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-white/10 border-purple-500/30 hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/20'
                : 'bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className={`p-2 rounded-lg border transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-white/10 border-purple-500/30 hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/20'
              : 'bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg'
          }`}>
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
