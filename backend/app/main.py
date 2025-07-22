from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from app.routes import generate
from app.routes import upload
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for images
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom middleware to add CORS headers to static image responses
class StaticCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        if request.url.path.startswith("/static/"):
            response.headers["Access-Control-Allow-Origin"] = "*"
        return response

app.add_middleware(StaticCORSMiddleware)

app.include_router(generate.router)
app.include_router(upload.router)
app.mount("/static", StaticFiles(directory="uploaded_photos"), name="static")
