// displays a list of clients

export const ClientList = ({ clients }) => {
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
        </article>
      ))}
    </section>
  );
}
