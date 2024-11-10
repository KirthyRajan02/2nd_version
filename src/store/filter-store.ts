import { create } from 'zustand'

interface FilterState {
  country: string
  batch: string
  stage: string
  program: string
  setFilter: (key: string, value: string) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  country: 'all',
  batch: 'all',
  stage: 'all',
  program: 'all',
  setFilter: (key, value) => set({ [key]: value }),
  resetFilters: () => set({ 
    country: 'all', 
    batch: 'all', 
    stage: 'all', 
    program: 'all' 
  }),
})) 