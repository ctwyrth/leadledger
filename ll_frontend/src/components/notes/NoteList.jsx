// displays a list of notes
export const NoteList = ({ notes, onDeleteNote, onEditNote }) => {
  if (!notes.length) {
    return <div>No notes found.</div>;
  }

  return (
    <section className="note-layout">
      {notes.map((note) => (
        <article key={note._id} className="card note-card">
          <h2>{note.client?.name || 'Unknown client'}</h2>
          <h4>{note.opportunity?.title || 'Unknown opportunity'}</h4>
          <p>Note: {note.body}</p>
          <p>Type: {note.type}</p>
          <div className="card-nav">
            <button className="button edit" onClick={() => onEditNote(note)}>Edit</button>
            <button className="button delete" onClick={() => onDeleteNote(note._id)}>Delete</button>
          </div>
        </article>
      ))}
    </section>
  );
}
