import styles from './StatCard.module.css';

export default function StatCard({ icon, value, label, variant = 'blue' }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.icon}><i className={icon}></i></div>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
