import { useMemo } from 'react';
import StatCard from '../components/StatCard/StatCard';
import PerformanceChart from '../components/PerformanceChart/PerformanceChart';
import PrinciplesPanel from '../components/PrinciplesPanel/PrinciplesPanel';
import styles from './Dashboard.module.css';

export default function Dashboard({ studyLogs, mockScores, errors }) {
  const stats = useMemo(() => {
    const totalHours = studyLogs.reduce((acc, log) => acc + log.hours, 0);
    const mockCount = mockScores.length;
    const avgScore = mockCount ? Math.round(mockScores.reduce((acc, mock) => acc + (mock.score / mock.maxScore * 100), 0) / mockCount) : 0;
    const activeErrors = errors.length;
    return { totalHours, mockCount, avgScore, activeErrors };
  }, [studyLogs, mockScores, errors]);

  return (
    <div className="fade-in">
      <header className={styles.header}>
        <h2 className={styles.title}>Your Prep Dashboard</h2>
        <p className={styles.subtitle}>Welcome back. Stay consistent and focus on accuracy.</p>
      </header>

      <div className={styles.statsGrid}>
        <StatCard icon="fas fa-clock" value={`${stats.totalHours.toFixed(1)}h`} label="Total Study Hours" variant="blue" />
        <StatCard icon="fas fa-file-alt" value={stats.mockCount} label="Mocks Attempted" variant="cyan" />
        <StatCard icon="fas fa-crosshairs" value={`${stats.avgScore}%`} label="Average Accuracy" variant="green" />
        <StatCard icon="fas fa-bug" value={stats.activeErrors} label="Active Errors to Review" variant="coral" />
      </div>

      <div className={styles.layoutGrid}>
        <div className={styles.mainCol}>
          <div className={styles.panel}>
            <h3>Mock Performance Trend</h3>
            <PerformanceChart mockScores={mockScores} />
          </div>
        </div>
        <div className={styles.sideCol}>
          <div className={styles.panel}>
            <h3>EMAT Core Principles</h3>
            <PrinciplesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
