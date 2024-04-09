from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, List
from uuid import uuid4, UUID

app = FastAPI()


class Question(BaseModel):
    id: Optional[UUID] = None
    question: str
    options: Dict[str, str]
    answers: Dict[str, Dict[str, str]] = {}


class Answer(BaseModel):
    answer: Dict[str, str]


class UpdateQuestion(BaseModel):
    question: Optional[str] = None
    options: Optional[Dict[str, str]] = None


class Questions(BaseModel):
    description: str
    questions: List[Question]


questions_db = {}


@app.post("/questions/")
def create_question(question: Question):
    question.id = uuid4()
    questions_db[question.id] = question
    return question


@app.get("/questions/")
def list_questions():
    return list(questions_db.values())


@app.put("/questions/{question_id}/")
def update_question(question_id: UUID, question_update: UpdateQuestion):
    if question_id not in questions_db:
        raise HTTPException(status_code=404, detail="Question not found")
    question = questions_db[question_id]
    if question_update.question is not None:
        question.question = question_update.question
    if question_update.options is not None:
        question.options = question_update.options
    questions_db[question_id] = question
    return question


@app.delete("/questions/{question_id}/")
def delete_question(question_id: UUID):
    if question_id not in questions_db:
        raise HTTPException(status_code=404, detail="Question not found")
    del questions_db[question_id]
    return {"message": "Question deleted successfully"}


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


@app.post("/questions/collection/")
def create_questions_collection(questions_collection: Questions):
    for question in questions_collection.questions:
        question.id = uuid4()
        questions_db[question.id] = question
    return questions_collection
