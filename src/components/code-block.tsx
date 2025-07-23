'use client';

import type { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from '@/components/animate-ui/buttons/copy';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CodeBlock: Components['code'] = ({
  node,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '');
  if (match) {
    const codeText = String(children).replace(/\n$/, '');
    return (
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <CopyButton content={codeText} variant="outline" />
        </div>
        <SyntaxHighlighter
          className="rounded-lg!"
          language={match[1]}
          style={oneLight}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    );
  }
  return (
    <code
      {...props}
      className={`${className} rounded-md bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-800`}
    >
      {children}
    </code>
  );
};
