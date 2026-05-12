// getting data, handling load/error state, passing data to ClientList

import { useState, useEffect } from "react";
import { ClientList } from '../components/clients/ClientList';
import { ClientForm } from '../components/clients/ClientForm';
import { getClients, createClient } from '../api/clientApi';

export const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <header className="page-header">
        <h1>LeadLedger CRM</h1>
      </header>
      <main className="clients-page">
        <h2>Clients</h2>
        <div className="clients-sub">
          <ClientForm onCreateClient={handleCreateClient} />
          <ClientList clients={clients} />
        </div>
      </main>
    </>
  );
}
