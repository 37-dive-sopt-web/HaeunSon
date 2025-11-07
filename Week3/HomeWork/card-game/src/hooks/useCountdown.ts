import { useEffect, useState } from "react";

type GameStatus = "prepare" | "playing" | "won" | "lost";

export const useCountdown = (
  duration: number,
  gameStatus: GameStatus,
  onTimerEnd: () => void
) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(intervalId);
          onTimerEnd();
          return 0;
        }

        return prev - 0.1;
      });
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameStatus, onTimerEnd]);

  useEffect(() => {
    if (gameStatus !== "playing") {
      setTimeLeft(duration);
    }
  }, [duration, gameStatus]);

  return timeLeft.toFixed(2);
};
