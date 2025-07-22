from fastapi import APIRouter, Request, HTTPException
from app.models.schema import GenerateProfileRequest, GenerateProfileResponse
from fastapi.responses import JSONResponse
from app.services.openai_gen import generate_pet_profile
from datetime import datetime
from collections import defaultdict

router = APIRouter()

# In-memory store: {ip: last_request_date}
ip_request_log = defaultdict(str)

# Replace with your actual public IP if needed
DEV_IPS = {"127.0.0.1", "::1", "97.118.230.83"}  # Add your public IP as a string if you want

@router.post("/generate_profile", response_model=GenerateProfileResponse)
async def generate_profile(payload: GenerateProfileRequest, request: Request):
    ip = request.client.host
    today = datetime.utcnow().strftime("%Y-%m-%d")
    if ip not in DEV_IPS:
        if ip_request_log[ip] == today:
            raise HTTPException(status_code=429, detail="Rate limit: 1 request per day per user.")
        ip_request_log[ip] = today
    profile = await generate_pet_profile(payload)
    return profile
