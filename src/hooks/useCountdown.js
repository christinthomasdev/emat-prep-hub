import { useMemo } from 'react';
import { EXAM_DATE } from '../data/defaults';

export default function useCountdown() {
  return useMemo(() => {
    const now = new Date();
    const diffTime = EXAM_DATE - now;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      daysLeft: Math.max(0, daysLeft),
      isExamDay: daysLeft === 0,
      isPast: daysLeft < 0
    };
  }, []);
}
