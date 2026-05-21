import { useState } from 'react';
import styles from './ExamSetup.module.css';
import btnStyles from '../../styles/buttons.module.css';

const papers = [
  { id: 'diagnosticMock', title: 'Official Diagnostic Mock (40 Questions)', desc: 'Target time: 60 minutes. Compiles official IIMK sample papers.' },
  { id: 'qaPractice', title: 'Quant Section Drilling (12 Questions)', desc: 'Target time: 15 minutes. High ROI arithmetic, equations, SI/CI.' },
  { id: 'dilrPractice', title: 'DILR Section Drilling (8 Questions)', desc: 'Target time: 10 minutes. Linear arrangements, blood relations, tables.' }
];

export default function ExamSetup({ onStart }) {
  const [selected, setSelected] = useState('diagnosticMock');

  return (
    <div className={styles.setup}>
      <h3>Start a Timed Practice Session</h3>
      <p>EMAT features 60 questions in 60 minutes with NO negative marking and FREE section switching. Select a paper below to begin.</p>
      <div className={styles.selectorGrid}>
        {papers.map(paper => (
          <div
            key={paper.id}
            className={`${styles.selectCard} ${selected === paper.id ? styles.selectCardSelected : ''}`}
            onClick={() => setSelected(paper.id)}
          >
            <div className={styles.selectRadio}></div>
            <div className={styles.selectDetails}>
              <h4>{paper.title}</h4>
              <p>{paper.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={btnStyles.btnPrimary} onClick={() => onStart(selected)}>
        <i className="fas fa-play"></i> Start Timed Test
      </button>
    </div>
  );
}
