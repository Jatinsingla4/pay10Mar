import { create } from 'zustand';

const useAnimationStore = create((set) => ({
  canStartAnimations: false,
  setCanStartAnimations: (value) => set({ canStartAnimations: value }),
}));

export default useAnimationStore;
