// calls /api/clients

export const getClients = async () => {
  const response = await fetch('/api/clients');
  if (!response.ok) {
    throw new Error('Failed to fetch clients');
  }

  const results = await response.json();

  return results.data;
};

export const getClientById = async (clientId) => {
  const response = await fetch(`/api/clients/${clientId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch client');
  }

  const result = await response.json();

  return result.data;
};

export const createClient = async (clientData) => {
  const response = await fetch('/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clientData)
  });

  if (!response.ok) {
    throw new Error('Failed to create client');
  }

  const result = await response.json();

  return result.data;
};

export const deleteClient = async (clientId) => {
  const response = await fetch(`/api/clients/${clientId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete client');
  }

  const result = await response.json();

  return result.data;
};

export const updateClient = async (clientId, clientData) => {
  const response = await fetch(`/api/clients/${clientId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clientData)
  });

  if (!response.ok) {
    throw new Error('Failed to update client');
  }

  const result = await response.json();

  return result.data;
};

export const getClientOpportunities = async (clientId) => {
  const response = await fetch(`/api/clients/${clientId}/opportunities`);
  if (!response.ok) {
    throw new Error('Failed to fetch client opportunities');
  }

  const results = await response.json();

  return results.data;
};

export const getClientNotes = async (clientId) => {
  const response = await fetch(`/api/clients/${clientId}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch client notes');
  }

  const results = await response.json();

  return results.data;
};
