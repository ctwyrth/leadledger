// displays a list of clients

export const ClientList = ({ clients }) => {
  if (!clients.length) {
    return <div>No clients found.</div>;
  }

  return (
    <section>
      {clients.map((client) => (
        <article key={client._id}>
          <h2>{client.name}</h2>
          <p>Type: {client.type}</p>
          <p>Status: {client.status}</p>
        </article>
      ))}
    </section>
  );
}
