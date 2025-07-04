import React, { useRef, useState } from 'react';
import { Copy, Download, Loader } from 'lucide-react';

interface TabLayoutProps {
  inputPlaceholder: string;
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  isProcessing: boolean;
  onAction: (simpleMode: boolean) => void;
  actionLabel: string;
  actionIcon: string;
  outputLabel: string;
  inputLabel: string;
  theme: 'dark' | 'light';
  activeTab: 'EncodeTab' | 'DecodeTab' | `Analyze` | `Steganography`;
}

export const TabLayout: React.FC<TabLayoutProps> = ({
  inputPlaceholder,
  inputText,
  setInputText,
  outputText,
  isProcessing,
  onAction,
  actionLabel,
  actionIcon,
  outputLabel,
  inputLabel,
  theme,
  activeTab
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [simpleMode, setSimpleMode] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputText(content);
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
    }
  };

  const handleDownload = () => {
    if (outputText) {
      const blob = new Blob([outputText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'zero-width-result.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-full flex gap-4">
      {/* Input Panel */}
      <div className="flex-1 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-semibold ${
            theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
          }`}>{inputLabel}</h3>
          <div className="flex space-x-2">
          {activeTab === 'EncodeTab' && (
  <button
    onClick={() => setSimpleMode(!simpleMode)}
    className={`px-2 py-1 text-xs rounded-md font-semibold transition-all duration-200 ${
      simpleMode
        ? 'bg-green-500 text-white hover:bg-green-600'
        : theme === 'dark'
          ? 'bg-white/10 text-white border border-purple-500/30 hover:bg-white/20'
          : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
    }`}
    title="Toggle encoding mode"
  >
    {simpleMode ? 'Simple Mode' : 'ZWC Mode'}
  </button>
)}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`p-1.5 rounded-lg border transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-white/10 border-purple-500/30 hover:bg-white/20 hover:shadow-lg'
                  : 'bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg'
              }`}
              title="Upload file"
            >
              {/* <Upload size={14} /> */}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={inputPlaceholder}
          className={`flex-1 p-3 border rounded-xl resize-none transition-all duration-200 text-sm min-h-[110px] ${
            theme === 'dark'
              ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-white/10'
              : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:bg-white/70'
          }`}
        />

        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {inputText.length}/10000 characters
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-24 flex flex-col items-center justify-center space-y-3">
        <button
          onClick={() => onAction(simpleMode)}
          disabled={isProcessing || !inputText.trim()}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-xs transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
        >
          {isProcessing ? (
            <Loader className="animate-spin mx-auto" size={16} />
          ) : (
            <div className="text-center">
              <div className="text-sm mb-1">{actionIcon}</div>
              <div>{actionLabel.split(' ')[1]}</div>
            </div>
          )}
        </button>

        <button
          onClick={() => { setInputText(''); }}
          className={`w-full p-1.5 rounded-lg border transition-all duration-200 text-xs ${
            theme === 'dark'
              ? 'bg-white/10 border-purple-500/30 hover:bg-white/20 hover:shadow-lg'
              : 'bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg'
          }`}
        >
          Clear
        </button>
      </div>

      {/* Output Panel */}
      <div className="flex-1 flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-semibold ${
            theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
          }`}>{outputLabel}</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              disabled={!outputText}
              className={`p-1.5 rounded-lg border disabled:opacity-50 transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-white/10 border-purple-500/30 hover:bg-white/20 hover:shadow-lg hover:shadow-blue-500/20'
                  : 'bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg'
              }`}
              title="Copy result"
            >
              <Copy size={14} />
            </button>
            <button
              onClick={handleDownload}
              disabled={!outputText}
              className={`p-1.5 rounded-lg border disabled:opacity-50 transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-white/10 border-purple-500/30 hover:bg-white/20 hover:shadow-lg hover:shadow-green-500/20'
                  : 'bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg'
              }`}
              title="Download result"
            >
              <Download size={14} />
            </button>
          </div>
        </div>

        <textarea
          value={outputText}
          readOnly
          placeholder="Results will appear here..."
          className={`min-h-[110px] flex-1 p-3 border rounded-xl resize-none transition-all duration-200 text-sm ${
            theme === 'dark'
              ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 focus:outline-none'
              : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none'
          }`}
        />

        {outputText && (
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Output: {outputText.length} characters
          </div>
        )}
      </div>
    </div>
  );
};
