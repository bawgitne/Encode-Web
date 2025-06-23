
import React from 'react';

interface FooterProps {
  theme: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className="w-full">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>Encoding Efficiency:</span> 98.5%
          </div>
          <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Processing Time:</span> 0.12s
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>

  Made with ❤️ by{" "}
  <span className="font-bold text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 transition-all duration-300">
    Anban
  </span>{" "}
  and his slaves:{" "}

  <span className="font-bold text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-400 hover:to-yellow-300 transition-all duration-300">
    Claude
  </span>,{" "}

  <span className="font-bold text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-gray-400 transition-all duration-300">
    Gpt
  </span>,{" "}

  <span className="font-bold text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-400 hover:to-pink-500 transition-all duration-300">
    Lovable
  </span>



          </div>
          <div className="flex space-x-3">
            <a href="https://github.com/bawgitne" className={`transition-all duration-200 px-2 py-1 rounded ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/20'
                : 'text-gray-500 hover:text-purple-600 hover:shadow-lg hover:shadow-purple-500/20'
            }`}>
              GitHub
            </a>
            <a href="https://www.facebook.com/bang19cm/" className={`transition-all duration-200 px-2 py-1 rounded ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20'
                : 'text-gray-500 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/20'
            }`}>
              Facebook
            </a>
            <a href="nhapcaigiday?" className={`transition-all duration-200 px-2 py-1 rounded ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/20'
                : 'text-gray-500 hover:text-green-600 hover:shadow-lg hover:shadow-green-500/20'
            }`}>
              Onlyfan
            </a>
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            v1.0.0
          </div>
        </div>
      </div>
    </footer>
  );
};
