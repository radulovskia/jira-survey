from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from confluent_kafka import Consumer, KafkaException

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the specific origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kafka
conf = {
    # "bootstrap.servers": "localhost:9092, localhost:9094, localhost:9096", # external
    "bootstrap.servers": "broker1:9091, broker2:9093, broker3:9095", # internal
    "group.id": "survey-analytics",
    "session.timeout.ms": 6000,
    "auto.offset.reset": "earliest",
    "enable.auto.offset.store": False,
}

def print_assignment(consumer, partitions):
    print("Assigned to:", partitions)

kafka_topic = "survey_topic"
consumer = Consumer(conf)
consumer.subscribe([kafka_topic], on_assign=print_assignment)

@app.get("/")
async def greeting():
    return {"greeting":"hi"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                raise KafkaException(msg.error())
            await websocket.send_json(msg)
            print(msg)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch survey answers: {str(e)}")
    finally:
        consumer.close()