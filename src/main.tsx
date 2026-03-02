import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import CycloneApp from './CycloneApp.tsx';
import MRCSApp from './MRCSApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cyclonex" element={<CycloneApp />} />
        <Route path="/uor_req_portal" element={<MRCSApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
