// basic form component to enter new client information
import { useState, useEffect } from "react";

export const ClientForm = ({ onCreateClient, onUpdateClient, editingClient }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'individual',
    status: 'lead'
  });

  const { name, type, status } = formData;

  useEffect(() => {
    if (editingClient) {
      setFormData(editingClient);
    }
  }, [editingClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      onUpdateClient(editingClient._id, formData);
    } else {
      onCreateClient(formData);
    }
    setFormData({ name: '', type: 'individual', status: 'lead' }); // reset form
  };

  return (
    <section className="card client-form-card">
      <h2>{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select name="type" id="type" value={type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select name="status" id="status" value={status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="lost">Lost</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button type="submit" className="button button-primary">{editingClient ? 'Edit Client' : 'Add New Client'}</button>
      </form>
    </section>
  );
};
