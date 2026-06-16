# 🌿 TerraLeaf — AI Plant Disease Detection Platform

> **React + FastAPI · TensorFlow/Keras · AccuWeather · Open-Meteo**  
> Upload a leaf image, get an instant AI diagnosis, weather-aware disease risk analysis, and smart terrace gardening recommendations.

---

## Table of Contents

1. [What TerraLeaf Does](#what-terraleaf-does)
2. [Architecture Overview](#architecture-overview)
3. [Folder Structure](#folder-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Environment Configuration](#environment-configuration)
7. [Running Locally](#running-locally)
8. [All API Endpoints](#all-api-endpoints)
9. [Frontend Pages & Routes](#frontend-pages--routes)
10. [Disease Detection Module](#module-1-disease-detection)
11. [Terrace Assistant Module](#module-2-terrace-assistant)
12. [Disease Intelligence Module](#module-3-disease-intelligence)
13. [Knowledge Base Files](#knowledge-base-files)
14. [Deployment](#deployment)
15. [Common Issues & Fixes](#common-issues--fixes)

---

## What TerraLeaf Does

TerraLeaf is a three-module AI platform for plant health management:

| Module | What it does |
|--------|-------------|
| **🔬 Disease Detection** | Upload a leaf image → Keras CNN diagnoses the disease, returns confidence score + treatment plan |
| **🌦️ Terrace Assistant** | Enter your plant type + city → live weather fetched → personalised daily care plan with attention score |
| **🧠 Disease Intelligence** | Enter detected disease + city → AccuWeather 5-day forecast analysed → spread risk, treatment timing, monitoring advice |

---

## Architecture Overview

```
┌─────────────────────────────────────┐       ┌──────────────────────────────────────────┐
│         FRONTEND  (Port 8081)       │       │         BACKEND  (Port 8000)              │
│   React + TanStack Router + Vite    │       │   FastAPI + Uvicorn + TensorFlow/Keras    │
│                                     │       │                                           │
│  /detect ──────────POST /predict────┼──────►│  Keras CNN model (224×224 leaf image)     │
│  /terrace ─────────GET  /api/terrace┼──────►│  AccuWeather API + terrace_engine.py      │
│  /disease-intel ───GET  /api/disease┼──────►│  AccuWeather API + disease_intel_engine.py│
│                                     │       │                                           │
│  /terrace (weather chips) ──────────┼──────►│  Open-Meteo (free, no key needed)         │
└─────────────────────────────────────┘       └──────────────────────────────────────────┘
```

---

## Folder Structure

```
terraleaf-plant-health/
│
├── backend/                        ← FastAPI Python backend
│   ├── app/
│   │   ├── main.py                 ← App entry, CORS, endpoints
│   │   ├── predictor.py            ← Keras model loader & inference
│   │   ├── treatments.py           ← Disease → treatment database
│   │   ├── schemas.py              ← Pydantic response models
│   │   ├── utils.py                ← Image preprocessing, validation
│   │   ├── config.py               ← Env-var driven configuration
│   │   ├── knowledge/
│   │   │   └── diseases.json       ← Disease attributes for risk engine
│   │   ├── routers/
│   │   │   └── weather.py          ← /api/weather, /api/terrace, /api/disease-intel
│   │   └── services/
│   │       ├── weather_service.py  ← AccuWeather API + mock fallback
│   │       ├── terrace_engine.py   ← Plant care recommendation engine
│   │       └── disease_intel_engine.py ← Weather-aware spread risk engine
│   ├── models/
│   │   ├── plant_disease_model.keras   ← ⚠️ Place your trained model here
│   │   └── class_names.json            ← ⚠️ Place your class index map here
│   ├── .env                        ← Your local backend environment variables
│   ├── .env.example                ← Template for .env
│   ├── requirements.txt
│   ├── Procfile                    ← For Railway/Render deployment
│   └── railway.json
│
├── src/                            ← React frontend source
│   ├── routes/
│   │   ├── index.tsx               ← Home / landing page
│   │   ├── detect.tsx              ← Module 1: Disease Detection
│   │   ├── terrace.tsx             ← Module 2: Terrace Assistant
│   │   ├── disease-intel.tsx       ← Module 3: Disease Intelligence
│   │   ├── library.tsx             ← Disease Library page
│   │   └── about.tsx               ← About page
│   ├── lib/
│   │   ├── weather.ts              ← Open-Meteo geocoding + forecast client
│   │   ├── diseaseIntelEngine.ts   ← Frontend risk engine (types + helpers)
│   │   └── terraceEngine.ts        ← Frontend terrace engine (types + helpers)
│   └── components/
│       ├── SiteLayout.tsx
│       └── SiteHeader.tsx
│
├── public/
│   └── data/
│       ├── disease-kb.json         ← Frontend disease knowledge base
│       └── plant-kb.json           ← Frontend plant knowledge base
│
├── .env.local                      ← Frontend environment variables (Vite)
├── vite.config.ts
├── package.json
└── README.md                       ← This file
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| npm / bun | Latest |
| Python | 3.10 or 3.11 |
| pip | ≥ 23 |

---

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/sudarshant04-droid/terraleaf-plant-health.git
cd terraleaf-plant-health
```

### 2. Frontend — install dependencies

```bash
npm install
# or
bun install
```

### 3. Backend — set up Python environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\Activate.ps1    # Windows PowerShell

pip install -r requirements.txt
```

### 4. Place model files

Copy your trained model artifacts into `backend/models/`:

```
backend/models/
├── plant_disease_model.keras    ← Trained Keras CNN
└── class_names.json             ← {"0": "Apple___Apple_scab", "1": "...", ...}
```

---

## Environment Configuration

### Frontend — `.env.local` (root directory)

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Backend — `backend/.env`

```env
# Application
APP_NAME=TerraLeaf API
APP_ENV=development
APP_VERSION=1.0.0

# CORS — add your frontend port here
# The Vite/lovable dev server runs on port 8081
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8081

# Model files (relative to backend/)
MODEL_PATH=models/plant_disease_model.keras
CLASS_MAP_PATH=models/class_names.json

# AccuWeather API Key (free tier: 50 calls/day)
# Get yours at: https://developer.accuweather.com/
# If left empty, the backend falls back to realistic mock weather data
ACCUWEATHER_API_KEY=your_key_here
```

> **Important:** After editing `backend/.env`, you must restart uvicorn — `--reload` only watches `.py` files, not `.env`.

---

## Running Locally

Open **two terminals**:

### Terminal 1 — Backend

```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

Backend runs at: **http://127.0.0.1:8000**  
Swagger docs at: **http://127.0.0.1:8000/docs**

### Terminal 2 — Frontend

```bash
# from project root
npm run dev
```

Frontend runs at: **http://localhost:8081**

---

## All API Endpoints

### Core Prediction

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Welcome message |
| `GET` | `/health` | Health check — confirms model is loaded |
| `POST` | `/predict` | Upload leaf image → AI disease diagnosis |
| `GET` | `/docs` | Swagger interactive UI |
| `GET` | `/redoc` | ReDoc API docs |

### Weather & Recommendations

| Method | Path | Query Params | Description |
|--------|------|-------------|-------------|
| `GET` | `/api/weather/by-city` | `city` | Raw weather data for a city |
| `GET` | `/api/terrace/recommendations` | `plant_type`, `location` | Weather-aware plant care plan |
| `GET` | `/api/disease-intel/risk` | `disease`, `confidence`, `location` | Disease spread risk + treatment timing |

---

## Frontend Pages & Routes

| URL | Page | Description |
|-----|------|-------------|
| `/` | Home | Landing page with feature overview |
| `/detect` | Disease Detection | Upload leaf → AI diagnosis |
| `/terrace` | Terrace Assistant | Plant + city → care recommendations |
| `/disease-intel` | Disease Intelligence | Disease + city → weather-based risk |
| `/library` | Disease Library | Browse known plant diseases |
| `/about` | About | Project info |

---

## Module 1: Disease Detection

**Route:** `/detect`  
**Backend:** `POST /predict`

### How it works

1. User uploads a JPG/PNG leaf image (up to 10 MB)
2. Frontend sends it as `multipart/form-data` to `/predict`
3. Backend preprocesses: RGB → resize 224×224 → normalise to [0, 1]
4. Keras CNN runs inference → top-3 predictions
5. Treatment lookup from `app/treatments.py`
6. Result displayed: disease name, confidence bar, symptoms, treatment, prevention
7. CTA button: **"Open Disease Intelligence"** → passes `disease` + `confidence` as URL params to `/disease-intel`

### Response shape

```json
{
  "success": true,
  "prediction": {
    "disease": "Tomato___Early_blight",
    "confidence": 97.83,
    "top_predictions": [
      { "name": "Tomato___Early_blight", "confidence": 97.83 },
      { "name": "Tomato___Late_blight",  "confidence": 1.50  }
    ]
  },
  "recommendation": {
    "severity": "Moderate",
    "symptoms": ["Brown circular lesions with concentric rings on older leaves"],
    "treatment": ["Apply copper fungicide at 7-day intervals"],
    "prevention": ["Rotate with non-solanaceous crops for 2–3 years"]
  }
}
```

---

## Module 2: Terrace Assistant

**Route:** `/terrace`  
**Backend:** `GET /api/terrace/recommendations`

### How it works

1. User selects plant type (from `public/data/plant-kb.json`) + enters city
2. Backend calls AccuWeather → current conditions + 5-day forecast
3. `terrace_engine.py` computes an **attention score (0–100)** and specific recommendations
4. Frontend renders: attention ring, weather chips, recommendation cards, 5-day forecast strip

### Attention Score Logic

| Score | Label | Meaning |
|-------|-------|---------|
| 80–100 | Thriving | Ideal conditions |
| 60–79 | Good | Minor adjustments needed |
| 40–59 | Caution | Active care required |
| 0–39 | Critical | Urgent action needed |

### Supported Plants

`tomato` · `tulsi` · `money_plant` · `mint` · `rose` · `chilli` · `spinach` · `basil`

---

## Module 3: Disease Intelligence

**Route:** `/disease-intel`  
**Backend:** `GET /api/disease-intel/risk`

### How it works

1. Disease name + confidence pre-filled from Detection, or entered manually
2. User enters city → backend fetches AccuWeather 5-day forecast
3. `disease_intel_engine.py` matches disease to `app/knowledge/diseases.json`
4. Computes per-day spread risk score using:
   - Humidity within favorable range (+35 pts)
   - Temperature within favorable range (+30 pts)
   - Rain probability if rain-sensitive (+25 pts)
   - Wind speed for wind-spread diseases (+15 pts)
5. Renders: spread risk gauge, 5-day risk forecast, treatment timing, monitoring advice

### Risk Score → Level

| Score | Risk Level |
|-------|-----------|
| ≥ 65 | 🔴 High |
| ≥ 35 | 🟡 Moderate |
| < 35 | 🟢 Low |

### Diseases in Knowledge Base

`early_blight` · `late_blight` · `leaf_mold` · `powdery_mildew` · `bacterial_spot` · `anthracnose`

> Unknown diseases fall back to a generic weather-based assessment.

---

## Knowledge Base Files

### `public/data/disease-kb.json`

Used by the frontend engine. Each entry has:
- `displayName`, `pathogen`, `type`
- Favorable humidity/temperature ranges
- `rainSensitive`, `windSpreadRisk`, `spreadSpeed`, `incubationDays`
- `treatmentWindows` (before rain / after rain / high humidity)

### `public/data/plant-kb.json`

Used by the Terrace Assistant. Each plant entry has:
- `displayName`, `emoji`
- Watering thresholds, humidity preferences, UV sensitivity
- Care rules for generating recommendations

### `backend/app/knowledge/diseases.json`

Server-side mirror of the disease KB, used by `disease_intel_engine.py`.

---

## Deployment

### Deploy Backend to Railway

```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
```

Set these environment variables in Railway Dashboard:
```
APP_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.com
MODEL_PATH=models/plant_disease_model.keras
CLASS_MAP_PATH=models/class_names.json
ACCUWEATHER_API_KEY=your_key_here
```

### Deploy Frontend to Vercel

```bash
npm install -g vercel
vercel --prod
```

Set in Vercel Dashboard:
```
VITE_API_BASE_URL=https://your-railway-backend.railway.app
```

---

## Common Issues & Fixes

### ❌ "Cannot reach TerraLeaf backend"

**Cause:** Backend not running, or wrong port.  
**Fix:**
```bash
cd backend && source venv/bin/activate
python -m uvicorn app.main:app --reload
# confirm: http://127.0.0.1:8000/health
```

### ❌ CORS error in browser console

**Cause:** Frontend port not in `ALLOWED_ORIGINS`.  
**Fix:** Add your port to `backend/.env`:
```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8081
```
Then **restart uvicorn** (not just save — `--reload` only watches `.py` files):
```bash
# touch any .py file to force reload, or Ctrl+C and restart
touch app/config.py
```

### ❌ "The prediction model is not available"

**Cause:** Model files missing from `backend/models/`.  
**Fix:** Place `plant_disease_model.keras` and `class_names.json` in `backend/models/`.

### ❌ Analyse Disease Risk button stays disabled

**Cause:** `/data/disease-kb.json` not found in `public/data/`.  
**Fix:** Ensure `public/data/disease-kb.json` exists in the project root.

### ❌ Weather shows mock data instead of real forecast

**Cause:** `ACCUWEATHER_API_KEY` is empty or invalid (free tier: 50 calls/day limit).  
**Fix:** Get a free key at https://developer.accuweather.com/ and set it in `backend/.env`.

---

*Built with ❤️ for the ANITI Projects initiative — TerraLeaf Platform.*
