import uuid
from sqlalchemy.orm import Session
import models, schemas


def create_note(db: Session, note: schemas.NoteCreate):
    share_url = str(uuid.uuid4())
    db_note = models.Note(title=note.title, content=note.content, share_url=share_url)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

def get_notes(db: Session):
    return db.query(models.Note).all()

def get_note_by_id(db: Session, note_id: int):
    return db.query(models.Note).filter(models.Note.id == note_id).first()

def get_note_by_share_url(db: Session, share_url: str):
    return db.query(models.Note).filter(models.Note.share_url == share_url).first()

def delete_note(db: Session, note_id: int):
    db_note = get_note_by_id(db, note_id)
    if db_note:
        db.delete(db_note)
        db.commit()
    return db_note


def update_note(db: Session, note_id: int, note: schemas.NoteUpdate):
    db_note = get_note_by_id(db, note_id)
    if not db_note:
        return None
    db_note.title = note.title
    db_note.content = note.content
    db.commit()
    db.refresh(db_note)
    return db_note
