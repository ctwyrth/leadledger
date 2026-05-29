// calls api/notes

export const getNotes = async (clientId) => {
  const response = await fetch(`/api/notes?clientId=${clientId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }

  const results = await response.json();

  return results.data;
};

export const createNote = async (noteData) => {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(noteData)
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  const result = await response.json();

  return result.data;
};

export const deleteNote = async (noteId) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete note');
  }

  const result = await response.json();

  return result.data;
};

export const updateNote = async (noteId, noteData) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(noteData)
  });

  if (!response.ok) {
    throw new Error('Failed to update note');
  }

  const result = await response.json();

  return result.data;
};
