// displays a list of opportunities
export const OpportunityList = ({ opportunities, onDeleteOpportunity, onEditOpportunity }) => {
  if (!opportunities.length) {
    return <div>No opportunities found.</div>;
  }

  return (
    <section className="opportunity-layout">
      {opportunities.map((opportunity) => (
        <article key={opportunity._id} className="card opportunity-card">
          <h2>{opportunity.title}</h2>
          <p>Client: {opportunity.client?.name || 'Unknown client'}</p>
          <p>Value: ${opportunity.value}</p>
          <p>Stage: {opportunity.stage}</p>
          <div className="card-nav">
            <button className="button edit" onClick={() => onEditOpportunity(opportunity)}>Edit</button>
            <button className="button delete" onClick={() => onDeleteOpportunity(opportunity._id)}>Delete</button>
          </div>
        </article>
      ))}
    </section>
  );
}