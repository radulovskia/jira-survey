from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, List
from uuid import uuid4, UUID
from fastapi.middleware.cors import CORSMiddleware
from confluent_kafka import Producer, KafkaException
from confluent_kafka.admin import AdminClient, NewTopic
import json

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

# Kafka
conf = {"bootstrap.servers": "broker1:9091, broker2:9093, broker3:9095"} # internal
# conf = {"bootstrap.servers": "localhost:9092, localhost:9094, localhost:9096"} # external
num_partitions = 3
num_replication = 3
admin_client = AdminClient(conf)
producer = Producer(conf)
kafka_topic = "survey_topic"
new_topic = NewTopic(kafka_topic, num_partitions, num_replication)
admin_client.create_topics([new_topic])

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

@app.post("/surveys/{survey_id}/answer/")
def submit_answers(survey_id: UUID, answers: List[Dict[str, str]]):
    for survey in surveys_db:
        if survey.id == survey_id:
            survey_data = {
                "survey_id": str(survey_id),
                "questions": []
            }
            for question in survey.questions:
                question_data = {
                    "question_id": str(question.id),
                    "question": question.question,
                    "options": question.options,
                    "answers": [answer['answer'] for answer in answers if UUID(answer['question_id']) == question.id]
                }
                survey_data['questions'].append(question_data)
            survey_data_json = json.dumps(survey_data)
            try:
                print(survey_data_json)
                producer.produce(kafka_topic, key=str(survey_id), value=survey_data_json.encode("utf-8"))
                producer.flush()
                return {"message": "Survey answers submitted successfully"}
            except KafkaException as e:
                raise HTTPException(status_code=500, detail=f"Failed to submit survey answers: {str(e)}")
    raise HTTPException(status_code=404, detail="Survey not found")
