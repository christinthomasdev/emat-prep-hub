import { useState, useEffect, useCallback, useRef } from 'react';

export default function usePiTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const toggle = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
  }, []);

  const maxLimit = 120;
  const progressPercent = Math.min(100, (seconds / maxLimit) * 100);
  const formattedTime = `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  let phase = 'warmup';
  let statusText = 'Warm Up (Aim for 60s)';
  if (seconds >= 60 && seconds <= 90) {
    phase = 'optimal';
    statusText = 'Optimal Sweet Spot! Structure: Hook -> Impact -> Future';
  } else if (seconds > 90) {
    phase = 'overtime';
    statusText = 'Overtime (Wrap up your thoughts now)';
  }

  return {
    seconds,
    isRunning,
    phase,
    statusText,
    progressPercent,
    formattedTime,
    toggle,
    reset
  };
}
