import styles from './PrinciplesPanel.module.css';

const principles = [
  { num: 1, title: 'No Negative Marking', desc: 'Attempt every single question! In the last 5 minutes, fill all unanswered questions with strategic guesses.' },
  { num: 2, title: 'No Sectional Time Limits', desc: 'Navigate freely between QA, DILR, and VA. Finish your strongest questions first to bank high confidence.' },
  { num: 3, title: 'Pacing (50s / Question)', desc: 'Speed is key. Never spend more than 90 seconds on any single math problem or logical reasoning set.' },
  { num: 4, title: 'Personal Interview Focus', desc: 'Admission depends heavily on the PI. Practice pacing verbal answers between 60–90 seconds.' }
];

export default function PrinciplesPanel() {
  return (
    <div className={styles.list}>
      {principles.map(p => (
        <div key={p.num} className={styles.item}>
          <div className={styles.num}>{p.num}</div>
          <div className={styles.content}>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
