import styles from './QuestionMap.module.css';

export default function QuestionMap({ questions, answers, flagged, currentIndex, onJump }) {
  return (
    <div className={styles.panel}>
      <h4 className={styles.title}>Question Grid</h4>
      <div className={styles.grid}>
        {questions.map((q, idx) => {
          let cls = styles.node;
          if (currentIndex === idx) cls += ` ${styles.nodeActive}`;
          if (answers[idx] !== null) cls += ` ${styles.nodeAnswered}`;
          if (flagged[idx]) cls += ` ${styles.nodeFlagged}`;
          return (
            <div key={idx} className={cls} onClick={() => onJump(idx)}>
              {idx + 1}
            </div>
          );
        })}
      </div>
      <div className={styles.legends}>
        <div className={styles.legendItem}><div className={styles.legendColor}></div> Unvisited</div>
        <div className={styles.legendItem}><div className={`${styles.legendColor} ${styles.legendAnswered}`}></div> Answered</div>
        <div className={styles.legendItem}><div className={`${styles.legendColor} ${styles.legendFlagged}`}></div> Flagged</div>
      </div>
    </div>
  );
}
