import React from 'react';
import { Button } from "@/components/ui/button";
import LoadingIndicator from './loading-indicator';

interface SubmitButtonProps {
  isVisible: boolean;
  isLoading: boolean;
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isVisible,
  isLoading,
  disabled
}) => {
  if (!isVisible && !isLoading) return null;

  const buttonClass = `absolute right-5 bottom-5 ${
    disabled ? 'bg-gray-500' : 'bg-white hover:bg-gray-100'
  } text-black rounded-full w-8 h-8 p-0 flex items-center justify-center`;

  if (isLoading) {
    return (
      <div className="absolute right-5 bottom-5 bg-gray-500 text-black rounded-full w-8 h-8 p-0 flex items-center justify-center">
        <LoadingIndicator size="sm" color="white" />
      </div>
    );
  }

  return (
    <Button
      type="submit"
      disabled={disabled}
      className={buttonClass}
    >
      {disabled ? (
        <LoadingIndicator size="sm" color="black" />
      ) : (
        <span className="text-lg">→</span>
      )}
    </Button>
  );
};

export default SubmitButton;