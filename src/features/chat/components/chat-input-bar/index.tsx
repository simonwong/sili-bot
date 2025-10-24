'use client';

import { useQueryClient } from '@tanstack/react-query';
import type { ChatStatus, FileUIPart, TextUIPart } from 'ai';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ChatSendButton } from './chat-send-button';
import { GenImageButton } from './gen-image-button';
import { PreviewAttachment } from './preview-attachment';
import { UploadFileButton } from './upload-file-button';

export interface ChatInputBarProps {
  sendMessage: (data: {
    textParts?: TextUIPart[];
    fileParts?: FileUIPart[];
  }) => Promise<void>;
  stop: () => Promise<void>;
  status: ChatStatus;
  chatId: string;
}

const useTextArea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [adjustHeight]);

  const resetHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '24px';
    }
  }, []);

  const onInput = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(event.target.value);
      adjustHeight();
    },
    [adjustHeight]
  );

  return {
    textareaRef,
    onInput,
    input,
    resetTextarea: () => {
      setInput('');
      resetHeight();
    },
  };
};

const useFileParts = () => {
  const [fileParts, setFileParts] = useState<FileUIPart[]>([]);

  const addFiles = useCallback(async (files: File[]) => {
    const newFileParts: FileUIPart[] = [];

    for (const file of files) {
      newFileParts.push({
        type: 'file',
        mediaType: file.type,
        filename: file.name,
        url: `data:${file.type};base64,${btoa(
          new Uint8Array(await file.arrayBuffer()).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )}`,
      });
    }

    setFileParts((currentFiles) => [...currentFiles, ...newFileParts]);
  }, []);

  const resetFileParts = useCallback(() => {
    setFileParts([]);
  }, []);

  return {
    fileParts,
    addFiles,
    resetFileParts,
  };
};

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  sendMessage,
  stop,
  status,
  chatId,
}) => {
  const { textareaRef, onInput, input, resetTextarea } = useTextArea();
  const { fileParts, addFiles, resetFileParts } = useFileParts();
  const queryClient = useQueryClient();

  const handleClickSend = async () => {
    window.history.replaceState({}, '', `/chat/${chatId}`);
    await sendMessage({
      textParts: [
        {
          type: 'text',
          text: input,
        },
      ],
      fileParts,
    });
    resetFileParts();
    resetTextarea();

    queryClient.invalidateQueries({ queryKey: ['history'] });

    textareaRef.current?.focus();
  };

  const isAllowSend =
    (input.length > 0 || fileParts.length > 0) && status === 'ready';
  const isSending = status === 'streaming' || status === 'submitted';

  return (
    <div className='relative w-full space-y-2 rounded-2xl border border-accent bg-muted p-2.5 pt-4'>
      {fileParts.length > 0 && (
        <div
          className='flex flex-row items-end gap-2 overflow-x-scroll'
          data-testid='attachments-preview'
        >
          {fileParts.map((filePart, index) => (
            <PreviewAttachment filePart={filePart} key={index} />
          ))}
        </div>
      )}
      <Textarea
        autoFocus
        className='!text-base max-h-[calc(35dvh)] min-h-[24px] resize-none overflow-y-auto border-none bg-transparent px-1 py-0 shadow-none outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent'
        data-testid='multimodal-input'
        disabled={isSending}
        onChange={onInput}
        onKeyDown={(event) => {
          if (
            event.key === 'Enter' &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            if (isAllowSend) {
              handleClickSend();
            }
          }
        }}
        placeholder='询问任何问题...'
        ref={textareaRef}
        rows={2}
        value={input}
      />
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-2'>
          <UploadFileButton onAddFiles={addFiles} status={status} />
          <GenImageButton />
        </div>
        <div>
          <ChatSendButton
            isAllowSend={isAllowSend}
            onClickSend={handleClickSend}
            onClickStop={stop}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};
