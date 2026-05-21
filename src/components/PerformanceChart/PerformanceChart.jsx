import { useRef, useEffect } from 'react';
import styles from './PerformanceChart.module.css';

export default function PerformanceChart({ mockScores }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (mockScores.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 40px;">No mock data available. Log a score to view.</div>`;
      return;
    }

    const width = container.clientWidth || 500;
    const height = 240;
    const pL = 40, pB = 40, pT = 20, pR = 20;
    const chartW = width - pL - pR;
    const chartH = height - pT - pB;

    const points = mockScores.map((mock, index) => {
      const ratio = mock.score / mock.maxScore;
      const x = pL + (index / Math.max(1, mockScores.length - 1)) * chartW;
      const y = pT + chartH - ratio * chartH;
      return { x, y, name: mock.name, percentage: Math.round(ratio * 100) };
    });

    let svg = `<svg width="${width}" height="${height}" style="overflow: visible;">`;
    svg += `<defs><linearGradient id="blue-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="var(--accent-blue)" /><stop offset="100%" stop-color="var(--accent-cyan)" /></linearGradient></defs>`;

    [0, 25, 50, 75, 100].forEach(level => {
      const y = pT + chartH - (level / 100) * chartH;
      svg += `<line x1="${pL}" y1="${y}" x2="${width - pR}" y2="${y}" stroke="rgba(255,255,255,0.04)" stroke-width="1" />`;
      svg += `<text x="${pL - 10}" y="${y + 4}" fill="var(--text-muted)" font-size="10" text-anchor="end">${level}%</text>`;
    });

    if (points.length > 1) {
      let pathD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) pathD += ` L ${points[i].x} ${points[i].y}`;
      svg += `<path d="${pathD}" fill="none" stroke="url(#blue-grad)" stroke-width="3" stroke-linecap="round" />`;
    }

    points.forEach(pt => {
      svg += `<circle cx="${pt.x}" cy="${pt.y}" r="6" fill="var(--accent-cyan)" stroke="var(--bg-secondary)" stroke-width="2" />`;
      svg += `<text x="${pt.x}" y="${pt.y - 12}" fill="var(--text-primary)" font-size="11" font-weight="700" text-anchor="middle">${pt.percentage}%</text>`;
      svg += `<text x="${pt.x}" y="${height - pB + 18}" fill="var(--text-secondary)" font-size="10" text-anchor="middle">${pt.name}</text>`;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
  }, [mockScores]);

  return <div ref={containerRef} className={styles.container}></div>;
}
