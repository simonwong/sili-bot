'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { PreviewAttachment } from './preview-attachment';
import { ChatStatus } from 'ai';
import { ChatSendButton } from './chat-send-button';
import { UploadFileButton } from './upload-file-button';

export interface ChatInputBarProps {
  sendMessage: (data: { text?: string; files?: File[] }) => Promise<void>;
  stop: () => Promise<void>;
  status: ChatStatus;
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

const useAttachments = () => {
  const [attachments, setAttachments] = useState<File[]>([]);

  const addAttachments = useCallback((files: File[]) => {
    setAttachments((currentFiles) => [...currentFiles, ...files]);
  }, []);

  const resetAttachments = useCallback(() => {
    setAttachments([]);
  }, []);

  return {
    attachments,
    addAttachments,
    resetAttachments,
  };
};

export const ChatInputBar: React.FC<ChatInputBarProps> = ({ sendMessage, stop, status }) => {
  const { textareaRef, onInput, input, resetTextarea } = useTextArea();
  const { attachments, addAttachments, resetAttachments } = useAttachments();

  const handleClickSend = async () => {
    await sendMessage({
      text: input,
      files: attachments,
    });
    resetAttachments();
    resetTextarea();
  };

  const isAllowSend = (input.length > 0 || attachments.length > 0) && status === 'ready';
  const isSending = status === 'streaming' || status === 'submitted';

  return (
    <div className="relative w-full bg-muted rounded-2xl p-2.5 pt-4 space-y-2">
      {attachments.length > 0 && (
        <div
          data-testid="attachments-preview"
          className="flex flex-row gap-2 overflow-x-scroll items-end"
        >
          {attachments.map((attachment, index) => (
            <PreviewAttachment key={index} attachment={attachment} />
          ))}
        </div>
      )}
      <Textarea
        data-testid="multimodal-input"
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={onInput}
        className="min-h-[24px] max-h-[calc(35dvh)] overflow-y-auto resize-none !text-base
          border-none outline-none shadow-none py-0 px-1
          ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0
          "
        rows={2}
        autoFocus
        disabled={isSending}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            if (isAllowSend) {
              handleClickSend();
            }
          }
        }}
      />
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <UploadFileButton onAddFiles={addAttachments} status={status} />
        </div>
        <div>
          <ChatSendButton
            isAllowSend={isAllowSend}
            status={status}
            onClickSend={handleClickSend}
            onClickStop={stop}
          />
        </div>
      </div>
    </div>
  );
};
