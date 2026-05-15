// displays a list of opportunities

export const OpportunityList = ({ opportunities }) => {
  if (!opportunities.length) {
    return <div>No opportunities found.</div>;
  }

  return (
    <section className="opportunity-layout">
      {opportunities.map((opportunity) => (
        <article key={opportunity._id} className="card opportunity-card">
          <h2>{opportunity.title}</h2>
          <p>Client: {opportunity.client.name}</p>
          <p>Value: ${opportunity.value}</p>
          <p>Stage: {opportunity.stage}</p>
        </article>
      ))}
    </section>
  );
}