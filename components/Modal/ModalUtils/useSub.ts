import { create } from "zustand";

interface SubStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSub = create<SubStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSub;
