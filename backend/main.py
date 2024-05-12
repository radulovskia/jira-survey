from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, List
from uuid import uuid4, UUID
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the specific origins you want to allow
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class Question(BaseModel):
    id: Optional[UUID] = None
    question: str
    options: Dict[str, str]
    answers: List[str] = []

class Survey(BaseModel):
    id: Optional[UUID] = None
    description: str
    questions: List[Question]

surveys_db = []

@app.post("/surveys/")
def create_survey(survey: Survey):
    survey.id = uuid4()  # Generate a UUID for the survey ID
    for question in survey.questions:
        question.answers = []  # Ensure answers array is initialized
    surveys_db.append(survey)
    return survey

@app.get("/surveys/")
def list_surveys():
    return surveys_db

@app.get("/surveys/{survey_id}/")
def get_survey(survey_id: UUID):
    for survey in surveys_db:
        if survey.id == survey_id:
            return survey
    raise HTTPException(status_code=404, detail="Survey not found")

# Additional endpoints can be defined as needed...
