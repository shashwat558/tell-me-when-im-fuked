from fastapi import APIRouter, Request
from typing import Final, Optional
from telegram.ext import Application
import os
from dotenv import load_dotenv
from app.db import update_user_telegram_link, get_linked_user_id

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
    print("[telegram] Incoming Webhook Update:")
    print("  Headers:", req.headers)
    print("  Body:", data)

    message = data.get("message")
    try:
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

            try:
                linked_user_id = await get_linked_user_id(token=token)
                await update_user_telegram_link(user_id=str(linked_user_id), chat_id=str(chat_id))
            except RuntimeError as exc:
                print("[telegram] invalid or expired token:", exc)
                await send_text(str(chat_id), "Invalid or expired link. Please reconnect from the dashboard.")
                return {"ok": True}
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
    except Exception as e:
        print(f"[telegram] Unhandled exception in webhook: {e}")
        return {"ok": False, "error": str(e)}
    
