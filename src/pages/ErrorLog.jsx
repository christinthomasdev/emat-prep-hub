import ErrorTable from '../components/ErrorTable/ErrorTable';
import ErrorForm from '../components/ErrorForm/ErrorForm';

export default function ErrorLog({ errors, setErrors }) {
  const handleDelete = (id) => {
    setErrors(prev => prev.filter(e => e.id !== id));
  };

  const handleAdd = (newError) => {
    setErrors(prev => [...prev, newError]);
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: 8 }}>Error Log</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Track mistakes to ensure you never make them twice.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
        <ErrorForm onSubmit={handleAdd} />
        <ErrorTable errors={errors} onDelete={handleDelete} />
      </div>
    </div>
  );
}
