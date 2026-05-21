import { NavLink } from 'react-router-dom';
import CountdownBox from '../CountdownBox/CountdownBox';
import { exportBackup, importBackup } from '../../utils/backup';
import styles from './Sidebar.module.css';
import btnStyles from '../../styles/buttons.module.css';

export default function Sidebar({ studyLogs, mockScores, errors, piDrafts, onImport }) {
  const handleExport = () => {
    exportBackup(studyLogs, mockScores, errors, piDrafts);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const backup = await importBackup(file);
        onImport(backup);
        alert('Backup imported successfully!');
      } catch (err) {
        alert(err.message);
      }
    };
    input.click();
  };

  const navItems = [
    { path: '/', icon: 'fas fa-th-large', label: 'Dashboard' },
    { path: '/simulator', icon: 'fas fa-stopwatch', label: 'Exam Simulator' },
    { path: '/tracker', icon: 'fas fa-tasks', label: 'Study Tracker' },
    { path: '/errors', icon: 'fas fa-exclamation-triangle', label: 'Error Log' },
    { path: '/pi', icon: 'fas fa-microphone', label: 'PI Corner' },
    { path: '/notes', icon: 'fas fa-book-open', label: 'Cheat Sheets' }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoIcon}>EK</div>
        <div className={styles.logoText}>
          <h1>EMAT Prep</h1>
          <span>IIM Kozhikode</span>
        </div>
      </div>

      <nav className={styles.navMenu}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <i className={item.icon}></i> {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <CountdownBox />
        <button className={btnStyles.btnSecondary} style={{ width: '100%', marginTop: 12, padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center' }} onClick={handleExport}>
          <i className="fas fa-download"></i> Export Progress
        </button>
        <button className={btnStyles.btnSecondary} style={{ width: '100%', marginTop: 6, padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center' }} onClick={handleImport}>
          <i className="fas fa-upload"></i> Import Backup
        </button>
      </div>
    </aside>
  );
}
