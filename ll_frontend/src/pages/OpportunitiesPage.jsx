// getting data, handling load/error state, passing data to OpportunityList

import { useState, useEffect } from "react";

import { OpportunityList } from '../components/opportunities/OpportunityList';
import { OpportunityForm } from '../components/opportunities/OpportunityForm';
import { getOpportunities, createOpportunity, deleteOpportunity, updateOpportunity } from '../api/opportunityApi';
import { getClients } from "../api/clientApi";

export const OpportunitiesPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [viewingOpportunityId, setViewingOpportunityId] = useState(null);
  const [clients, setClients] = useState([]);
  //search variables
  const [opportunitySearch, setOpportunitySearch] = useState('');
  const [opportunityStageFilter, setOpportunityStageFilter] = useState('all');
  const [opportunityPriorityFilter, setOpportunityPriorityFilter] = useState('all');
  const [opportunitySort, setOpportunitySort] = useState('client-asc');

  const handleCreateOpportunity = (opportunityData) => {
    createOpportunity(opportunityData)
      .then(() => {
        return getOpportunities();
      })
      .then(updatedOpportunities => {
        setOpportunities(updatedOpportunities);
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

  // search views / derived opportunities lists
  const getClientName = (opportunity) => opportunity.client?.name || '';

  const displayedOpportunities = [...opportunities]
    .filter(opp => {
      const search = opportunitySearch.toLowerCase()
      const title = (opp.title || '').toLowerCase();
      const clientName = (opp.client?.name || '').toLowerCase();

      return title.includes(search) || clientName.includes(search);
    })
    .filter(opp => {
      if (opportunityStageFilter === 'all') return true;
      return opp.stage === opportunityStageFilter;
    })
    .filter(opp => {
        if (opportunityPriorityFilter === 'all') return true;
        return opp.priority === opportunityPriorityFilter;
    })
    .sort((a, b) => {
      const clientA = getClientName(a).toLowerCase();
      const clientB = getClientName(b).toLowerCase();

      if (opportunitySort === 'client-asc') return clientA.localeCompare(clientB);
      if (opportunitySort === 'client-desc') return clientB.localeCompare(clientA);
      if (opportunitySort === 'value-asc') return a.value - b.value;
      if (opportunitySort === 'value-desc') return b.value - a.value;
      if (opportunitySort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (opportunitySort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);

      return 0;
    });


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
          <div className="opportunities-list">
            <section className="list-controls">
              <input type="text" placeholder="Search opportunities..." value={opportunitySearch} onChange={(e) => setOpportunitySearch(e.target.value)} />

              <select value={opportunityStageFilter} onChange={(e) => setOpportunityStageFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="proposal">Proposal</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
                <option value="paused">Paused</option>
              </select>

              <select value={opportunityPriorityFilter} onChange={(e) => setOpportunityPriorityFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <select value={opportunitySort} onChange={(e) => setOpportunitySort(e.target.value)}>
                <option value="client-asc">Client (A-Z)</option>
                <option value="client-desc">Client (Z-A)</option>
                <option value="value-asc">Value (Low to High)</option>
                <option value="value-desc">Value (High to Low)</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </section>
            <OpportunityList opportunities={displayedOpportunities} onDeleteOpportunity={handleDeleteOpportunity} onEditOpportunity={handleEditOpportunity} />
          </div>
        </div>
      </main>
    </>
  );
}
