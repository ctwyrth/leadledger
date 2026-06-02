// getting data, handling load/error state, passing data to ClientList

import { useState, useEffect } from "react";
import { ClientList } from '../components/clients/ClientList';
import { ClientForm } from '../components/clients/ClientForm';
import { ClientDetails } from './ClientDetails';
import { getClients, createClient, deleteClient, updateClient } from '../api/clientApi';

export const ClientsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClientId, setViewingClientId] = useState(null);
  // search variables
  const [clientSearch, setClientSearch] = useState('');
  const [clientStatusFilter, setClientStatusFilter] = useState('all');
  const [clientSort, setClientSort] = useState('name-asc');

  // click handlers for client actions
  const handleViewClient = (clientId) => {
    setViewingClientId(clientId);
  };

  const handleBackToClients = () => {
    setViewingClientId(null);
  };

  const handleCreateClient = (clientData) => {
    createClient(clientData)
      .then(newClient => {
        setClients(prevClients => [...prevClients, newClient]);
      })
      .catch(err => {
        console.error('Error creating client:', err);
        setError('Failed to create client');
      });
  };

  const handleDeleteClient = (clientId) => {
    deleteClient(clientId)
      .then(data => {
        setClients(prevClients => prevClients.filter(client => client._id !== clientId));
      })
      .catch(err => {
        console.error('Error deleting client:', err);
        setError('Failed to delete client');
      });
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
  };

  const handleUpdateClient = (clientId, clientData) => {
    updateClient(clientId, clientData)
      .then(updatedClient => {
        setClients(prevClients => prevClients.map(client => client._id === clientId ? updatedClient : client));
        setEditingClient(null);
      })
      .catch(err => {
        console.error('Error updating client:', err);
        setError('Failed to update client');
      });
  };

  // search views / derived client lists
  const displayedClients = [...clients]
    .filter(client => {
      const search = clientSearch.toLowerCase();
      const name = (client.name || '').toLowerCase();

      return name.includes(search);
    })
    .filter(client => {
      if (clientStatusFilter === 'all') return true;

      return client.status === clientStatusFilter;
    })
    .sort((a, b) => {
      if (clientSort === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (clientSort === 'name-desc') {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError(err.message || 'Failed to load clients');
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, []);

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>{error}</div>;

  if (viewingClientId) {
    return <ClientDetails clientId={viewingClientId} onBack={handleBackToClients} />;
  }

  return (
    <>
      <main className="clients-page">
        <h2>Clients</h2>
        <div className="clients-sub">
          <ClientForm onCreateClient={handleCreateClient} onUpdateClient={handleUpdateClient} editingClient={editingClient} />
          <div className="clients-list">
            <section className="list-controls">
              <input type="text" placeholder="Search clients..." value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />

              <select value={clientStatusFilter} onChange={(e) => setClientStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="lost">Lost</option>
                <option value="archived">Archived</option>
              </select>

              <select value={clientSort} onChange={(e) => setClientSort(e.target.value)}>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
            </section>
            <ClientList clients={displayedClients} onDeleteClient={handleDeleteClient} onEditClient={handleEditClient} onViewClient={handleViewClient} />
          </div>
        </div>
      </main>
    </>
  );
}
