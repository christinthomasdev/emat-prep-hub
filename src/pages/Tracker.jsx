import StudyChecklist from '../components/StudyChecklist/StudyChecklist';
import StudyLogForm from '../components/StudyLogForm/StudyLogForm';

export default function Tracker({ onLog }) {
  return (
    <div className="fade-in">
      <header style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 8 }}>Study Tracker</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Log your hours and follow the week-by-week plan.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <StudyChecklist />
        <StudyLogForm onLog={onLog} />
      </div>
    </div>
  );
}
