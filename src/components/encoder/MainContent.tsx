
import React, { useState, useCallback } from 'react';
import { EncodeTab } from './tabs/EncodeTab';
import { DecodeTab } from './tabs/DecodeTab';
import { AnalyzeTab } from './tabs/AnalyzeTab';
import { SteganographyTab } from './tabs/SteganographyTab';

interface MainContentProps {
  activeTab: 'encode' | 'decode' | 'analyze' | 'steganography';
  setActiveTab: (tab: 'encode' | 'decode' | 'analyze' | 'steganography') => void;
  theme: 'dark' | 'light';
}

export const MainContent: React.FC<MainContentProps> = ({ activeTab, setActiveTab, theme }) => {



  const tabs = [
    { id: 'encode', label: '🔒 Encode', color: 'from-blue-500 to-blue-700', glowColor: 'shadow-blue-500/50' },
    { id: 'decode', label: '🔓 Decode', color: 'from-purple-500 to-purple-700', glowColor: 'shadow-purple-500/50' },
    { id: 'analyze', label: '🔍 Analyze', color: 'from-yellow-500 to-yellow-700', glowColor: 'shadow-yellow-500/50' },
    { id: 'steganography', label: '👁️ Steganography', color: 'from-cyan-500 to-cyan-700', glowColor: 'shadow-cyan-500/50' },
  ] as const;

const renderTabContent = () => {
  switch (activeTab) {
    case 'encode':
      // Truyền ít props hơn, để EncodeTab tự quản lý state của nó
      return <EncodeTab theme={theme} />;
    case 'decode':
      return <DecodeTab theme={theme} />;
    case 'analyze':
      return <AnalyzeTab theme={theme} />;
    case 'steganography':
      return <SteganographyTab theme={theme} />;
    default:
      return null;
  }
};

  const getActiveTabGlow = () => {
    switch (activeTab) {
      case 'encode': return 'shadow-blue-500/30';
      case 'decode': return 'shadow-purple-500/30';
      case 'analyze': return 'shadow-yellow-500/30';
      case 'steganography': return 'shadow-cyan-500/30';
      default: return 'shadow-purple-500/30';
    }
  };

  return (
    <div className={`h-full w-full backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-500 ease-out animate-fade-in ${
      theme === 'dark'
        ? 'bg-white/5 border-white/10'
        : 'bg-white/70 border-white/30'
    } ${getActiveTabGlow()}`}>
      {/* Integrated Tab Navigation */}
      <div className="w-full p-4 pb-0">
        <div className={`w-full flex border rounded-2xl p-2 shadow-lg ${
          theme === 'dark'
            ? 'backdrop-blur-lg bg-white/5 border-white/10'
            : 'backdrop-blur-lg bg-white/50 border-white/20'
        }`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 relative px-4 py-2 text-xs font-medium transition-all duration-300
                rounded-xl group overflow-hidden
                ${activeTab === tab.id 
                  ? `${theme === 'dark' ? 'text-white' : 'text-white'} bg-gradient-to-r ${tab.color} shadow-lg ${tab.glowColor} transform scale-105 z-10` 
                  : `${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-white/20'} hover:shadow-md hover:scale-102`
                }
              `}
            >
              <span className="relative z-10">{tab.label}</span>
              
              {activeTab === tab.id && (
                <div className={`
                  absolute bottom-0 left-0 right-0 h-1 
                  bg-gradient-to-r ${tab.color} 
                  animate-pulse
                `} />
              )}
              
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-20 
                bg-gradient-to-r ${tab.color} 
                transition-opacity duration-300
              `} />
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 p-4">
        {renderTabContent()}
      </div>
    </div>
  );
};
