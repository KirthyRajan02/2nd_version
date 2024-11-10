import { create } from 'zustand'

interface LayoutStore {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
}))