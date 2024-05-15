from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

dummy_data = {
    "labels": ["January", "February", "March", "April", "May", "June", "July"],
    "data": [0,0,0,0,0,0,0]
}

@app.get("/data")
async def get_analytics():
    return dummy_data

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_json(dummy_data)
    while True:
        numbers = [(x + 1)%100 for x in dummy_data["data"]]
        dummy_data["data"] = numbers
        await websocket.send_json(dummy_data)
