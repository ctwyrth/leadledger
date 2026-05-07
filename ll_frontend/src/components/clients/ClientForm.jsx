// basic form component to enter new client information

import { useState } from "react";

export const ClientForm = ({ onCreateClient }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'individual',
    status: 'lead'
  });

  const { name, type, status } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateClient(formData);
    setFormData({ name: '', type: 'individual', status: 'lead' }); // reset form
  };

  return (
    <section>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label>Type:</label>
          <select name="type" id="type" value={type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" id="status" value={status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="lead">Lead</option>
            <option value="customer">Customer</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Add Client</button>
      </form>
    </section>
  );
};
