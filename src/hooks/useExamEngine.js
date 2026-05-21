import { useState, useEffect, useCallback, useRef } from 'react';

export default function useExamEngine() {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'active' | 'completed'
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer tick
  useEffect(() => {
    if (phase !== 'active' || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, isPaused]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (phase === 'active' && timeLeft === 0 && !isPaused) {
      submitExam();
    }
  }, [timeLeft, phase, isPaused]);

  const startExam = useCallback((name, questionSet) => {
    const duration = name === 'diagnosticMock' ? 3600 : 900;
    setTestName(name);
    setQuestions(questionSet);
    setAnswers(new Array(questionSet.length).fill(null));
    setFlagged(new Array(questionSet.length).fill(false));
    setCurrentIndex(0);
    setTimeLeft(duration);
    setResult(null);
    setIsPaused(false);
    setPhase('active');
  }, []);

  const selectAnswer = useCallback((optionIndex) => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  }, [currentIndex]);

  const toggleFlag = useCallback(() => {
    setFlagged(prev => {
      const next = [...prev];
      next[currentIndex] = !next[currentIndex];
      return next;
    });
  }, [currentIndex]);

  const jumpTo = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const navigateNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1));
  }, [questions.length]);

  const navigatePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const switchSection = useCallback((sectionName) => {
    const firstIndex = questions.findIndex(q => q.section === sectionName);
    if (firstIndex !== -1) setCurrentIndex(firstIndex);
  }, [questions]);
  
  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const submitExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    let score = 0;
    const sectionCorrect = { QA: 0, DILR: 0, VA: 0 };
    const sectionTotal = { QA: 0, DILR: 0, VA: 0 };
    const wrongAnswers = [];

    questions.forEach((q, idx) => {
      sectionTotal[q.section]++;
      if (answers[idx] === q.correctAnswer) {
        score++;
        sectionCorrect[q.section]++;
      } else {
        wrongAnswers.push({
          qId: q.id,
          section: q.section,
          topic: q.topic,
          questionText: q.question,
          correctIndex: q.correctAnswer,
          correctText: q.options[q.correctAnswer],
          userIndex: answers[idx],
          userText: answers[idx] !== null ? q.options[answers[idx]] : 'Unanswered',
          explanation: q.explanation
        });
      }
    });

    setResult({
      score,
      maxScore: questions.length,
      sectionCorrect,
      sectionTotal,
      wrongAnswers,
      testName
    });
    setPhase('completed');
  }, [questions, answers, testName]);

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('idle');
    setQuestions([]);
    setAnswers([]);
    setFlagged([]);
    setCurrentIndex(0);
    setTimeLeft(0);
    setResult(null);
    setIsPaused(false);
  }, []);

  const currentQuestion = questions[currentIndex] || null;
  const answeredCount = answers.filter(a => a !== null).length;
  const formattedTime = `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;
  const isWarning = timeLeft < 300 && timeLeft > 0;

  return {
    phase,
    questions,
    currentQuestion,
    currentIndex,
    answers,
    flagged,
    timeLeft,
    formattedTime,
    isWarning,
    answeredCount,
    result,
    isPaused,
    startExam,
    selectAnswer,
    toggleFlag,
    jumpTo,
    navigateNext,
    navigatePrev,
    switchSection,
    togglePause,
    submitExam,
    reset
  };
}
