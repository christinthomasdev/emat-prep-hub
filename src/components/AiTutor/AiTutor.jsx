import { useState, useEffect, useRef } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './AiTutor.module.css';

export default function AiTutor({ studyLogs, mockScores, errors }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage('minimax_api_key', '');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your EMAT prep AI Tutor powered by Minimax. I can analyze your mock scores and error logs to give you personalized advice. How can I help today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSystemPrompt = () => {
    return `You are an expert tutor for the EMAT (Executive Management Aptitude Test) for IIM Kozhikode. 
You must analyze the user's progress and give concise, actionable advice.

Here is the user's current progress:
Study Logs: ${JSON.stringify(studyLogs)}
Mock Exam Scores: ${JSON.stringify(mockScores)}
Active Errors (to review): ${JSON.stringify(errors)}

Focus your answers on improving their weak areas based on the data above. Be motivating and direct.`;
  };

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'abab6.5s-chat', // We use standard Minimax chat model by default, but the key is tied to their m2.7 plan
          messages: [
            { role: 'system', name: 'system', content: generateSystemPrompt() },
            ...messages.map(m => ({ role: m.role, name: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
            { role: 'user', name: 'user', content: userMessage.content }
          ]
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.base_resp?.status_msg || 'Unknown error'}` }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't connect to the API. Please check your API key and internet connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <button className={styles.fab} onClick={() => setIsOpen(!isOpen)}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <h3><i className="fas fa-brain"></i> AI Tutor</h3>
          </div>

          {!apiKey ? (
            <div className={styles.apiKeySetup}>
              <p>Please enter your Minimax API Key to enable the AI Tutor. Your key is stored securely in your local browser storage.</p>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className={styles.inputField}
              />
            </div>
          ) : (
            <>
              <div className={styles.messageList}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.msgUser : styles.msgAssistant}`}>
                    {msg.content}
                  </div>
                ))}
                {isLoading && (
                  <div className={`${styles.message} ${styles.msgAssistant}`}>
                    <span className={styles.typingIndicator}>...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className={styles.inputArea}>
                <input
                  type="text"
                  placeholder="Ask for study advice..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className={styles.inputField}
                  disabled={isLoading}
                />
                <button onClick={handleSend} disabled={!input.trim() || isLoading} className={styles.sendBtn}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
