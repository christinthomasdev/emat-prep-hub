import { useState, useEffect } from 'react';
import PiDeck from '../components/PiDeck/PiDeck';
import PiWorkspace from '../components/PiWorkspace/PiWorkspace';

export default function PiCorner({ piDrafts, setPiDrafts }) {
  const [activeCat, setActiveCat] = useState(null);
  const [activeQ, setActiveQ] = useState(null);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (activeQ) setDraft(piDrafts[activeQ.id] || '');
  }, [activeQ, piDrafts]);

  const handleDraftChange = (val) => {
    setDraft(val);
  };

  const handleSave = () => {
    if (activeQ) {
      setPiDrafts(prev => ({ ...prev, [activeQ.id]: draft }));
    }
  };

  // Auto-save on unmount or question change
  useEffect(() => {
    return () => handleSave();
  }, [activeQ, draft]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: 24, flexShrink: 0 }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 8 }}>Personal Interview Corner</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Practice your delivery. Aim for structured 60-second answers.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24, flexGrow: 1, minHeight: 0 }}>
        <PiDeck
          activeId={activeQ?.id}
          onSelect={(cat, q) => { handleSave(); setActiveCat(cat); setActiveQ(q); }}
        />
        <PiWorkspace
          question={activeQ}
          category={activeCat}
          draft={draft}
          onDraftChange={handleDraftChange}
          onSave={() => { handleSave(); alert('Draft saved!'); }}
        />
      </div>
    </div>
  );
}
