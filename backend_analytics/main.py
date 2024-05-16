from fastapi import FastAPI, WebSocket
from confluent_kafka import Consumer
import json
import asyncio

app = FastAPI()

kafka_topic = "survey_topic"
conf = {
    "bootstrap.servers": "localhost:9092,localhost:9094,localhost:9096",
    "group.id": "survey-analytics",
    "session.timeout.ms": 6000,
    "auto.offset.reset": "earliest",
    "enable.auto.offset.store": False,
}

consumer = Consumer(conf)
consumer.subscribe([kafka_topic])

async def kafka_poll(websocket: WebSocket):
    msg = consumer.poll(1.0)
    if msg is not None:
        if msg.error():
            print("Consumer error: {}".format(msg.error()))
        msg_value = msg.value().decode("utf-8")
        await send_to_websocket(msg_value, websocket)

async def send_to_websocket(msg, websocket):
    msg_json = json.dumps(msg)
    await websocket.send_text(msg_json)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        asyncio.create_task(kafka_poll(websocket))
        await asyncio.sleep(1)
    except Exception as e:
        print(f"WebSocket connection closed: {e}")
