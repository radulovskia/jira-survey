from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, List
from uuid import uuid4, UUID
from fastapi.middleware.cors import CORSMiddleware
from confluent_kafka import Producer, KafkaException
from confluent_kafka.admin import AdminClient, NewTopic
import sqlite3
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

# SQLite setup
DATABASE = 'surveys.db'

def init_db():
    with sqlite3.connect(DATABASE) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS surveys (
                id TEXT PRIMARY KEY,
                description TEXT
            )
        ''')
        conn.execute('''
            CREATE TABLE IF NOT EXISTS questions (
                id TEXT PRIMARY KEY,
                survey_id TEXT,
                question TEXT,
                options TEXT,
                FOREIGN KEY(survey_id) REFERENCES surveys(id)
            )
        ''')
        conn.execute('''
            CREATE TABLE IF NOT EXISTS answers (
                question_id TEXT,
                answer TEXT,
                FOREIGN KEY(question_id) REFERENCES questions(id)
            )
        ''')

init_db()

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
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO surveys (id, description) VALUES (?, ?)
        ''', (str(survey.id), survey.description))
        for question in survey.questions:
            question.id = uuid4()  # Generate a UUID for the question ID
            cursor.execute('''
                INSERT INTO questions (id, survey_id, question, options) VALUES (?, ?, ?, ?)
            ''', (str(question.id), str(survey.id), question.question, json.dumps(question.options)))
    return survey

@app.get("/surveys/")
def list_surveys():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, description FROM surveys')
        surveys = cursor.fetchall()
        result = []
        for survey in surveys:
            cursor.execute('SELECT id, question, options FROM questions WHERE survey_id = ?', (survey[0],))
            questions = cursor.fetchall()
            survey_questions = [
                Question(id=UUID(q[0]), question=q[1], options=json.loads(q[2])) for q in questions
            ]
            result.append(Survey(id=UUID(survey[0]), description=survey[1], questions=survey_questions))
    return result

@app.get("/surveys/{survey_id}/")
def get_survey(survey_id: UUID):
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, description FROM surveys WHERE id = ?', (str(survey_id),))
        survey = cursor.fetchone()
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        cursor.execute('SELECT id, question, options FROM questions WHERE survey_id = ?', (str(survey_id),))
        questions = cursor.fetchall()
        survey_questions = [
            Question(id=UUID(q[0]), question=q[1], options=json.loads(q[2])) for q in questions
        ]
    return Survey(id=UUID(survey[0]), description=survey[1], questions=survey_questions)

@app.post("/surveys/{survey_id}/answer/")
def submit_answers(survey_id: UUID, answers: List[Dict[str, str]]):
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id FROM surveys WHERE id = ?', (str(survey_id),))
        survey = cursor.fetchone()
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        survey_data = {
            "survey_id": str(survey_id),
            "questions": []
        }
        for answer in answers:
            question_id = answer['question_id']
            cursor.execute('SELECT id, question, options FROM questions WHERE id = ?', (question_id,))
            question = cursor.fetchone()
            if not question:
                continue
            cursor.execute('''
                INSERT INTO answers (question_id, answer) VALUES (?, ?)
            ''', (question_id, answer['answer']))
            survey_data['questions'].append({
                "question_id": question_id,
                "question": question[1],
                "options": json.loads(question[2]),
                "answers": [answer['answer']]
            })
        survey_data_json = json.dumps(survey_data)
        try:
            print(survey_data_json)
            producer.produce(kafka_topic, key=str(survey_id), value=survey_data_json.encode("utf-8"))
            producer.flush()
            return {"message": "Survey answers submitted successfully"}
        except KafkaException as e:
            raise HTTPException(status_code=500, detail=f"Failed to submit survey answers: {str(e)}")


