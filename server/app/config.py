import os
from dotenv import load_dotenv
load_dotenv()

jwt_secret = os.getenv("JWT_SECRET")
jwt_algorithm = os.getenv("JWT_ALGORITHM", "HS256")
telegram_auth_secret= os.getenv("TELEGRAM_AUTH_SECRET")
database_url = os.getenv("DATABASE_URL")
redis_url = os.getenv("UPSTASH_REDIS_REST_URL");
redis_token = os.getenv("UPSTASH_REDIS_REST_TOKEN");