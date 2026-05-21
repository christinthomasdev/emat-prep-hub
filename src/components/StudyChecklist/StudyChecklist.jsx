import { useState } from 'react';
import styles from './StudyChecklist.module.css';

const checklistItems = [
  { id: 'w1_q1', week: 1, label: 'Day 1–2: Take official IIMK sample paper (Diagnostic)' },
  { id: 'w1_q2', week: 1, label: 'Day 3: QA refresh — percentages, ratios, P&L' },
  { id: 'w1_q3', week: 1, label: 'Day 4: QA refresh — TSD, T&W, averages' },
  { id: 'w1_q4', week: 1, label: 'Day 5: DILR refresh — arrangements, tables' },
  { id: 'w1_q5', week: 1, label: 'Day 6: DILR refresh — blood relations, logic puzzles' },
  { id: 'w1_q6', week: 1, label: 'Day 7: VA — 1 Reading Comprehension + timed review' },
  { id: 'w2_q1', week: 2, label: 'QA: SI/CI, linear & quadratic equations, inequalities' },
  { id: 'w2_q2', week: 2, label: 'DILR: seating with conditions, Venn diagrams, syllogisms' },
  { id: 'w2_q3', week: 2, label: 'VA: Reading Comprehension passages, sentence correction' },
  { id: 'w2_q4', week: 2, label: 'Take Timed Mock Test #1 + categorise error log' },
  { id: 'pi_q1', week: 2, label: 'Draft PI answers: Why EMBA, Career goals, why IIMK' }
];

export default function StudyChecklist() {
  const [checks, setChecks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('emat_planner_checks')) || {}; }
    catch { return {}; }
  });

  const toggle = (id) => {
    const updated = { ...checks, [id]: !checks[id] };
    setChecks(updated);
    localStorage.setItem('emat_planner_checks', JSON.stringify(updated));
  };

  const grouped = {};
  checklistItems.forEach(item => {
    if (!grouped[item.week]) grouped[item.week] = [];
    grouped[item.week].push(item);
  });

  return (
    <div className={styles.container}>
      {Object.entries(grouped).map(([week, items]) => (
        <div key={week} className={styles.weekCard}>
          <div className={styles.weekTitle}>Week {week} Prep Targets</div>
          <div className={styles.group}>
            {items.map(item => (
              <label key={item.id} className={`${styles.checkLabel} ${checks[item.id] ? styles.checked : ''}`}>
                <input type="checkbox" checked={checks[item.id] || false} onChange={() => toggle(item.id)} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
