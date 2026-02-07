from fastapi import APIRouter, HTTPException, Request
from typing import Final, Optional
from telegram.ext import Application
from jose import JWTError, jwt
import os
from dotenv import load_dotenv
from app.config import telegram_auth_secret, jwt_algorithm
from app.db import update_user_telegram_link

load_dotenv()

BOT_TOKEN: Final = os.getenv("TELEGRAM_BOT_API")
BOT_HANDLE: Final = "@tellmewhenimfuckedbot"

router = APIRouter()

telegram_app = Application.builder().token(BOT_TOKEN).build()


def extract_start_token(text: str) -> Optional[str]:
    parts = text.split()
    if len(parts) < 2:
        return None
    arg = parts[1]
    if not arg.startswith("auth_"):
        return None
    return arg.replace("auth_", "", 1)


async def send_text(chat_id: str, text: str):
    await telegram_app.bot.send_message(chat_id=chat_id, text=text)


@router.post("/webhook")
async def telegram_webhook_listener(req: Request):
    """This endpoint recieves updates from telegram"""
    data = await req.json()
    print("[telegram] update:", data)
    message = data.get("message")
    if not message:
        print("[telegram] no message in update")
        return {"ok": True}

    chat = message.get("chat", {})
    chat_id = chat.get("id")
    text = message.get("text", "")
    if not chat_id or not text:
        print("[telegram] missing chat_id or text")
        return {"ok": True}

    if text.startswith("/start"):
        print("[telegram] /start from chat_id:", chat_id)
        token = extract_start_token(text)
        if not token:
            print("[telegram] missing auth token")
            await send_text(str(chat_id), "Missing auth token. Please reconnect from the dashboard.")
            return {"ok": True}

        if not telegram_auth_secret:
            raise HTTPException(status_code=500, detail="TELEGRAM_AUTH_SECRET not configured")

        try:
            payload = jwt.decode(token, telegram_auth_secret, algorithms=[jwt_algorithm])
            user_id = payload.get("userId")
            if not user_id:
                raise JWTError("missing userId")
        except JWTError:
            print("[telegram] invalid token")
            await send_text(str(chat_id), "Invalid or expired link. Please reconnect from the dashboard.")
            return {"ok": True}

        try:
            await update_user_telegram_link(user_id=str(user_id), chat_id=str(chat_id))
        except Exception as exc:
            print("[telegram] db update failed:", exc)
            await send_text(str(chat_id), "Could not link right now. Please try again later.")
            return {"ok": True}

        await send_text(str(chat_id), "Telegram linked ✅ You'll now receive alerts here.")
        return {"ok": True}

    if text.startswith("/help"):
        await send_text(str(chat_id), "Commands: /start <auth_token>")
        return {"ok": True}

    return {"ok": True}
    
