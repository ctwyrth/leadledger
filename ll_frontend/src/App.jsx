// import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { ClientDetails } from './pages/ClientDetails';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { NotesPage } from './pages/NotesPage';

export const App = () => {
  // const [activePage, setActivePage] = useState('dashboard');

  return (
    <>
      <header className="app-header">
        <h1>LeadLedger CRM</h1>

        <nav>
          <NavLink to="/" className={({ isActive }) => `nav-button ${isActive ? 'active' : 'inactive'}`}>Dashboard</NavLink>
          <NavLink to="/clients" className={({ isActive }) => `nav-button ${isActive ? 'active' : 'inactive'}`}>Clients</NavLink>
          <NavLink to="/opportunities" className={({ isActive }) => `nav-button ${isActive ? 'active' : 'inactive'}`}>Opportunities</NavLink>
          <NavLink to="/notes" className={({ isActive }) => `nav-button ${isActive ? 'active' : 'inactive'}`}>Notes</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/:clientId" element={<ClientDetails />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </>
  );
};
