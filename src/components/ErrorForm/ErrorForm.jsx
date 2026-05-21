import { useState } from 'react';
import styles from './ErrorForm.module.css';
import btnStyles from '../../styles/buttons.module.css';

export default function ErrorForm({ onSubmit }) {
  const [form, setForm] = useState({ section: 'QA', topic: '', category: 'Concept gap', shortcut: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.topic || !form.shortcut) { alert('Please enter a topic and a shortcut/remedy.'); return; }
    onSubmit({ id: 'err_' + Date.now(), qId: 'manual', ...form });
    setForm({ section: 'QA', topic: '', category: 'Concept gap', shortcut: '' });
    alert('New error logged successfully!');
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><div className={styles.panelTitle}>Add Custom Error Entry</div></div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Section</label>
          <select className={styles.formControl} value={form.section} onChange={e => setForm({...form, section: e.target.value})}>
            <option value="QA">Quant (QA)</option><option value="DILR">Logic & DI (DILR)</option><option value="VA">Verbal (VA)</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Topic Name</label>
          <input type="text" className={styles.formControl} placeholder="e.g. Time, Speed, Distance" value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} required />
        </div>
        <div className={styles.formGroup}>
          <label>Error Category</label>
          <select className={styles.formControl} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="Concept gap">Concept Gap</option><option value="Calculation error">Calculation Error</option>
            <option value="Misread question">Misread Question</option><option value="Time pressure">Time Pressure</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Takeaway or Remedy</label>
          <input type="text" className={styles.formControl} placeholder="e.g. Convert units to m/s first" value={form.shortcut} onChange={e => setForm({...form, shortcut: e.target.value})} required />
        </div>
        <button type="submit" className={btnStyles.btnPrimary} style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
          <i className="fas fa-plus"></i> Add to Error Log
        </button>
      </form>
    </div>
  );
}
