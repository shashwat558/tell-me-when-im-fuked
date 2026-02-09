import asyncpg
from app.config import database_url, redis_token, redis_url
from upstash_redis import Redis

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


async def get_linked_user_id(token: str):
    if not token:
        raise RuntimeError("Token is not provided");
    
    redis = Redis(url=redis_url, token=redis_token)
    linked_user_id= await redis.get(f"telegram:link:{token}");
    if not linked_user_id:
        raise RuntimeError("Invalid or expired token");
    return linked_user_id
    