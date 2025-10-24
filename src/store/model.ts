import { create } from 'zustand';
import { DefaultChatModel, DefaultImageModel } from '@/lib/ai/models';

type ModelInfo = {
  provider: string;
  modelKey: string;
};

export const useModelStore = create<{
  chatModel: ModelInfo | null;
  imageModel: ModelInfo | null;
  type: 'chat' | 'image';
  setModel: (model: { provider: string; modelKey: string } | null) => void;
  setType: (type: 'chat' | 'image') => void;
}>((set) => ({
  chatModel: DefaultChatModel,
  imageModel: DefaultImageModel,
  type: 'chat',
  setModel: (model) => set({ chatModel: model }),
  setType: (type) => set({ type }),
}));
