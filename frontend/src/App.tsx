
import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "./api";

interface Note {
  id: number;
  title: string;
  content: string;
  share_url: string;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    const data = await getNotes();
    setNotes(data.reverse());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreate(e: React.FormEvent) {
  e.preventDefault();
  if (!title.trim() || !content.trim()) return;

  setLoading(true);
  try {
    await createNote(title.trim(), content.trim());
    setTitle("");
    setContent("");
    await refresh(); // make sure new note shows immediately
  } catch (err) {
    console.error("Error creating note:", err);
    alert("Failed to add note. Please try again.");
  } finally {
    setLoading(false); 
  }
}

  async function handleDelete(id: number) {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function startEdit(note: Note) {
    setEditing({ ...note });
  }

  async function saveEdit() {
    if (!editing) return;
    const updated = await updateNote(editing.id, editing.title, editing.content);
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    setEditing(null);
  }

  return (
    <div className="container">
      <div className="header">
        <div className="title">✨ Notes</div>
        <div className="badge">{notes.length} total</div>
      </div>

      <div className="card">
        <form onSubmit={handleCreate} className="input-row">
          <input
            className="input"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea"
            placeholder="Write your note..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Note"}
          </button>
        </form>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <h3 className="note-title">{note.title}</h3>
            <div className="note-content">{note.content}</div>
            <div className="note-actions">
              <button className="button btn-secondary" onClick={() => startEdit(note)}>
                Edit
              </button>
              <button className="button btn-danger" onClick={() => handleDelete(note.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="modal-backdrop" onClick={() => setEditing(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit note</h3>
            <div className="input-row" style={{ gridTemplateColumns: "1fr" as any }}>
              <input
                className="input"
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
              <textarea
                className="textarea"
                rows={6}
                value={editing.content}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              />
            </div>
            <div className="modal-actions">
              <button className="button btn-secondary" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button className="button" onClick={saveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
