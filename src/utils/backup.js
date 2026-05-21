export function exportBackup(studyLogs, mockScores, errors, piDrafts) {
  const plannerChecks = JSON.parse(localStorage.getItem('emat_planner_checks')) || {};
  const backupData = {
    studyLogs,
    mockScores,
    errors,
    piDrafts,
    plannerChecks
  };

  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `emat_prep_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importBackup(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const backup = JSON.parse(evt.target.result);
        resolve(backup);
      } catch (err) {
        reject(new Error('Invalid backup file format.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}
