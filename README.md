# Anadolu Mitolojileri (Anatolian Mythologies)

A web application featuring Turkish and Mesopotamian myths with AI-powered Turkish audio narration.

## 🌐 Live Demo

**Frontend**: https://anadolu-mitolojileri-jakdemir.vercel.app  
**Backend**: Raindrop Cloud (private endpoint)

## 📚 Content

- **28 Myths Total**
  - 20 Turkish myths (Oğuz Kağan, Ergenekon, Bozkurt, etc.)
  - 8 Mesopotamian myths (Gilgamesh, Enuma Elish, Inanna, etc.)
- Turkish audio narration using Google Cloud TTS
- Summary and full story for each myth

## 🏗️ Architecture

### Backend (Raindrop Framework)
- **API Gateway**: Public HTTP endpoints
- **Story Generator**: Internal story generation logic
- **Audio Narrator**: Google Cloud TTS integration
- **Database**: PostgreSQL with 28 curated myths
- **Storage**: Audio file bucket

### Frontend (React + Vite)
- Single-page application
- Expandable myth cards
- Inline audio playback
- Responsive design

## 🚀 Development

### Backend
```bash
cd storyteller-tales
npm install
raindrop build deploy --start
```

### Frontend
```bash
cd storyteller-ui
npm install
npm run dev
```

## 📦 Deployment

### Backend
Deployed on Raindrop platform with automatic scaling.

### Frontend
Deployed on Vercel:
```bash
cd storyteller-ui
npm run build
vercel --prod
```

## 🔧 Technologies

- **Backend**: Raindrop Framework, TypeScript, PostgreSQL
- **Frontend**: React, TypeScript, Vite, Bootstrap
- **Audio**: Google Cloud Text-to-Speech
- **Deployment**: Raindrop (backend), Vercel (frontend)

## 📝 License

Private project
