const API_URL = "http://localhost:8000";

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes/`);
  return res.json();
}

export async function createNote(title: string, content: string) {
  const res = await fetch(`${API_URL}/notes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export async function deleteNote(id: number) {
  await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
}

export async function getNoteByShare(shareUrl: string) {
  const res = await fetch(`${API_URL}/share/${shareUrl}`);
  return res.json();
}


export async function updateNote(id: number, title: string, content: string) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}
