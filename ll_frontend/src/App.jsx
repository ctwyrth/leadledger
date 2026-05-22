import { useState } from 'react';

import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';

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
        </nav>
      </header>
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'clients' && <ClientsPage />}
      {activePage === 'opportunities' && <OpportunitiesPage />}
    </>
  );
};
