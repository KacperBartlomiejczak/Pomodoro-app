import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

import { useTimerStore } from "@/feature/timer/useTimerStore";
import { TimerStore } from "@/feature/timer/types";

type AppStore = TimerStore;

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...a) => ({
        ...useTimerStore(...a),
      }),
      { name: "pomodoro-storage" }
    )
  )
);
