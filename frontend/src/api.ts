const API_URL = import.meta.env.VITE_API_URL;


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

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create note: ${res.status} ${errorText}`);
  }

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
