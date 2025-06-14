'use client';

import { type Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from '@/components/copy-button';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CodeBlock: Components['code'] = ({ node, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  if (match) {
    const codeText = String(children).replace(/\n$/, '');
    return (
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <CopyButton text={codeText} />
        </div>
        <SyntaxHighlighter className="rounded-lg!" language={match[1]} style={oneLight}>
          {codeText}
        </SyntaxHighlighter>
      </div>
    );
  } else {
    return (
      <code
        {...props}
        className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
      >
        {children}
      </code>
    );
  }
};
