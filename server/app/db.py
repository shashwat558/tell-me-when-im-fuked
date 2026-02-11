import asyncpg
from app.config import database_url, redis_token, redis_url
from upstash_redis import Redis
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse


def _build_db_connection_url(raw_url: str) -> tuple[str, dict | None]:
    parsed = urlparse(raw_url)
    query = dict(parse_qsl(parsed.query, keep_blank_values=True))
    schema = query.pop("schema", None)

    sanitized = urlunparse(
        (
            parsed.scheme,
            parsed.netloc,
            parsed.path,
            parsed.params,
            urlencode(query, doseq=True),
            parsed.fragment,
        )
    )

    server_settings = {"search_path": schema} if schema else None
    return sanitized, server_settings

async def update_user_telegram_link(user_id: str, chat_id: str):
    if not database_url:
        raise RuntimeError("DATABASE_URL is not set")

    conn_url, server_settings = _build_db_connection_url(database_url)
    conn = await asyncpg.connect(conn_url, server_settings=server_settings)
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
    linked_user_id = redis.get(f"telegram:link:{token}")
    if not linked_user_id:
        raise RuntimeError("Invalid or expired token");
    return linked_user_id
    