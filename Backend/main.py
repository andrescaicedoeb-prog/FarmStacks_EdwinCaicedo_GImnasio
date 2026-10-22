from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from router.membresias import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[config("FRONTEND_URL")],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)