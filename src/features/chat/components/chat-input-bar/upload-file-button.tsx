import { Button } from '@/components/ui/button';
import { ChatStatus } from 'ai';
import { PaperclipIcon } from 'lucide-react';
import React, { memo, useRef } from 'react';

export interface UploadFileButtonProps {
  onAddFiles: (files: File[]) => void;
  status: ChatStatus;
}

const UploadFileButtonPure: React.FC<UploadFileButtonProps> = ({ onAddFiles, status }) => {
  const isSending = status === 'streaming' || status === 'submitted';
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        className="hidden pointer-events-none"
        ref={fileInputRef}
        multiple
        onChange={(event) => {
          const files = Array.from(event.target.files || []);

          onAddFiles(files);
        }}
        tabIndex={-1}
      />
      <Button
        onClick={(event) => {
          event.preventDefault();
          fileInputRef.current?.click();
        }}
        variant="ghost"
        size="icon"
        className="w-6 h-6"
        disabled={isSending}
      >
        <PaperclipIcon />
      </Button>
    </>
  );
};

export const UploadFileButton = memo(UploadFileButtonPure);
