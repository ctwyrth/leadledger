// presentaggregate data for clients and opportunities
// eventually show recent activity, upcoming tasks, and key metrics
import { useState, useEffect } from 'react';
import { getClients } from '../api/clientApi';
import { getOpportunities } from '../api/opportunityApi';

export const DashboardPage = () => {
  const [clients, setClients] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  // calculate active clients and open opportunities
  const activeClients = clients.filter(c => c.status === 'active').length;
  const openOpportunities = opportunities.filter(o => !['won', 'lost', 'paused'].includes(o.stage)).length;
  
  // calculate pipeline value and conversion rate
  const pipelineValue = opportunities.reduce((total, opp) => {
    if (!['won', 'lost', 'paused'].includes(opp.stage)) {
      return total + (opp.value || 0);
    }
    return total;
  }, 0);
  const wonOpportunities = opportunities.filter(o => o.stage === 'won');
  const wonValue = wonOpportunities.reduce((total, opp) => total + (opp.value || 0), 0);
  const conversionRate = opportunities.length > 0 ? ((wonOpportunities.length / opportunities.length) * 100).toFixed(2) : '0.00';


  useEffect(() => {
    getClients().then(setClients);
    getOpportunities().then(setOpportunities);
  }, []);

  return (
    <>
      <main className="dashboard-page">
        <h2>Dashboard</h2>
        <div className="dashboard-sub">
          <div className="dashboard-row">
            <div className="card dashboard-card">
                <h3>Total Clients</h3>
                <p>{clients.length}</p>
            </div>
            <div className="card dashboard-card">
                <h3>Active Clients</h3>
                <p>{activeClients}</p>
            </div>
            <div className="card dashboard-card">
                <h3>Total Opportunities</h3>
                <p>{opportunities.length}</p>
            </div>
            <div className="card dashboard-card">
                <h3>Open Opportunities</h3>
                <p>{openOpportunities}</p>
            </div>
          </div>
          <div className="dashboard-row">
            <div className="card dashboard-card">
              <h3>Pipeline Value</h3>
              <p>{formatCurrency(pipelineValue)}</p>
            </div>
            <div className="card dashboard-card">
              <h3>Won Value</h3>
              <p>{formatCurrency(wonValue)}</p>
            </div>
            <div className="card dashboard-card">
              <h3>Conversion Rate</h3>
              <p>{conversionRate}%</p>
            </div>
          </div>
          {/* Future: Add recent activity, upcoming tasks, and key metrics */}
        </div>
      </main>
    </>
  );
};