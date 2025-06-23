
import React, { useCallback } from 'react';
import { TabLayout } from '../TabLayout';
import { decodeZeroWidth } from '../../../utils/zeroWidthUtils';

interface DecodeTabProps {
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  setOutputText: (text: string) => void;
  isProcessing: boolean;
  onProcess: () => Promise<void>;
    theme: 'dark' | 'light';
}

export const DecodeTab: React.FC<DecodeTabProps> = ({
  inputText,
  setInputText,
  outputText,
  setOutputText,
  isProcessing,
  onProcess,
  theme
}) => {
  const handleDecode = useCallback(async () => {
    if (!inputText.trim()) return;
    
    await onProcess();
    try {
      const decoded = decodeZeroWidth(inputText);
      setOutputText(decoded || 'No hidden message found');
    } catch (error) {
      setOutputText('❌ Decoding failed. Please check if the text contains valid zero-width characters.');
    }
  }, [inputText, onProcess, setOutputText]);

  return (
    <TabLayout
      inputPlaceholder="Paste text with hidden zero-width characters... 🔍"
      inputText={inputText}
      setInputText={setInputText}
      outputText={outputText}
      isProcessing={isProcessing}
      onAction={handleDecode}
      actionLabel="🔓 Decode Message"
      actionIcon="🔓"
      outputLabel="Decoded Message"
      inputLabel="Text with Hidden Characters"
      theme={theme}
      activeTab= 'DecodeTab'      
    />
  );
};
