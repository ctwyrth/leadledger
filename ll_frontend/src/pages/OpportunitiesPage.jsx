// getting data, handling load/error state, passing data to OpportunityList

import { useState, useEffect } from "react";

import { OpportunityList } from '../components/opportunities/OpportunityList';
import { OpportunityForm } from '../components/opportunities/OpportunityForm';
import { getOpportunities, createOpportunity, deleteOpportunity, updateOpportunity } from '../api/opportunityApi';
import { getClients } from "../api/clientApi";

export const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOpportunity, setEditingOpportunity] = useState(null);

  const handleCreateOpportunity = (opportunityData) => {
    createOpportunity(opportunityData)
      .then(newOpportunity => {
        setOpportunities(prevOpportunities => [...prevOpportunities, newOpportunity]);
      })
      .catch(err => {
        console.error('Error creating opportunity:', err);
        setError('Failed to create opportunity');
      });
  };

  const handleDeleteOpportunity = (opportunityId) => {
    deleteOpportunity(opportunityId)
      .then(data => {
        setOpportunities(prevOpportunities => prevOpportunities.filter(opportunity => opportunity._id !== opportunityId));
      })
      .catch(err => {
        console.error('Error deleting opportunity:', err);
        setError('Failed to delete opportunity');
      });
  };

  const handleEditOpportunity = (opportunity) => {
    setEditingOpportunity(opportunity);
  };

  const handleUpdateOpportunity = (opportunityId, opportunityData) => {
    updateOpportunity(opportunityId, opportunityData)
      .then(() => {
        return getOpportunities();
      })
      .then(updatedOpportunities => {
        setOpportunities(updatedOpportunities);
        setEditingOpportunity(null);
      })
      .catch(err => {
        console.error('Error updating opportunity:', err);
        setError('Failed to update opportunity');
      });
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
      <main className="opportunities-page">
        <h2>Opportunities</h2>
        <div className="opportunities-sub">
          <OpportunityForm onCreateOpportunity={handleCreateOpportunity} onUpdateOpportunity={handleUpdateOpportunity} editingOpportunity={editingOpportunity} clients={clients} />
          <OpportunityList opportunities={opportunities} onDeleteOpportunity={handleDeleteOpportunity} onEditOpportunity={handleEditOpportunity} />
        </div>
      </main>
    </>
  );
}
