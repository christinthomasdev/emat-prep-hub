import PI_QUESTIONS from '../../data/piQuestions';
import styles from './PiDeck.module.css';

export default function PiDeck({ activeId, onSelect }) {
  return (
    <div className={styles.deck}>
      {Object.entries(PI_QUESTIONS).map(([catName, questions]) => (
        <div key={catName}>
          <div className={styles.catHeader}>{catName.charAt(0).toUpperCase() + catName.slice(1)}</div>
          {questions.map(q => (
            <div key={q.id}
              className={`${styles.qCard} ${activeId === q.id ? styles.qCardActive : ''}`}
              onClick={() => onSelect(catName, q)}
            >{q.text}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
