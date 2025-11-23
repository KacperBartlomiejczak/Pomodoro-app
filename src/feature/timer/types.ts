type TimerMode = "work" | "short-break" | "long-break";
type TimerState = "idle" | "running" | "paused";

interface Timer {
  timeLeft: number;
  duration: number;
  session: number;
  mode: TimerMode;
  status: TimerState;
  config: TimerDuration;
}

 interface TimerDuration {
  work: number;
  shortBreak: number;
  longBreak: number;
  longIntervalSession: number;
}

interface TimerAction {
  pause: () => void;
  start: () => void;
  reset: () => void;
  tick: () => void;
  skipSession: () => void;
}

export type TimerStore = TimerAction & Timer;
