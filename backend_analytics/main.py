from fastapi import FastAPI, WebSocket
from aiokafka import AIOKafkaConsumer
import json

app = FastAPI()

kafka_topic = "survey_topic"
# kafka_servers = "localhost:9092,localhost:9094,localhost:9096" # external
kafka_servers = "broker1:9091,broker2:9093,broker3:9095" # internal
group_id = "survey-analytics"

async def kafka_polling(websocket):
    consumer = AIOKafkaConsumer(
        kafka_topic,
        bootstrap_servers=kafka_servers,
        auto_commit_interval_ms=1000,
        auto_offset_reset='earliest'
    )
    await consumer.start()
    try:
        async for msg in consumer:
            msg_value = msg.value.decode("utf-8")
            await send_to_websocket(msg_value, websocket)
    except Exception as e:
        print(f"Kafka consumer error: {e}")
    finally:
        await consumer.stop()

async def send_to_websocket(msg, websocket):
    msg_json = json.dumps(msg)
    await websocket.send_text(msg_json)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        await kafka_polling(websocket)
    except Exception as e:
        print(f"WebSocket connection closed: {e}")
