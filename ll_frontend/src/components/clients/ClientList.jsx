// displays a list of clients
export const ClientList = ({ clients, onDeleteClient, onEditClient, onViewClient }) => {
  if (!clients.length) {
    return <div>No clients found.</div>;
  }

  return (
    <section className="client-layout">
      {clients.map((client) => (
        <article key={client._id} className="card client-card">
          <h2>{client.name}</h2>
          <p>Type: {client.type}</p>
          <span className={`status-badge status-${client.status}`}>Status: {client.status}</span>
          <div className="card-nav">
            <button className="button view" onClick={() => onViewClient(client._id)}>View</button>
            <button className="button edit" onClick={() => onEditClient(client)}>Edit</button>
            <button className="button delete" onClick={() => onDeleteClient(client._id)}>Delete</button>
          </div>
        </article>
      ))}
    </section>
  );
}
