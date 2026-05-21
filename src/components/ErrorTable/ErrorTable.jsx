import styles from './ErrorTable.module.css';
import btnStyles from '../../styles/buttons.module.css';
import badgeStyles from '../../styles/badges.module.css';

export default function ErrorTable({ errors, onDelete }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}><div className={styles.panelTitle}>Active Error Records</div></div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead><tr><th>Section</th><th>Topic</th><th>Category</th><th>Takeaway / Shortcut</th><th>Action</th></tr></thead>
          <tbody>
            {errors.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Your error log is clean! Gratefully empty.</td></tr>
            ) : errors.map(err => (
              <tr key={err.id}>
                <td><span className={err.section === 'QA' ? badgeStyles.badgeQa : err.section === 'DILR' ? badgeStyles.badgeDilr : badgeStyles.badgeVa}>{err.section}</span></td>
                <td><strong>{err.topic}</strong></td>
                <td className={styles.catCell}>{err.category}</td>
                <td><em style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>"{err.shortcut}"</em></td>
                <td>
                  <button className={btnStyles.btnSecondary} style={{ padding: '4px 8px', fontSize: '0.75rem' }} onClick={() => onDelete(err.id)}>
                    <i className="far fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
