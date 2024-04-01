from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
from uuid import uuid4, UUID

app = FastAPI()


class Question(BaseModel):
    id: Optional[UUID] = None
    question: str
    options: List[str]
    answers: Dict[str, str] = {}


class Answer(BaseModel):
    answer: str


questions_db = {}


@app.post("/questions/")
def create_question(question: Question):
    question.id = uuid4()
    questions_db[question.id] = question
    return question


@app.get("/questions/")
def list_questions():
    return list(questions_db.values())


@app.post("/questions/{question_id}/answer/")
def answer_question(question_id: UUID, answer: Answer):
    if question_id not in questions_db:
        raise HTTPException(status_code=404, detail="Question not found")
    question = questions_db[question_id]
    question.answers[str(uuid4())] = answer.answer
    return question


@app.get("/questions/{question_id}/")
def get_question(question_id: UUID):
    if question_id not in questions_db:
        raise HTTPException(status_code=404, detail="Question not found")
    return questions_db[question_id]
