import type { ChatStatus } from 'ai';
import { PaperclipIcon } from 'lucide-react';
import type React from 'react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

export interface UploadFileButtonProps {
  onAddFiles: (files: File[]) => void;
  status: ChatStatus;
}

export const UploadFileButton: React.FC<UploadFileButtonProps> = ({
  onAddFiles,
  status,
}) => {
  const isSending = status === 'streaming' || status === 'submitted';
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        className="pointer-events-none hidden"
        multiple
        onChange={(event) => {
          const files = Array.from(event.target.files || []);

          onAddFiles(files);
        }}
        ref={fileInputRef}
        tabIndex={-1}
        type="file"
      />
      <Button
        className="h-6 w-6"
        disabled={isSending}
        onClick={(event) => {
          event.preventDefault();
          fileInputRef.current?.click();
        }}
        size="icon"
        variant="ghost"
      >
        <PaperclipIcon />
      </Button>
    </>
  );
};
