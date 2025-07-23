'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = '',
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopied) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      // 2秒后重置状态
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (_error) {}
  };

  return (
    <Button
      className={`h-8 w-8 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${className}`}
      onClick={handleCopy}
      size="icon"
      title={isCopied ? 'Copied' : 'Copy'}
      variant="ghost"
    >
      {isCopied ? (
        <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
};
