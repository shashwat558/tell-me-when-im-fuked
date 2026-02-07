"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SessionState {
  user: {
    id: string;
    email: string;
  } | null;
  loading: boolean;
  hydrate: () => Promise<void>;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      hydrate: async () => {
        try {
          const res = await fetch("/api/auth/session", {
            credentials: "include",
          });

          if (!res.ok) throw new Error();

          const data = await res.json();

          set({
            user: data.user,
            loading: false,
          });
        } catch {
          set({
            user: null,
            loading: false,
          });
        }
      },

      clearSession: () => {
        set({ user: null });
      },
    }),
    {
      name: "session-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }), 
    }
  )
);
