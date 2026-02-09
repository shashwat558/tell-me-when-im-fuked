from fastapi import FastAPI
from app.api.telegram import router as telegram_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Crypto Alert Engine",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    telegram_router,
    prefix="/telegram",
    tags=["telegram"]
)

@app.get("/health")
def health():
    return {"status": "ok"}