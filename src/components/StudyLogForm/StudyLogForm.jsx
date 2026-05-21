import { useState } from 'react';
import styles from './StudyLogForm.module.css';
import btnStyles from '../../styles/buttons.module.css';

export default function StudyLogForm({ onLog }) {
  const [form, setForm] = useState({ date: '', hours: '', questions: '', correct: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const hours = parseFloat(form.hours);
    if (!form.date || isNaN(hours) || hours <= 0) {
      alert('Please enter a valid date and study hours.'); return;
    }
    onLog({
      date: form.date, hours,
      questions: parseInt(form.questions) || 0,
      correct: parseInt(form.correct) || 0,
      label: parseInt(form.questions) > 0 ? 'Practice' : 'Self Study'
    });
    setForm({ date: '', hours: '', questions: '', correct: '' });
    alert('Study session logged successfully!');
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><div className={styles.panelTitle}>Log Study Session</div></div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Study Date</label>
          <input type="date" className={styles.formControl} value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
        </div>
        <div className={styles.formGroup}>
          <label>Hours Studied</label>
          <input type="number" step="0.1" min="0.1" className={styles.formControl} placeholder="e.g. 2.5" value={form.hours} onChange={e => setForm({...form, hours: e.target.value})} required />
        </div>
        <div className={styles.formGroup}>
          <label>Practice Questions Attempted</label>
          <input type="number" className={styles.formControl} placeholder="e.g. 30" value={form.questions} onChange={e => setForm({...form, questions: e.target.value})} />
        </div>
        <div className={styles.formGroup}>
          <label>Correct Answers</label>
          <input type="number" className={styles.formControl} placeholder="e.g. 22" value={form.correct} onChange={e => setForm({...form, correct: e.target.value})} />
        </div>
        <button type="submit" className={btnStyles.btnPrimary} style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
          <i className="fas fa-save"></i> Save Study Log
        </button>
      </form>
    </div>
  );
}
