// gather and display client details, including associated opportunities and notes
import { useEffect, useState } from 'react';
import { getClientById, getClientOpportunities, getClientNotes } from '../api/clientApi';

export const ClientDetails = ({ clientId, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [client, setClient] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        setLoading(true);

        const clientData = await getClientById(clientId);
        setClient(clientData);

        const opportunitiesData = await getClientOpportunities(clientId);
        setOpportunities(opportunitiesData);

        const notesData = await getClientNotes(clientId);
        setNotes(notesData);

      } catch (error) {
        setError(error.message || 'Error fetching client details...');

      } finally {
        setLoading(false);

      }
    };

    fetchClientDetails();
  }, [clientId]);

  if (loading) return <div>Loading client details...</div>;
  if (error) return <div>{error}</div>;
  if (!client) return <div>Client not found.</div>;

  return (
    <section>
      <h1>{client.name}</h1>
      <p>Email: {client.email}</p>
      <p>Phone: {client.phone}</p>
      <p>Website: {client.website}</p>
      <p>Source: {client.source}</p>
      <p>Status: {client.status}</p>
      <p>Notes: {client.notes}</p>

      <h2>Opportunities</h2>
      {opportunities.length === 0 ? (
        <p>No opportunities found for this client.</p>
      ) : (
        <ul>
          {opportunities.map((opp) => (
            <li key={opp._id}>{opp.title} - {opp.stage}</li>
          ))}
        </ul>
      )}

      <h2>Notes</h2>
      {notes.length === 0 ? (
        <p>No notes found for this client.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <>
              <li key={note._id} >{note.body} - {new Date(note.createdAt).toLocaleDateString()}</li>
            </>
          ))}
        </ul>
      )}
      <button onClick={onBack}>Back to Clients</button>
    </section>
  );
};

export default ClientDetails;