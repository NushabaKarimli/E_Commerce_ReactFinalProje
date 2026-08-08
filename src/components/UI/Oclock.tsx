import { useEffect, useState } from "react";
import { Clock10, Flame } from "lucide-react";
import "./oclock.scss"
type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DISCOUNT_END_TIME: number = new Date(
  "2030-02-31T23:59:59"
).getTime();
const Oclock = () => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const now: number = Date.now();
    const difference: number = DISCOUNT_END_TIME - now;

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const intervalId: number = window.setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      if (!updatedTime) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!timeLeft) {
    return <div> <Clock10 /> Endirim bitdi</div>;
  }

  return (
    <div className="container">
      <Flame /> Endirimin bitməsinə:
      <br />
      {timeLeft.days} gün {timeLeft.hours} saat {timeLeft.minutes} dəq{" "}
      {timeLeft.seconds} san
    </div>
  );
};

export default Oclock;
