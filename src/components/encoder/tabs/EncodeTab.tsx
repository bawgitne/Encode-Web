
import React, { useCallback } from 'react';
import { TabLayout } from '../TabLayout';
import { encodeZeroWidth } from '../../../utils/zeroWidthUtils';

interface EncodeTabProps {
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  setOutputText: (text: string) => void;
  isProcessing: boolean;
  onProcess: () => Promise<void>;
  theme: 'dark' | 'light';
}
const encodeUsingSpaceOnly = (text: string): string => {
  const binary = text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
  return binary.replace(/0/g, ' ').replace(/1/g, '\u200D') + '\u200B';
};

export const EncodeTab: React.FC<EncodeTabProps> = ({
  inputText,
  setInputText,
  outputText,
  setOutputText,
  isProcessing,
  onProcess,
  theme
}) => {
  const handleEncode = (simpleMode: boolean) => {
    const result = encodeZeroWidth(inputText,simpleMode)
    setOutputText(result);
  };
  

  return (
    <TabLayout
      inputPlaceholder="Enter your secret message here... 🤫"
      inputText={inputText}
      setInputText={setInputText}
      outputText={outputText}
      isProcessing={isProcessing}
      onAction={(simpleMode) => handleEncode(simpleMode)}

      actionLabel="🔒 Encode Message"
      actionIcon="🔒"
      outputLabel="Encoded Text (invisible characters)"
      inputLabel="Plain Text Message"
      theme={theme}
      activeTab= 'EncodeTab'     
    />
  );
};
