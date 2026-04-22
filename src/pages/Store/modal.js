import { create } from "zustand";

const useModalStore = create((set) => ({
  // state
  isOpen: false,

  // actions
  // open modal
  openModal: () => set({ isOpen: true }),

  // close modal
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
