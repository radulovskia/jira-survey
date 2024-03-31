from fastapi import FastAPI, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
import models

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)


class QuestionBase(BaseModel):
    question: str
    answer: str


class QuestionModel(QuestionBase):
    id: int

    class Config:
        from_attributes = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind = engine)

@app.post("/questions", response_model = QuestionModel)
async def create_question(question: QuestionBase, db: db_dependency):
    db_transaction = models.Question(**question.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/questions", response_model = List[QuestionModel])
async def read_questions(db: db_dependency, skip: int = 0, limit: int = 100):
    questions = db.query(models.Question).offset(skip).limit(limit).all()
    return questions