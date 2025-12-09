from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Stock Hunter API", version="1.0.0")

# CORS setup for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development convenience
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Stock Hunter API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

from app.api.routes import router as api_router
app.include_router(api_router, prefix="/api")

# Initialize DB on startup
from app.db.database import init_db
@app.on_event("startup")
def on_startup():
    init_db()
