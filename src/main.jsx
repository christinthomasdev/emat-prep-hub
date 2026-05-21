import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
import './styles/globals.css';
import App from './App';
import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';
import Tracker from './pages/Tracker';
import ErrorLog from './pages/ErrorLog';
import PiCorner from './pages/PiCorner';
import CheatSheets from './pages/CheatSheets';
import AiGuidedPractice from './pages/AiGuidedPractice';

function DashboardPage() {
  const { studyLogs, mockScores, errors } = useOutletContext();
  return <Dashboard studyLogs={studyLogs} mockScores={mockScores} errors={errors} />;
}

function SimulatorPage() {
  const { mockScores, setMockScores, errors, setErrors } = useOutletContext();
  return <Simulator mockScores={mockScores} setMockScores={setMockScores} errors={errors} setErrors={setErrors} />;
}

function TrackerPage() {
  const { setStudyLogs } = useOutletContext();
  return <Tracker onLog={(log) => setStudyLogs(prev => [...prev, log])} />;
}

function ErrorLogPage() {
  const { errors, setErrors } = useOutletContext();
  return <ErrorLog errors={errors} setErrors={setErrors} />;
}

function PiCornerPage() {
  const { piDrafts, setPiDrafts } = useOutletContext();
  return <PiCorner piDrafts={piDrafts} setPiDrafts={setPiDrafts} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<DashboardPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="tracker" element={<TrackerPage />} />
          <Route path="errors" element={<ErrorLogPage />} />
          <Route path="pi" element={<PiCornerPage />} />
          <Route path="notes" element={<CheatSheets />} />
          <Route path="guided-practice" element={<AiGuidedPractice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
