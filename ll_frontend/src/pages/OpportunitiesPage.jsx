// getting data, handling load/error state, passing data to OpportunityList

import { useState, useEffect } from "react";

import { OpportunityList } from '../components/opportunities/OpportunityList';
import { OpportunityForm } from '../components/opportunities/OpportunityForm';
import { getOpportunities, createOpportunity } from '../api/opportunityApi';
import { getClients } from "../api/clientApi";

export const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCreateOpportunity = async (opportunityData) => {
    try {
      await createOpportunity(opportunityData)
      const updatedOpportunities = await getOpportunities();
      setOpportunities(updatedOpportunities);
    } catch (err) {
      console.error('Error creating opportunity:', err);
      setError('Failed to create opportunity');
    }
  };

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        setLoading(true);
        const data = await getOpportunities();
        setOpportunities(data);
      } catch (err) {
        setError(err.message || 'Failed to load opportunities');
      } finally {
        setLoading(false);
      }
    };

    const loadClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        console.error('Failed to load clients:', err);
      }
    };

    loadClients();
    loadOpportunities();
  }, []);

  if (loading) return <div>Loading opportunities...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <header className="page-header">
        <h1>LeadLedger CRM</h1>
      </header>
      <main className="opportunities-page">
        <h2>Opportunities</h2>
        <div className="opportunities-sub">
          <OpportunityForm onCreateOpportunity={handleCreateOpportunity} clients={clients} />
          <OpportunityList opportunities={opportunities} />
        </div>
      </main>
    </>
  );
}
