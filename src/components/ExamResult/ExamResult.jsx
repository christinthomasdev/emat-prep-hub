import styles from './ExamResult.module.css';
import btnStyles from '../../styles/buttons.module.css';
import badgeStyles from '../../styles/badges.module.css';

export default function ExamResult({ result, onReset, onGoToDashboard, onLogError }) {
  const { score, maxScore, sectionCorrect, sectionTotal, wrongAnswers } = result;
  const accuracy = Math.round(score / maxScore * 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Exam Completed!</h2>
        <p>Here is your performance breakdown.</p>
        <div className={styles.circle}>
          <div className={styles.score}>{score}</div>
          <div className={styles.total}>out of {maxScore}</div>
        </div>
        <h3 className={styles.accuracy}>{accuracy}% Accuracy</h3>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <div className={styles.statVal} style={{ color: 'var(--accent-blue)' }}>{sectionCorrect.QA} / {sectionTotal.QA}</div>
          <div className={styles.statLbl}>Quant (QA)</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statVal} style={{ color: 'var(--accent-cyan)' }}>{sectionCorrect.DILR} / {sectionTotal.DILR}</div>
          <div className={styles.statLbl}>Reasoning (DILR)</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statVal} style={{ color: 'hsl(270, 85%, 70%)' }}>{sectionCorrect.VA} / {sectionTotal.VA}</div>
          <div className={styles.statLbl}>Verbal (VA)</div>
        </div>
      </div>

      {wrongAnswers.length > 0 && (
        <>
          <div className={styles.detailsTitle}>Review & Log Weaknesses</div>
          <div className={styles.wrongList}>
            {wrongAnswers.map((wrong, idx) => (
              <div key={idx} className={styles.wrongRow}>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ marginBottom: 8 }}>
                    <span className={
                      wrong.section === 'QA' ? badgeStyles.badgeQa
                      : wrong.section === 'DILR' ? badgeStyles.badgeDilr
                      : badgeStyles.badgeVa
                    }>{wrong.section}</span>
                    <span className={styles.wrongTopic}>{wrong.topic}</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', marginBottom: 12, fontWeight: 500 }}>
                    {wrong.questionText}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 8, padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ marginBottom: 4 }}>
                      Your Answer: <strong>{wrong.userIndex !== null ? `${String.fromCharCode(65 + wrong.userIndex)}) ${wrong.userText}` : 'Unanswered'}</strong>
                    </div>
                    <div>
                      Correct Answer: <strong style={{ color: 'var(--accent-green)' }}>{String.fromCharCode(65 + wrong.correctIndex)}) {wrong.correctText}</strong>
                    </div>
                  </div>
                  {wrong.explanation && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderLeft: '2px solid var(--glass-border)', paddingLeft: 12 }}>
                      <em>Explanation:</em> {wrong.explanation}
                    </div>
                  )}
                </div>
                <div style={{ alignSelf: 'flex-start', marginLeft: 16 }}>
                  <button className={btnStyles.btnSecondary} style={{ padding: '6px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                    onClick={() => onLogError(wrong.qId, wrong.section, wrong.topic)}>
                    <i className="fas fa-plus"></i> Add to Error Log
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={styles.actions}>
        <button className={btnStyles.btnSecondary} onClick={onReset}><i className="fas fa-undo"></i> Back to Main</button>
        <button className={btnStyles.btnPrimary} onClick={onGoToDashboard}><i className="fas fa-chart-line"></i> Dashboard</button>
      </div>
    </div>
  );
}
