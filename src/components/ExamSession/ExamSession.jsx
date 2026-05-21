import QuestionMap from '../QuestionMap/QuestionMap';
import styles from './ExamSession.module.css';
import btnStyles from '../../styles/buttons.module.css';

export default function ExamSession({ engine }) {
  const { currentQuestion, currentIndex, questions, answers, flagged, formattedTime, isWarning, isPaused,
    selectAnswer, toggleFlag, navigateNext, navigatePrev, jumpTo, switchSection, togglePause, submitExam } = engine;

  const testTitle = engine.phase === 'active' && questions[0]
    ? (questions.length > 20 ? 'Official Diagnostic Mock' : 'Sectional Practice Set')
    : 'Exam';

  const handleSubmit = () => {
    const answeredCount = answers.filter(a => a !== null).length;
    const unanswered = questions.length - answeredCount;
    let msg = 'Are you sure you want to submit your exam?';
    if (unanswered > 0) {
      msg = `You have ${unanswered} unanswered questions remaining. Since EMAT has NO negative markings, it is highly recommended to fill every answer before submitting. Submit anyway?`;
    }
    if (window.confirm(msg)) submitExam();
  };

  if (!currentQuestion) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2>{testTitle}</h2>
          <p>EMAT Testing Mode — timed session</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className={btnStyles.btnSecondary} onClick={togglePause}>
            <i className={isPaused ? "fas fa-play" : "fas fa-pause"}></i> {isPaused ? 'Resume' : 'Pause'}
          </button>
          <div className={`${styles.timer} ${isWarning ? styles.timerWarning : ''}`}>
            <i className="far fa-clock"></i>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainPanel}>
          {isPaused ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
              <i className="fas fa-pause-circle" style={{ fontSize: '4rem', color: 'var(--accent-blue)', marginBottom: '1rem' }}></i>
              <h2>Session Paused</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Timer is paused and questions are hidden to prevent cheating.</p>
              <button className={btnStyles.btnPrimary} onClick={togglePause} style={{ fontSize: '1.2rem', padding: '12px 24px' }}>
                Resume Exam
              </button>
            </div>
          ) : (
            <>
              <div className={styles.navHeader}>
                <div className={styles.sectionTabs}>
                  {['QA', 'DILR', 'VA'].map(sec => (
                    <span
                      key={sec}
                      className={`${styles.sectionTab} ${currentQuestion.section === sec ? styles.sectionTabActive : ''}`}
                      onClick={() => switchSection(sec)}
                    >
                      {sec === 'QA' ? 'Quant (QA)' : sec === 'DILR' ? 'Logic & DI (DILR)' : 'Verbal (VA)'}
                    </span>
                  ))}
                </div>
                <button className={btnStyles.btnSecondary} onClick={toggleFlag}>
                  <i className="far fa-flag"></i> Flag Question
                </button>
              </div>

              <div className={styles.body}>
                <div className={styles.qMeta}>Question {currentIndex + 1} of {questions.length} • Topic: {currentQuestion.topic}</div>
                <div className={styles.qText}>{currentQuestion.question}</div>
                <div className={styles.optionsList}>
                  {currentQuestion.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className={`${styles.optionBox} ${answers[currentIndex] === idx ? styles.optionBoxSelected : ''}`}
                      onClick={() => selectAnswer(idx)}
                    >
                      <div className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</div>
                      <div className={styles.optionText}>{opt}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.footer}>
                <button className={btnStyles.btnSecondary} onClick={navigatePrev} disabled={currentIndex === 0}>
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
                <button className={btnStyles.btnDanger} onClick={handleSubmit}>Submit Exam</button>
                <button className={btnStyles.btnPrimary} onClick={navigateNext} disabled={currentIndex === questions.length - 1}>
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </>
          )}
        </div>

        {!isPaused && (
          <QuestionMap
            questions={questions}
            answers={answers}
            flagged={flagged}
            currentIndex={currentIndex}
            onJump={jumpTo}
          />
        )}
      </div>
    </div>
  );
}
