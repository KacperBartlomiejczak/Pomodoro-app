import { StateCreator } from "zustand";
import { TimerStore } from "./types";

const DEFAULT_DURATIONS = {
  work: 30 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  longIntervalSession: 4,
};

export const useTimerStore: StateCreator<TimerStore> = (set, get) => ({
  timeLeft: DEFAULT_DURATIONS.work,
  duration: DEFAULT_DURATIONS.work,
  session: 1,
  mode: "work",
  status: "idle",
  config: DEFAULT_DURATIONS,

  pause: () => set({ status: "paused" }),
  start: () => set({ status: "running" }),
  reset: () => {
    const state = get();

    const nextDuration =
      state.mode === "work"
        ? state.config.work
        : state.mode === "short-break"
        ? state.config.shortBreak
        : state.config.longBreak;

    set({ status: "idle", timeLeft: nextDuration, duration: nextDuration });
  },

  tick: () => {
    const state = get();

    if (state.status !== "running") return;

    if (state.timeLeft > 0) {
      set({ timeLeft: state.timeLeft - 1 });
    } else {
      set({ status: "idle", session: state.session + 1 });

      if (
        state.mode === "work" &&
        state.session % state.config.longIntervalSession !== 0
      ) {
        set({
          timeLeft: state.config.shortBreak,
          duration: state.config.shortBreak,
          mode: "short-break",
        });
      } else if (state.mode === "short-break" || state.mode === "long-break") {
        set({
          timeLeft: state.config.work,
          duration: state.config.work,
          mode: "work",
        });
      } else {
        set({
          timeLeft: state.config.longBreak,
          duration: state.config.longBreak,
          mode: "long-break",
        });
      }
    }
  },
  skipSession: () => {
    const state = get();

    set({ status: "idle", session: state.session + 1 });

    if (
      state.mode === "work" &&
      state.session % state.config.longIntervalSession !== 0
    ) {
      set({
        timeLeft: state.config.shortBreak,
        duration: state.config.shortBreak,
        mode: "short-break",
      });
    } else if (state.mode === "short-break" || state.mode === "long-break") {
      set({
        timeLeft: state.config.work,
        duration: state.config.work,
        mode: "work",
      });
    } else {
      set({
        timeLeft: state.config.longBreak,
        duration: state.config.longBreak,
        mode: "long-break",
      });
    }
  },
});
