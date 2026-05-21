import { Outlet } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import { DEFAULT_STUDY_LOGS, DEFAULT_MOCK_SCORES, DEFAULT_ERRORS, DEFAULT_PI_DRAFTS } from './data/defaults';
import Sidebar from './components/Sidebar/Sidebar';
import AiTutor from './components/AiTutor/AiTutor';
import styles from './App.module.css';

export default function App() {
  const [studyLogs, setStudyLogs] = useLocalStorage('emat_study_logs', DEFAULT_STUDY_LOGS);
  const [mockScores, setMockScores] = useLocalStorage('emat_mock_scores', DEFAULT_MOCK_SCORES);
  const [errors, setErrors] = useLocalStorage('emat_errors', DEFAULT_ERRORS);
  const [piDrafts, setPiDrafts] = useLocalStorage('emat_pi_drafts', DEFAULT_PI_DRAFTS);

  const handleImport = (backup) => {
    if (backup.studyLogs) setStudyLogs(backup.studyLogs);
    if (backup.mockScores) setMockScores(backup.mockScores);
    if (backup.errors) setErrors(backup.errors);
    if (backup.piDrafts) setPiDrafts(backup.piDrafts);
    if (backup.plannerChecks) {
      localStorage.setItem('emat_planner_checks', JSON.stringify(backup.plannerChecks));
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar
        studyLogs={studyLogs} mockScores={mockScores}
        errors={errors} piDrafts={piDrafts}
        onImport={handleImport}
      />
      <main className={styles.content}>
        <Outlet context={{ studyLogs, setStudyLogs, mockScores, setMockScores, errors, setErrors, piDrafts, setPiDrafts }} />
      </main>
      <AiTutor studyLogs={studyLogs} mockScores={mockScores} errors={errors} />
    </div>
  );
}
