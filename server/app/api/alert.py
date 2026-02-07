from fastapi import APIRouter, Depends
from app.middlewares.auth_middleware import get_current_user
router = APIRouter(
    dependencies=[Depends(get_current_user)]
)

@router.post("/alert")
def create_alert():
    return {"message": "alert created"}