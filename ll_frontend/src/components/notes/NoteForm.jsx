// displays the form for entering or editing a note
import React, { useState, useEffect } from 'react';
import { getClients } from '../../api/clientApi';
import { getOpportunities } from '../../api/opportunityApi';

export const NoteForm = ({ onCreateNote, onUpdateNote, editingNote, clients, opportunities }) => {
  const [formData, setFormData] = useState({
    client: '',
    opportunity: '',
    body: '',
    type: 'general'
  });

  const { client, opportunity, body, type } = formData;

  const filteredOpportunities = opportunities.filter(opportunity => {
    const opportunityClientId = opportunity.client?._id || opportunity.client;

    return opportunityClientId === formData.client;
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        client: editingNote.client?._id || editingNote.client || '',
        opportunity: editingNote.opportunity?._id || editingNote.opportunity || '',
        body: editingNote.body || '',
        type: editingNote.type || 'general'
      });
    }

    if (!editingNote && clients.length && !formData.client) {
      setFormData(prevData => ({
        ...prevData,
        client: ''
      }));
    }
  }, [ clients, editingNote, formData.client ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client) {
      alert('Please select a client for this note.');
      return;
    }

    if (editingNote) {
      console.log('Updating note:', editingNote._id, formData);
      onUpdateNote(editingNote._id, formData);
    } else {
      console.log('Creating note:', formData);
      onCreateNote(formData);
    }

    setFormData({ client: '', opportunity: '', body: '', type: 'general' }); // reset form
  };

  const onCancel = () => {
    setFormData({ client: '', opportunity: '', body: '', type: 'general' }); // reset form
  };

  return (
    <section className="card note-form-card">
      <h2>{editingNote ? 'Edit Note' : 'Add New Note'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Client:</label>
          <select name="client" id="client" value={client} onChange={(e) => setFormData({...formData, client: e.target.value, opportunity: ''})} required>
            <option value="">Select a client...</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Opportunity:</label>
          <select name="opportunity" id="opportunity" value={opportunity} onChange={(e) => setFormData({...formData, opportunity: e.target.value})}>
            {filteredOpportunities.length > 0 && (
              <>
                <option value="">Select an opportunity...</option>
                {filteredOpportunities.map((opportunity) => (
                  <option key={opportunity._1d} value={opportunity._id}>{opportunity.title}</option>
                ))}
              </>
            )}
            {filteredOpportunities.length === 0 && (
              <option value="">No related opportunity / general note</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Note:</label>
          <textarea name="body" value={body} onChange={(e) => setFormData({...formData, body: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select name="type" id="type" value={type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
            <option value="general">General</option>
            <option value="call">Call</option>
            <option value="email">Email</option>
            <option value="meeting">Meeting</option>
            <option value="follow-up">Follow-up</option>
          </select>
        </div>
        <button type="submit" className="button button-primary">{editingNote ? 'Update Note' : 'Add Note'}</button>
        {editingNote && <button type="button" className="button button-secondary" onClick={onCancel}>Cancel</button>}
      </form>
    </section>
  );
};
