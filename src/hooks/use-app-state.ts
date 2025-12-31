import { create } from 'zustand'

type AppState = {
    loading: boolean
    startLoading: () => void
    stopLoading: () => void
    setLoading: (state: boolean) => void
}

export const useAppState = create<AppState>((set) => ({
    loading: false,
    startLoading: () => set({ loading: true }),
    stopLoading: () => set({ loading: false }),
    setLoading: (state) => set({ loading: state }),
}))
