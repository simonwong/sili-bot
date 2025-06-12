import { create } from 'zustand';

type ModelInfo = {
  provider: string;
  modelKey: string;
};

export const useModelStore = create<{
  model: ModelInfo | null;
  setModel: (model: { provider: string; modelKey: string } | null) => void;
}>((set) => ({
  model: null,
  setModel: (model) => set({ model }),
}));
