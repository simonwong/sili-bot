export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  description?: string;
  id: string;
  name: string;
}

export interface ChatModelGroup {
  models: ChatModel[];
  provider: string;
}

export const chatModelGroups: ChatModelGroup[] = [
  {
    provider: 'Gemini',
    models: [
      {
        id: 'gemini-3-flash-preview',
        name: 'Gemini 3 Flash preview',
      },
    ],
  },
];

export const DefaultChatModel = {
  provider: 'Gemini',
  modelKey: 'gemini-3-flash-preview',
};

export const BaseModel = {
  provider: 'Gemini',
  modelKey: 'gemini-3-flash-preview',
};

export const providerLogo = {
  Gemini: '/providers-logo/google.svg',
};
