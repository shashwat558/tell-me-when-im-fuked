import asyncpg
from app.config import database_url


async def update_user_telegram_link(user_id: str, chat_id: str):
    if not database_url:
        raise RuntimeError("DATABASE_URL is not set")

    conn = await asyncpg.connect(database_url)
    try:
        await conn.execute(
            'UPDATE "User" SET telegram_chat_id = $1, telegram_connected_at = NOW() WHERE id = $2',
            chat_id,
            user_id,
        )
    finally:
        await conn.close()
