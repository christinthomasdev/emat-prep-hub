import { useState } from 'react';
import styles from './NotesPanel.module.css';

export default function NotesPanel({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.panel}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>}
    </div>
  );
}
