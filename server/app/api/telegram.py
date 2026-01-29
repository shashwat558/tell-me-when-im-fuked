from fastapi import APIRouter

router = APIRouter()

@router.post("/webhook")
def telegram_webhook():
    return {"message": "Telegram webhook hit"}