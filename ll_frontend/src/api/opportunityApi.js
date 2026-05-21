// calls api/opportunities

export const getOpportunities = async () => {
  const response = await fetch('/api/opportunities');
  if (!response.ok) {
    throw new Error('Failed to fetch opportunities');
  }

  const results = await response.json();

  return results.data;
};

export const createOpportunity = async (opportunityData) => {
  const response = await fetch('/api/opportunities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(opportunityData)
  });

  if (!response.ok) {
    throw new Error('Failed to create opportunity');
  }

  const result = await response.json();

  return result.data;
};

export const deleteOpportunity = async (opportunityId) => {
  const response = await fetch(`/api/opportunities/${opportunityId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete opportunity');
  }

  const result = await response.json();

  return result.data;
};

export const updateOpportunity = async (opportunityId, opportunityData) => {
  const response = await fetch(`/api/opportunities/${opportunityId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(opportunityData)
  });

  if (!response.ok) {
    throw new Error('Failed to update opportunity');
  }
  
  const result = await response.json();

  return result.data;
};
