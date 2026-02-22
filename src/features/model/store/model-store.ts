import { create } from 'zustand';
import { DefaultChatModel } from '@/lib/ai/models';

type ModelInfo = {
  provider: string;
  modelKey: string;
};

export const useModelStore = create<{
  chatModel: ModelInfo | null;
  setModel: (model: { provider: string; modelKey: string } | null) => void;
}>((set) => ({
  chatModel: DefaultChatModel,
  setModel: (model) => set({ chatModel: model }),
}));
