# 🐪 SaharaShopper — Online Shoppers Purchase Intention Prediction

A complete, production-ready full-stack machine learning web application that predicts e-commerce customer purchase intent in real time. Built with **FastAPI** (backend) and **Next.js 14** (frontend) using the Scikit-Learn **Random Forest** classification pipeline developed in `3.ipynb`.

The interface features an **editorial Camel & Saddle design system** with warm desert tones, high-contrast typography, and zero generic AI aesthetics.

---

## 📁 Project Structure

```
finall_project/
├── backend/                               # FastAPI Python REST API
│   ├── api/
│   │   └── index.py                       # Vercel serverless function entrypoint
│   ├── main.py                            # FastAPI app, CORS, local entrypoint
│   ├── models/
│   │   ├── online_shoppers_best_model.pkl # Trained Random Forest pipeline (~14.6 MB)
│   │   └── online_shoppers_model_metadata.json
│   ├── routers/
│   │   └── predict.py                     # /api/predict, /api/health, /api/sample-scenarios
│   ├── schemas/
│   │   └── prediction.py                  # Pydantic v2 validation models
│   ├── services/
│   │   └── predictor.py                   # Model loader & domain inference engine
│   ├── requirements.txt                   # Python dependencies
│   ├── vercel.json                        # Vercel ASGI rewrite configuration
│   └── .env.example
│
├── frontend/                              # Next.js 14 Web Application
│   ├── app/
│   │   ├── api/predict/route.ts           # Resilient API route proxying to FastAPI
│   │   ├── globals.css                    # Handcrafted Camel Color System & tokens
│   │   ├── layout.tsx                     # Root HTML layout & SEO metadata
│   │   └── page.tsx                       # Full interactive single-page experience
│   ├── components/
│   │   ├── Navbar.tsx                     # Editorial camel header & branding
│   │   ├── HeroSection.tsx                # Hero presentation & benchmark statistics
│   │   ├── ScenarioPicker.tsx             # 1-Click test personas (High-Intent, Window Shopper, etc.)
│   │   ├── PredictionForm.tsx             # 17-feature input matrix with section groupings
│   │   ├── PredictionResult.tsx           # Conversion probability dial & merchant recommendations
│   │   ├── ArchitectureSection.tsx        # Pipeline explanation & feature importance charts
│   │   └── Footer.tsx                     # Production specifications & credits
│   ├── lib/
│   │   ├── api.ts                         # Client-side API fetcher
│   │   ├── scenarios.ts                   # Realistic sample datasets
│   │   └── types.ts                       # TypeScript interfaces
│   ├── next.config.ts                     # Next.js configuration
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── README.md
```

---

## 🎨 Camel Color Palette

| Token | Hex | Role |
|---|---|---|
| `--camel-50` | `#faf7f2` | Linen Background Surface |
| `--camel-100` | `#f4ecdf` | Soft Tinted Container |
| `--camel-300` | `#dac3a4` | Tactile Borders & Dividers |
| `--camel-500` | `#b88a53` | Primary Accent Color |
| `--camel-700` | `#86592f` | Action Buttons & Active Badges |
| `--camel-900` | `#3c2413` | Deep Espresso Headings & Dark Footers |
| `--status-purchase` | `#2e6f40` | Forest Sage for Purchase Outcome |
| `--status-no-purchase` | `#a13b2e` | Terracotta Brick for Non-Purchase Outcome |

---

## 🚀 Running Locally

### 1. Start the FastAPI Backend

```bash
cd finall_project/backend

# Activate your Python virtual environment (e.g. from the root)
source ../../.venv/bin/activate

# Install dependencies if needed
pip install -r requirements.txt

# Start the uvicorn server on port 8000
python main.py
# Or: uvicorn main:app --reload --port 8000
```

The API will be live at `http://127.0.0.1:8000`:
- Interactive Swagger Documentation: `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/api/health`

### 2. Start the Next.js Frontend

In a second terminal window:

```bash
cd finall_project/frontend

# Install node dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## ☁️ Deploying to Vercel

The application is structured for instant Vercel deployment as **two connected projects**:

### Project 1: Backend Deployment
1. On [vercel.com](https://vercel.com), click **Add New Project** and connect your Git repository.
2. In the setup screen, set **Root Directory** to `finall_project/backend`.
3. Vercel automatically detects Python via `vercel.json` and runs `api/index.py`.
4. Deploy the project and copy your production URL (e.g. `https://sahara-shopper-api.vercel.app`).

### Project 2: Frontend Deployment
1. Click **Add New Project** again on Vercel for the same repository.
2. Set **Root Directory** to `finall_project/frontend`.
3. Under **Environment Variables**, add:
   ```
   NEXT_PUBLIC_API_URL = https://sahara-shopper-api.vercel.app
   ```
4. Click **Deploy**. Vercel will build the Next.js app with Turbopack and deploy it to a global edge CDN.

---

## 🧠 Machine Learning Model Details

- **Dataset**: UCI Online Shoppers Purchasing Intention Dataset (12,330 rows, 18 columns).
- **Target Variable**: `Revenue` (1 = Purchase, 0 = No Purchase).
- **Algorithm**: Random Forest Classifier (100 estimators, Scikit-Learn `RandomForestClassifier`).
- **Data Preprocessing**: `ColumnTransformer` with `StandardScaler` on numerical features and `OneHotEncoder` on categorical features (`Month`, `VisitorType`).
- **Top Predictive Features**:
  1. `PageValues` (36.4% feature weight) — e-commerce transaction value indicator.
  2. `ExitRates` (14.8% feature weight) — drop-off probability.
  3. `ProductRelated_Duration` (12.2% feature weight) — dwelling depth on product catalog.
  4. `Administrative_Duration` (6.8% feature weight) — cart and account interactions.
