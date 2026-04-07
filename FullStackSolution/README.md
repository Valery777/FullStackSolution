<p align="center">
  <img src="https://img.shields.io/badge/Full--Stack-Architecture-4CAF50?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql" />
  <img src="https://img.shields.io/badge/ML.NET-Machine%20Learning-512BD4?style=for-the-badge&logo=dotnet" />
  <img src="https://img.shields.io/badge/Ollama-LLM-000000?style=for-the-badge&logo=ollama" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker" />
  <img src="https://img.shields.io/badge/Clean%20Architecture-SOLID-4CAF50?style=for-the-badge" />
</p>

<h1 align="center">Full‑Stack Demo: Next.js 15 + React 19 + .NET 8 + MySQL + ML.NET + Ollama + OpenAI</h1>

A complete full‑stack demonstration combining a modern Next.js 15 frontend with a .NET 8 Web API backend.
The system integrates MySQL, ML.NET machine‑learning models, and a local LLM (Ollama) to showcase 
real‑world architecture patterns, predictive analytics, natural‑language processing, and clean separation
of concerns. 

System Overview
The repository contains two coordinated projects:
• 	NextClientApp — Next.js 15 + React 19 frontend
• 	NextJS1 — .NET 8 Web API backend with MySQL, ML.NET, and Ollama integration

Key Capabilities
Full‑Stack Features
• 	Product CRUD UI and API backed by MySQL.
• 	ML.NET prediction tools (regression, binary, multiclass).
• 	LLM chat and text‑analysis powered by Ollama.
• 	JWT authentication with protected endpoints.
• 	Clean Architecture backend with SOLID principles.
• 	React 19 Server Actions, SSR/SSG/ISR examples, and interactive demos.
Infrastructure & Deployment
• 	Multi‑container architecture (frontend, backend, MySQL, Ollama).
• 	Environment‑specific configuration via , , .
• 	Persistent MySQL volumes for all environments.
• 	Automatic EF Core migrations on backend startup.
• 	Dev‑only database seeding for sample data.

Architecture Diagram

┌──────────────────────────┐        ┌──────────────────────────┐
│      Next.js Frontend    │        │     .NET 8 Web API       │
│(NextClientApp, port 3000)|◄──────►| (NextJS1, port 5000)     │
│                          │        │                          │
└──────────────▲───────────┘        └──────────────┬───────────┘
               │                                   │
               │                                   │
               │                                   ▼
        User Browser                          ┌──────────────────┐
                                              │     MySQL DB     │
                                              │ (Persistent Vol) │
                                              └──────────────────┘
                                                      │
                                                      ▼
                                              ┌──────────────────┐
                                              │     Ollama LLM   │
                                              │ (phi3:mini, etc.)│
                                              └──────────────────┘


    Each project contains its own documentation, while this root README explains the full architecture.

    Technology Stack
Frontend
• 	Next.js 15 (App Router)
• 	React 19
• 	TypeScript
• 	TailwindCSS
• 	Server Actions, SSR, SSG, ISR
Backend
• 	.NET 8 Web API
• 	Clean Architecture (Domain, Application, Infrastructure, API)
• 	EF Core + MySQL
• 	ML.NET models (regression, binary, multiclass)
• 	Ollama LLM integration
• 	Serilog logging
• 	JWT authentication
• 	xUnit tests

Infrastructure
• 	Environment‑specific  files
• 	Persistent MySQL volumes

OpenAI Integration (Optional)
The backend includes an optional integration with OpenAI’s chat models, 
allowing the API to generate cloud‑based conversational responses. 
When an API key is provided, a lightweight /api/chat  endpoint can forward user 
messages to an OpenAI model and return the assistant’s reply. This feature
serves as a simple extension point for adding intelligent chat capabilities
alongside the existing local LLM (Ollama) support.

Running the Full Stack
Running the project becomes manual:
• 	.NET 8  must be installed locally.
• 	Node.js must be installed for the frontend.
• 	MySQL must be installed and configured manually.
• 	Ollama must be installed separately if LLM features are used.
  Access the applications
• 	Frontend: http://localhost:3000
• 	Backend API + Swagger: http://localhost:5000/swagger
• 	Ollama (local LLM): http://localhost:11434 (if enabled)

Environment Strategy
Each environment uses its own:
• 	MySQL database name
• 	MySQL volume
• 	Credentials
• 	Backend/Frontend URLs


Project Goals
This repository demonstrates:
- A realistic full‑stack architecture.
- Integration of ML.NET and LLMs into a modern web application.
- Clean, maintainable backend design.
- Modern React 19 and Next.js 15 patterns.

 How to Run the Full‑Stack Project Manually (Without Docker)
This guide explains how to run the backend (.NET 8 Web API) and frontend (Next.js 15 + React 19)
 manually on your machine without using containerization.

1.  Prerequisites
Make sure you have the following installed:
Backend Requirements
• 	.NET 8 SDK
• 	MySQL Server (8.x recommended)
• 	MySQL Workbench (optional)
• 	Ollama (optional, required for LLM features)
Frontend Requirements
• 	Node.js 18+ (20 recommended)
• 	npm or yarn

2.  Configure MySQL
Create a database manually:
1. 	Open MySQL Workbench or terminal.
2. 	Run: CREATE DATABASE nextdb_dev;
Create a MySQL user (if needed):
CREATE USER 'devuser'@'%' IDENTIFIED BY 'devpassword';
GRANT ALL PRIVILEGES ON nextdb_dev.* TO 'devuser'@'%';
FLUSH PRIVILEGES;

Update backend connection string
In : NextJS1/appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=nextdb_dev;User=devuser;Password=devpassword;"
  }
}
3.  (Optional) Install Ollama for LLM Features
If you want to use the LLM endpoints:
1. 	Install Ollama:
https://ollama.com/download
2. 	Pull the model used in backend:

3. 	Start Ollama (it runs automatically in the background).

4.  Run the Backend (.NET 8 API)
Open a terminal in the backend folder:
cd NextJS1
dotnet restore
dotnet ef database update   # applies migrations
dotnet run
The API will start at: http://localhost:5000
Swagger UI: http://localhost:5000/swagger

5.  Run the Frontend (Next.js 15)
Open a second terminal:
cd NextClientApp
npm install
npm run dev
The frontend will start at:http://localhost:3000
Configure API URL:
Create a .env.local file in : NextClientApp/
NEXT_PUBLIC_API_URL=http://localhost:5000

6. 🧪 Test the Full‑Stack Flow
Products CRUD
• 	Open 
• 	Create, edit, delete products
• 	Data is stored in MySQL
ML.NET Predictions
• 	Regression
• 	Binary classification
• 	Multiclass classification
LLM (Ollama)
• 	Chat
• 	Text analysis
• 	Q&A
Everything should work end‑to‑end.

. 🧹 Troubleshooting
Backend cannot connect to MySQL
• 	Ensure MySQL is running
• 	Check username/password
• 	Ensure port 3306 is open
Ollama errors
• 	Make sure Ollama is installed
• 	Run ollama list to verify models
• 	Pull the required model again
Frontend cannot reach backend
• 	Check NEXT_PUBLIC_API_URL
• 	Ensure backend is running on port 5000








