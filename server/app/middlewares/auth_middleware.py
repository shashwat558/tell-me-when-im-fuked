from fastapi import Header, HTTPException
from jose import jwt, JWTError
from config import jwt_secret, jwt_algorithm

def get_current_user(authorization:str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="missing auth header")
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")
        payload = jwt.decode(
            token=token,
            access_token=jwt_secret,
            algorithms=[jwt_algorithm]
            
        )
        
        user_id = payload.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")