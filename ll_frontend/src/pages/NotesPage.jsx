// getting data, handling load/error state, passing data to NoteList
import { useState, useEffect } from "react";

import { NoteList } from '../components/notes/NoteList';
import { NoteForm } from '../components/notes/NoteForm';
import { getNotes, createNote, deleteNote, updateNote } from '../api/noteApi';
import { getClients } from "../api/clientApi";
import { getOpportunities } from "../api/opportunityApi";

export const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [clients, setClients] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreateNote = (noteData) => {
    createNote(noteData)
      .then(() => {
        return getNotes();
      })
      .then(updatedNotes => {
        setNotes(updatedNotes);
      })
      .catch(err => {
        console.error('Error creating note:', err);
        setError('Failed to create note');
      });
  };
  
  const handleDeleteNote = (noteId) => {
    deleteNote(noteId)
      .then(data => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
      })
      .catch(err => {
        console.error('Error deleting note:', err);
        setError('Failed to delete note');
      });
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleUpdateNote = (noteId, noteData) => {
    updateNote(noteId, noteData)
      .then(() => {
        return getNotes();
      })
      .then(updatedNotes => {
        setNotes(updatedNotes);
        setEditingNote(null);
      })
      .catch(err => {
        console.error('Error updating note:', err);
        setError('Failed to update note');
      });
  };
  
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    const loadClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (err) {
        console.error('Failed to load clients:', err);
      }
    };

    const loadOpportunities = async () => {
      try {
        const data = await getOpportunities();
        setOpportunities(data);
      } catch (err) {
        console.error('Failed to load opportunities:', err);
      }
    };

    loadClients();
    loadOpportunities();
    loadNotes();
  }, []);

  return (
    <>
      <main className="notes-page">
        <h2>Notes</h2>
        <div className="notes-sub">
          <NoteForm onCreateNote={handleCreateNote} onUpdateNote={handleUpdateNote} editingNote={editingNote} clients={clients} opportunities={opportunities} />
          <NoteList notes={notes} onDeleteNote={handleDeleteNote} onEditNote={handleEditNote} />
        </div>
      </main>
    </>
  );
};
