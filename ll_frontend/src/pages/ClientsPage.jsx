// getting data, handling load/error state, passing data to ClientList

import { useState, useEffect } from "react";
import { ClientList } from '../components/clients/ClientList';
import { ClientForm } from '../components/clients/ClientForm';
import { getClients, createClient, deleteClient, updateClient } from '../api/clientApi';

export const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

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

  return (
    <>
      <main className="clients-page">
        <h2>Clients</h2>
        <div className="clients-sub">
          <ClientForm onCreateClient={handleCreateClient} onUpdateClient={handleUpdateClient} editingClient={editingClient} />
          <ClientList clients={clients} onDeleteClient={handleDeleteClient} onEditClient={handleEditClient} />
        </div>
      </main>
    </>
  );
}
