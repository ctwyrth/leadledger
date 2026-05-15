// form to add an opportunity to the system

import { useState } from "react";

export const OpportunityForm = ({ onCreateOpportunity, clients }) => {
    const [formData, setFormData] = useState({
    title: '',
    client: clients.length ? clients[0]._id : '',
    value: '',
    stage: 'new'
  });

  const { title, client, value, stage } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateOpportunity(formData);
    setFormData({ title: '', client: clients.length ? clients[0]._id : '', value: '', stage: 'new' }); // reset form
  };

  return (
    <section className="card opportunity-form-card">
      <h2>Add New Opportunity</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Title:</label>
          <input name="title" value={title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Client:</label>
          <select name="client" id="client" value={client} onChange={(e) => setFormData({...formData, client: e.target.value})}>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Value:</label>
          <input name="value" type="number" value={value} onChange={(e) => setFormData({...formData, value: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Stage:</label>
          <select name="stage" id="stage" value={stage} onChange={(e) => setFormData({...formData, stage: e.target.value})}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <button type="submit" className="button button-primary">Add Opportunity</button>
      </form>
    </section>
  );
};
