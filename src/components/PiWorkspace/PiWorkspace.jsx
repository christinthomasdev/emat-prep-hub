import usePiTimer from '../../hooks/usePiTimer';
import styles from './PiWorkspace.module.css';
import btnStyles from '../../styles/buttons.module.css';

export default function PiWorkspace({ question, category, draft, onDraftChange, onSave }) {
  const timer = usePiTimer();

  return (
    <div className={styles.workspace}>
      <div className={styles.header}>
        <h3>{question?.text || 'Select a question'}</h3>
        <p>Category: {(category || 'SELF').toUpperCase()}</p>
      </div>

      <div className={styles.timerWidget}>
        <div className={styles.timerDisplay}>
          <div className={styles.timerIcon}><i className="fas fa-microphone"></i></div>
          <div>
            <span className={styles.timerTime}>{timer.formattedTime}</span>
            <div className={`${styles.timerStatus} ${timer.phase === 'optimal' ? styles.timerStatusOptimal : timer.phase === 'overtime' ? styles.timerStatusOvertime : ''}`}>
              {timer.seconds === 0 && !timer.isRunning ? 'Ready' : timer.statusText}
            </div>
          </div>
        </div>
        <div className={styles.progressBar}>
          <div className={`${styles.progressFill} ${timer.phase === 'optimal' ? styles.progressFillOptimal : timer.phase === 'overtime' ? styles.progressFillOvertime : ''}`}
            style={{ width: `${timer.progressPercent}%` }}></div>
        </div>
        <div className={styles.timerControls}>
          <button className={timer.isRunning ? btnStyles.btnSecondary : btnStyles.btnPrimary} onClick={timer.toggle}>
            <i className={timer.isRunning ? 'fas fa-pause' : 'fas fa-play'}></i>
            {timer.isRunning ? 'Pause' : (timer.seconds > 0 ? 'Resume' : 'Start Practice')}
          </button>
          <button className={btnStyles.btnSecondary} onClick={timer.reset}><i className="fas fa-redo"></i> Reset</button>
        </div>
      </div>

      <div className={styles.textareaContainer}>
        <label>Structured Response Draft:</label>
        <textarea
          className={styles.textarea}
          placeholder="Draft your answer here... Use STAR (Situation, Task, Action, Result) format for competency questions."
          value={draft || ''}
          onChange={(e) => onDraftChange(e.target.value)}
        />
        <div className={styles.textareaFooter}>
          <span><i className="fas fa-sync"></i> Auto-saves when switching questions or views</span>
          <button className={btnStyles.btnSecondary} style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={onSave}>
            <i className="fas fa-save"></i> Force Save
          </button>
        </div>
      </div>
    </div>
  );
}
