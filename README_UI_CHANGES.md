
# Notes App — Polished UI + Edit Feature

Changes made:
- Removed the **Share Link** option from the UI.
- Added a modern, responsive design with a glassy card layout.
- Implemented an **Edit** flow with a modal to update note title and content.
- API: added `PUT /notes/{id}` route and backend support to update notes.

## How to run

### Backend (FastAPI)
```bash
cd backend
# Optional: create venv and install requirements
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Files of interest
- `frontend/src/styles.css` – new global styles
- `frontend/src/App.tsx` – new UI, edit modal, removed share link
- `frontend/src/api.ts` – added `updateNote()`
- `backend/schemas.py` – added `NoteUpdate`
- `backend/crud.py` – added `update_note()`
- `backend/main.py` – added `PUT /notes/{note_id}`
