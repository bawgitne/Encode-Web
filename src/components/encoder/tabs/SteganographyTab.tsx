
import React, { useCallback } from 'react';
import { TabLayout } from '../TabLayout';
import { hideInNormalText } from '../../../utils/zeroWidthUtils';

interface SteganographyTabProps {
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  setOutputText: (text: string) => void;
  isProcessing: boolean;
  onProcess: () => Promise<void>;
  theme: 'dark' | 'light';
}

export const SteganographyTab: React.FC<SteganographyTabProps> = ({
  inputText,
  setInputText,
  outputText,
  setOutputText,
  isProcessing,
  onProcess,
  theme
}) => {
  const handleHide = useCallback(async () => {
    if (!inputText.trim()) return;
    
    await onProcess();
    const hidden = hideInNormalText(inputText);
    setOutputText(hidden);
  }, [inputText, onProcess, setOutputText]);

  return (
    <TabLayout
      inputPlaceholder="Enter your secret message to hide in normal text... 👁️"
      inputText={inputText}
      setInputText={setInputText}
      outputText={outputText}
      isProcessing={isProcessing}
      onAction={handleHide}
      actionLabel="👁️ Hide in Text"
      actionIcon="👁️"
      outputLabel="Normal Text with Hidden Message"
      inputLabel="Secret Message | đang sai fix đ nổi, đại đại đi"
      theme={theme}
      activeTab= 'Steganography'      
    />
  );
};
