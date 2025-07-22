from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
from uuid import uuid4

router = APIRouter()

UPLOAD_DIR = "uploaded_photos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload_photo")
async def upload_photo(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    # For local dev, return a relative path; in production, this would be a public URL
    url = f"/static/{filename}"
    return JSONResponse(content={"url": url})
