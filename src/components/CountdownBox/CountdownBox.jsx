import useCountdown from '../../hooks/useCountdown';
import styles from './CountdownBox.module.css';

export default function CountdownBox() {
  const { daysLeft, isExamDay, isPast } = useCountdown();

  return (
    <div className={styles.box}>
      {isPast ? (
        <>
          <div className={styles.days} style={{ fontSize: '1.3rem', color: 'var(--text-muted)' }}>COMPLETED</div>
          <div className={styles.label}>EMAT Prep 2026</div>
        </>
      ) : isExamDay ? (
        <>
          <div className={styles.days} style={{ fontSize: '1.5rem', color: 'var(--accent-coral)' }}>EXAM DAY</div>
          <div className={styles.label}>Good Luck!</div>
        </>
      ) : (
        <>
          <div className={styles.days}>{daysLeft}</div>
          <div className={styles.label}>Days Remaining</div>
        </>
      )}
    </div>
  );
}
