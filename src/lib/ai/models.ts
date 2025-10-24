export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  id: string;
  name: string;
  description?: string;
}

export interface ChatModelGroup {
  provider: string;
  models: ChatModel[];
}

export const chatModelGroups: ChatModelGroup[] = [
  {
    provider: 'Gemini',
    models: [
      {
        id: 'gemini-2.5-flash',
        name: 'Gemini 2.5 Flash',
      },
      {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
      },
    ],
  },
];

export const imageModelGroups: ChatModelGroup[] = [
  {
    provider: 'Gemini',
    models: [
      {
        id: 'gemini-2.5-flash-image-preview',
        name: 'Nano Banana',
      },
    ],
  },
];

export const DefaultChatModel = {
  provider: 'Gemini',
  modelKey: 'gemini-2.5-flash',
};
export const DefaultImageModel = {
  provider: 'Gemini',
  modelKey: 'gemini-2.5-flash-image-preview',
};

export const providerLogo = {
  Gemini: '/providers-logo/google.svg',
};
