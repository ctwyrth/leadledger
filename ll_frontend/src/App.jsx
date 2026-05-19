import { useState } from 'react';

import { ClientsPage } from './pages/ClientsPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';

export const App = () => {
  const [activePage, setActivePage] = useState('clients');

  return (
    <>
      <header className="page-header">
        <h1>LeadLedger CRM</h1>

        <nav>
          <button className={`nav-button ${activePage === 'clients' ? 'active' : 'inactive'}`} onClick={() => setActivePage('clients')}>Clients</button>
          <button className={`nav-button ${activePage === 'opportunities' ? 'active' : 'inactive'}`} onClick={() => setActivePage('opportunities')}>Opportunities</button>
        </nav>
      </header>
      {activePage === 'clients' && <ClientsPage />}
      {activePage === 'opportunities' && <OpportunitiesPage />}
    </>
  );
};
