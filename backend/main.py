from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.predict import router as predict_router

app = FastAPI(
    title="Online Shoppers Intention Intelligence API",
    description="Machine Learning service powered by Scikit-Learn Random Forest to predict e-commerce purchase intention.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend and Vercel domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)

@app.get("/")
def root():
    return {
        "message": "Online Shoppers Purchase Intention Prediction API is operational",
        "docs_url": "/docs",
        "health_url": "/api/health",
        "predict_endpoint": "/api/predict"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
