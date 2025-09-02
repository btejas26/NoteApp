from database import Base
from sqlalchemy import Column, Integer, String, Text


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    share_url = Column(String(200), unique=True, index=True)
