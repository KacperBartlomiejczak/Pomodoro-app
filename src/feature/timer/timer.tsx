import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function Timer() {
  const { timeLeft, duration, session, mode, status, config, tick } =
    useAppStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "running") {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, tick]);

  return <div></div>;
}
