import { useState, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import EMAT_QUESTION_DATABASE from '../data/questions';
import styles from './AiGuidedPractice.module.css';
import btnStyles from '../styles/buttons.module.css';

export default function AiGuidedPractice() {
  const [apiKey] = useLocalStorage('minimax_api_key', '');
  const [section, setSection] = useState('QA');
  const [topic, setTopic] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Extract all topics from the database for the dropdowns
  const allQuestions = useMemo(() => Object.values(EMAT_QUESTION_DATABASE).flat(), []);
  
  const topicsBySection = useMemo(() => {
    const map = { QA: new Set(), DILR: new Set(), VA: new Set() };
    allQuestions.forEach(q => {
      if (map[q.section]) map[q.section].add(q.topic);
    });
    return {
      QA: Array.from(map.QA).sort(),
      DILR: Array.from(map.DILR).sort(),
      VA: Array.from(map.VA).sort()
    };
  }, [allQuestions]);

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('Please set your Minimax API Key in the AI Tutor floating widget first.');
      return;
    }
    
    // Pick a random sample question from the selected topic
    const validSamples = allQuestions.filter(q => q.section === section && q.topic === topic);
    if (validSamples.length === 0) {
      alert('No sample questions found for this topic.');
      return;
    }
    const sample = validSamples[Math.floor(Math.random() * validSamples.length)];

    setIsGenerating(true);
    setActiveQuestion(null);
    setSelectedOption(null);
    setShowFeedback(false);

    const prompt = `You are an expert tutor for the EMAT exam (MBA entrance).
I have this sample question from the topic "${topic}":
Question: ${sample.question}
Options: ${JSON.stringify(sample.options)}

Generate a BRAND NEW, completely different question that tests the exact same logical or mathematical concepts. 
Provide 4 options.
Provide a strategic explanation on how to solve it, written as if you are a tutor guiding the student.

You MUST respond with ONLY a valid JSON object. Do not include markdown code blocks, just the raw JSON.
Format:
{
  "question": "The generated question text here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0, // integer 0-3
  "explanation": "Your strategic step-by-step guide and explanation here"
}`;

    try {
      const response = await fetch('https://api.minimax.io/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'MiniMax-M2.7',
          messages: [
            { role: 'user', name: 'user', content: prompt }
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        let content = data.choices[0].message.content;
        // Clean up potential markdown codeblocks if the AI still returned them
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();
        
        try {
          const parsed = JSON.parse(content);
          setActiveQuestion(parsed);
        } catch (e) {
          console.error('JSON Parse Error:', content);
          alert('The AI returned an invalid format. Please try generating again.');
        }
      } else {
        alert(`API Error: ${data.base_resp?.status_msg || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error connecting to the AI. Check your console.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (idx) => {
    if (showFeedback) return; // Prevent changing after submission
    setSelectedOption(idx);
    setShowFeedback(true);
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 8 }}>AI-Guided Practice</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Generate dynamic questions based on official EMAT samples and get instant strategic feedback.
        </p>
      </header>

      <div className={styles.container}>
        {!activeQuestion && !isGenerating && (
          <div className={styles.setupCard}>
            <h3>Configure Practice Session</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Select an area you want to drill. The AI will generate a novel question matching the difficulty of the official exam.
            </p>

            <div className={styles.topicSelector}>
              <div className={styles.sectionGroup}>
                <label>Section</label>
                <select 
                  className={styles.dropdown} 
                  value={section} 
                  onChange={(e) => {
                    setSection(e.target.value);
                    setTopic(topicsBySection[e.target.value][0] || '');
                  }}
                >
                  <option value="QA">Quantitative Aptitude (QA)</option>
                  <option value="DILR">Data Interpretation & Logical Reasoning (DILR)</option>
                  <option value="VA">Verbal Ability (VA)</option>
                </select>
              </div>

              <div className={styles.sectionGroup}>
                <label>Topic</label>
                <select 
                  className={styles.dropdown} 
                  value={topic || topicsBySection[section][0]} 
                  onChange={(e) => setTopic(e.target.value)}
                >
                  {topicsBySection[section].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              className={styles.generateBtn} 
              onClick={handleGenerate}
              disabled={!apiKey || !topic}
            >
              <i className="fas fa-magic"></i> Generate Question
            </button>
            {!apiKey && (
              <p style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '1rem' }}>
                <i className="fas fa-exclamation-circle"></i> Please set your Minimax API Key in the AI Tutor floating widget bottom right.
              </p>
            )}
          </div>
        )}

        {isGenerating && (
          <div className={styles.loader}>
            <i className={`fas fa-circle-notch ${styles.spinner}`}></i>
            <h3>Crafting a unique question...</h3>
            <p>Analyzing official patterns for {topic}</p>
          </div>
        )}

        {activeQuestion && (
          <div className={styles.questionCard}>
            <div className={styles.questionText}>{activeQuestion.question}</div>
            
            <div className={styles.optionsList}>
              {activeQuestion.options.map((opt, idx) => {
                let boxClass = styles.optionBox;
                if (showFeedback) {
                  if (idx === activeQuestion.correctIndex) boxClass += ` ${styles.optionBoxCorrect}`;
                  else if (idx === selectedOption) boxClass += ` ${styles.optionBoxWrong}`;
                  boxClass += ' disabled';
                } else if (selectedOption === idx) {
                  boxClass += ` ${styles.optionBoxSelected}`;
                }

                return (
                  <div 
                    key={idx} 
                    className={boxClass}
                    onClick={() => handleSelectOption(idx)}
                  >
                    <div className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</div>
                    <div>{opt}</div>
                  </div>
                );
              })}
            </div>

            {showFeedback && (
              <div className={styles.feedbackPanel}>
                <h3>
                  {selectedOption === activeQuestion.correctIndex ? (
                    <><i className="fas fa-check-circle" style={{color: '#00ff64'}}></i> Excellent Job!</>
                  ) : (
                    <><i className="fas fa-times-circle" style={{color: '#ff3232'}}></i> Not quite right.</>
                  )}
                </h3>
                <div className={styles.feedbackContent}>
                  <strong>Tutor's Strategy Guide:</strong><br/><br/>
                  {activeQuestion.explanation.split('\n').map((line, i) => <p key={i} style={{marginBottom: '0.5rem'}}>{line}</p>)}
                </div>
                
                <button 
                  className={btnStyles.btnSecondary} 
                  style={{ marginTop: '1.5rem' }}
                  onClick={() => {
                    setActiveQuestion(null);
                    setShowFeedback(false);
                  }}
                >
                  <i className="fas fa-arrow-left"></i> Practice Another Topic
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
