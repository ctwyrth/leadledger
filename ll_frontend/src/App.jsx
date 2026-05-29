import { useState } from 'react';

import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { NotesPage } from './pages/NotesPage';

export const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <>
      <header className="app-header">
        <h1>LeadLedger CRM</h1>

        <nav>
          <button type="button" className={`nav-button ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')}>Dashboard</button>
          <button type="button" className={`nav-button ${activePage === 'clients' ? 'active' : ''}`} onClick={() => setActivePage('clients')}>Clients</button>
          <button type="button" className={`nav-button ${activePage === 'opportunities' ? 'active' : ''}`} onClick={() => setActivePage('opportunities')}>Opportunities</button>
          <button type="button" className={`nav-button ${activePage === 'notes' ? 'active' : ''}`} onClick={() => setActivePage('notes')}>Notes</button>
        </nav>
      </header>
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'clients' && <ClientsPage />}
      {activePage === 'opportunities' && <OpportunitiesPage />}
      {activePage === 'notes' && <NotesPage />}
    </>
  );
};
