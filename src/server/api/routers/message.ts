import type { InferUIDataParts, UIDataPartSchemas, UIMessage } from 'ai';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const messageRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      let data: UIMessage<unknown, InferUIDataParts<UIDataPartSchemas>>[] = [];

      if (input.id === 'markdown-conversation-vomwerjweasm') {
        data = [
          {
            role: 'user',
            id: '1',
            parts: [
              {
                type: 'text',
                text: 'hi',
              },
            ],
          },
          {
            role: 'assistant',
            id: '2',
            parts: [{ type: 'text', text: 'hello' }],
          },
          {
            role: 'user',
            id: '3',
            parts: [{ type: 'text', text: 'give long text' }],
          },
          {
            role: 'assistant',
            id: '4',
            parts: [
              {
                type: 'text',
                text: `
# My Awesome Markdown Document

## Introduction

This document showcases various **Markdown** features. Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It's widely used for documentation, blogging, and more.

---

### Text Formatting

You can easily format text:

*   **Bold text**: \`**This is bold**\` or \`__This is also bold__\`
*   *Italic text*: \`*This is italic*\` or \`_This is also italic_\`
*   ***Bold and italic***: \`***This is bold and italic***\`
*   ~~Strikethrough text~~: \`~~This text is struck through~~\`

You can also use \`inline code\` by wrapping text in backticks.

---

### Lists

#### Unordered List:

*   Item 1
    *   Nested Item A
    *   Nested Item B
*   Item 2
    *   Another nested item
*   Item 3

#### Ordered List:

1.  First item
2.  Second item
    1.  Nested ordered item
    2.  Another nested item
3.  Third item

#### Task List:

-   [x] Complete the report
-   [ ] Send the email
-   [x] Buy groceries
-   [ ] Call John

---

### Links and Images

*   **External Link**: [Visit Google](https://www.google.com "Google's Homepage")
*   **Internal Link (if this were a longer document)**: [Go to Introduction](#introduction)

*   **Image**:
    ![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg "A logo representing Markdown")

---

### Blockquotes

> "The only way to do great work is to love what you do."
> ― Steve Jobs
>
> This is a multi-line blockquote.
> You can continue it on new lines by starting each with \` >
  \`.

---

### Code Blocks

You can display code snippets using triple backticks. You can also specify the language for syntax highlighting:

\`\`\`python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5)) # Output: 120
\`\`\`
            `,
              },
            ],
          },
        ];
      } else if (input.id === 'easy-chat-asdnmownwrwe') {
        data = [
          {
            role: 'user',
            id: '1',
            parts: [
              {
                type: 'text',
                text: 'Good Morning',
              },
            ],
          },
          {
            role: 'assistant',
            id: '2',
            parts: [
              { type: 'text', text: 'Good Morning, how can I help you today?' },
            ],
          },
        ];
      }
      return data;
    }),
});
