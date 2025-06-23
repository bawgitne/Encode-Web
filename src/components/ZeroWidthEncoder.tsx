
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './encoder/Header';
import { MainContent } from './encoder/MainContent';
import { Footer } from './encoder/Footer';

export const ZeroWidthEncoder = () => {
  const [activeTab, setActiveTab] = useState<'encode' | 'decode' | 'analyze' | 'steganography'>('encode');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('en');

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900'
    }`}>
      {/* Header - Fixed to top */}
      <div className="w-full py-4 px-6">
        <Header 
          theme={theme} 
          setTheme={setTheme} 
          language={language} 
          setLanguage={setLanguage} 
        />
      </div>
      
      {/* Main Content - Single floating window with tabs inside */}
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-1/5 min-w-[800px] h-2/5">
          <MainContent 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            theme={theme}
          />
        </div>
      </div>
      
      {/* Footer - Fixed to bottom */}
      <div className="w-full py-4 px-6">
        <Footer theme={theme} />
      </div>
    </div>
  );
};
