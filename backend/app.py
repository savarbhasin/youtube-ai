from fastapi import FastAPI, HTTPException, BackgroundTasks
from redis import Redis
from langchain_openai import OpenAIEmbeddings
from summary import summarize_url
from pytubefix import YouTube
from pydantic import BaseModel
from typing import List
import uuid
from chat import get_chain
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import AIMessageChunk
from fastapi.responses import StreamingResponse
from mangum import Mangum
import json

app = FastAPI()
handler = Mangum(app)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# redis = Redis(host='localhost', port=6379)

embeddings = OpenAIEmbeddings()

class Conversation(BaseModel):
    conversationId: str
    conversation: List[str]

class Message(BaseModel):
    video_id: str
    conversation_id: str
    question: str

@app.get('/')
def read_root():
    return {"Hello": "World"}

@app.get('/summary/{video_id}')
async def get_video_data(video_id: str):
    try:
        summary = summarize_url(video_id)
        yt = YouTube(f'https://www.youtube.com/watch?v={video_id}')
        title = yt.title
        description = yt.description
        return {"title": title, "description": description, "summary": summary}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@app.get('/start-conversation')
def generate_conversation_id():
    conversation_id = str(uuid.uuid4())
    # while redis.exists(conversation_id):
    #     conversation_id = str(uuid.uuid4())
    # redis.set(conversation_id, json.dumps([]))
    return JSONResponse(content={"conversation_id": str(conversation_id)})

def serialize_aimessagechunk(chunk):
    if isinstance(chunk, AIMessageChunk):
        content = chunk.content.replace('\n', '<br>')
        content = content.replace('"', '\\"')
        return chunk.content
    else:
        raise TypeError(
            f"Object of type {type(chunk).__name__} is not correctly formatted for serialization"
        )

async def send_message(chain, message: Message):
    async for event in chain.astream_events({"input":message.question}, config={"configurable":{"session_id": message.conversation_id}}, version="v1"):
        if event["event"] == "on_chat_model_stream" and event["name"] == "ChatGroq":
            chunk_content = serialize_aimessagechunk(event["data"]["chunk"])
            json_data = json.dumps({'content': chunk_content})
            yield f"data: {json_data}\n\n"


@app.post('/ask')
async def conversation(message:Message):
    try:
        chain = await get_chain(message.video_id)
        return StreamingResponse(send_message(chain, message), media_type="text/event-stream")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

