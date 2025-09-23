import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const generateTitle = async (
  message: string
): Promise<{
  title: string;
}> => {
  try {
    const result = await generateText({
      model: google('gemini-2.5-flash-preview-05-20'),
      prompt: `Based on this first message from a user, generate a concise, descriptive title for the conversation (max 6 words, no quotes):

User message: "${message}"

Title:`,
      maxRetries: 2,
    });

    // Clean up the generated title - remove quotes and extra whitespace
    const title = result.text
      .replace(/["'`]/g, '')
      .replace(/^title:\s*/i, '')
      .trim();

    return { title: title || 'New Conversation' };
  } catch (_error) {
    return { title: 'New Conversation' };
  }
};
