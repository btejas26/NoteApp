from pydantic import BaseModel

class NoteBase(BaseModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class NoteOut(NoteBase):
    id: int
    share_url: str

    class Config:
        from_attributes = True


class NoteUpdate(NoteBase):
    pass
