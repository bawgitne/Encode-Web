
import React, { useCallback } from 'react';
import { TabLayout } from '../TabLayout';
import { analyzeZeroWidth } from '../../../utils/zeroWidthUtils';

interface AnalyzeTabProps {
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  setOutputText: (text: string) => void;
  isProcessing: boolean;
  onProcess: () => Promise<void>;
  theme: 'dark' | 'light';
}

export const AnalyzeTab: React.FC<AnalyzeTabProps> = ({
  inputText,
  setInputText,
  outputText,
  setOutputText,
  isProcessing,
  onProcess,
  theme
}) => {
  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim()) return;
    
    await onProcess();
    const analysis = analyzeZeroWidth(inputText);
    setOutputText(analysis);
  }, [inputText, onProcess, setOutputText]);

  return (
    <TabLayout
      inputPlaceholder="Paste any text to analyze for hidden zero-width characters... 🔍"
      inputText={inputText}
      setInputText={setInputText}
      outputText={outputText}
      isProcessing={isProcessing}
      onAction={handleAnalyze}
      actionLabel="🔍 Analyze Text"
      actionIcon="🔍"
      outputLabel="Analysis Results"
      inputLabel="Text to Analyze"
      theme={theme}
      activeTab= 'Analyze'
    />
  );
};
