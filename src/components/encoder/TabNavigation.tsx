
import React from 'react';

interface TabNavigationProps {
  activeTab: 'encode' | 'decode' | 'analyze' | 'steganography';
  setActiveTab: (tab: 'encode' | 'decode' | 'analyze' | 'steganography') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'encode', label: '🔒 Encode', shortcut: 'Ctrl+1', color: 'from-blue-500 to-blue-700', glowColor: 'shadow-blue-500/50' },
    { id: 'decode', label: '🔓 Decode', shortcut: 'Ctrl+2', color: 'from-purple-500 to-purple-700', glowColor: 'shadow-purple-500/50' },
    { id: 'analyze', label: '🔍 Analyze', shortcut: 'Ctrl+3', color: 'from-yellow-500 to-yellow-700', glowColor: 'shadow-yellow-500/50' },
    { id: 'steganography', label: '👁️ Steganography', shortcut: 'Ctrl+4', color: 'from-cyan-500 to-cyan-700', glowColor: 'shadow-cyan-500/50' },
  ] as const;

  return (
    <div className="w-full flex justify-center mb-4">
      <div className="w-full max-w-6xl flex backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-2 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 relative px-6 py-3 text-sm font-medium transition-all duration-300
              rounded-xl group overflow-hidden
              ${activeTab === tab.id 
                ? `text-white bg-gradient-to-r ${tab.color} shadow-lg ${tab.glowColor} transform scale-105 z-10` 
                : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-md hover:scale-102'
              }
            `}
            title={tab.shortcut}
          >
            <span className="relative z-10">{tab.label}</span>
            
            {/* Animated underline for active tab */}
            {activeTab === tab.id && (
              <div className={`
                absolute bottom-0 left-0 right-0 h-1 
                bg-gradient-to-r ${tab.color} 
                animate-pulse
              `} />
            )}
            
            {/* Hover glow effect */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-20 
              bg-gradient-to-r ${tab.color} 
              transition-opacity duration-300
            `} />
          </button>
        ))}
      </div>
    </div>
  );
};
