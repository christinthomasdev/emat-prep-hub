import { useState, useEffect } from 'react';
import useExamEngine from '../hooks/useExamEngine';
import EMAT_QUESTION_DATABASE from '../data/questions';
import ExamSetup from '../components/ExamSetup/ExamSetup';
import ExamSession from '../components/ExamSession/ExamSession';
import ExamResult from '../components/ExamResult/ExamResult';
import { useNavigate } from 'react-router-dom';

export default function Simulator({ mockScores, setMockScores, errors, setErrors }) {
  const engine = useExamEngine();
  const navigate = useNavigate();

  const handleStartMock = () => {
    const questions = Object.values(EMAT_QUESTION_DATABASE).flat();
    engine.startExam('diagnosticMock', questions);
  };

  const handleStartSectional = (section) => {
    const questions = EMAT_QUESTION_DATABASE[section];
    engine.startExam(`sectional_${section}`, questions);
  };

  useEffect(() => {
    if (engine.phase === 'completed' && engine.result) {
      const { testName, score, maxScore } = engine.result;
      if (testName === 'diagnosticMock') {
        const newMock = {
          name: `Full Mock ${mockScores.length + 1}`,
          score, maxScore, date: new Date().toISOString().split('T')[0]
        };
        // Avoid adding the same result twice if re-rendered
        // but since this is a simple useEffect, it will run once when phase changes to completed
        setMockScores(prev => [...prev, newMock]);
      }
    }
  }, [engine.phase]);

  const handleLogError = (qId, section, topic) => {
    const newError = {
      id: 'err_' + Date.now(),
      qId, section, topic,
      category: 'Review Needed',
      shortcut: 'Added from Mock Results'
    };
    setErrors(prev => [...prev, newError]);
    navigate('/errors');
  };

  const handleStart = (selectedId) => {
    if (selectedId === 'diagnosticMock') {
      handleStartMock();
    } else {
      handleStartSectional(selectedId);
    }
  };

  if (engine.phase === 'idle') {
    return (
      <div className="fade-in">
        <header style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 8 }}>Exam Simulator</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Practice under timed, realistic conditions.</p>
        </header>
        <ExamSetup onStart={handleStart} />
      </div>
    );
  }

  if (engine.phase === 'active') {
    return <ExamSession engine={engine} />;
  }

  if (engine.phase === 'completed') {
    return (
      <ExamResult
        result={engine.result}
        onReset={engine.reset}
        onGoToDashboard={() => navigate('/')}
        onLogError={handleLogError}
      />
    );
  }

  return null;
}
