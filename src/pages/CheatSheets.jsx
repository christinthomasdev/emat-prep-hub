import NotesPanel from '../components/NotesPanel/NotesPanel';

const cheatSheets = [
  {
    id: 'math_formulas',
    title: 'Quant Quick Formulas',
    content: `
      <ul>
        <li><strong>Speed =</strong> Distance / Time</li>
        <li><strong>Relative Speed (Opposite) =</strong> S1 + S2</li>
        <li><strong>Relative Speed (Same) =</strong> |S1 - S2|</li>
        <li><strong>Simple Interest =</strong> (P × R × T) / 100</li>
        <li><strong>Compound Interest =</strong> P(1 + R/100)^T - P</li>
        <li><strong>Permutations (nPr) =</strong> n! / (n-r)!</li>
        <li><strong>Combinations (nCr) =</strong> n! / (r!(n-r)!)</li>
      </ul>
    `
  },
  {
    id: 'logic_frameworks',
    title: 'DILR Frameworks',
    content: `
      <ul>
        <li><strong>Linear Arrangement:</strong> Draw blanks. Fix extreme positions first.</li>
        <li><strong>Circular Arrangement:</strong> Draw a circle with lines. Inward facing means Left is Clockwise.</li>
        <li><strong>Data Interpretation:</strong> Do NOT calculate exactly unless options are very close. Use approximations (e.g. 10% rules).</li>
      </ul>
    `
  },
  {
    id: 'verbal_rules',
    title: 'Verbal Grammar & RC',
    content: `
      <ul>
        <li><strong>Subject-Verb Agreement:</strong> 'Either...or', 'Neither...nor' follow the verb closest to the subject.</li>
        <li><strong>Reading Comprehension:</strong> Read the first and last paragraph carefully. Skim the middle for structure, not details.</li>
        <li><strong>Tone:</strong> Look for adjectives the author uses (e.g. 'unfortunately', 'clearly').</li>
      </ul>
    `
  }
];

export default function CheatSheets() {
  return (
    <div className="fade-in">
      <header style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 8 }}>Cheat Sheets</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Quick reference guides for last-minute revision.</p>
      </header>
      <div style={{ maxWidth: 800 }}>
        {cheatSheets.map(sheet => (
          <NotesPanel key={sheet.id} title={sheet.title} content={sheet.content} />
        ))}
      </div>
    </div>
  );
}
