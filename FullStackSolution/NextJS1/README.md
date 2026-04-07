<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql" />
  <img src="https://img.shields.io/badge/EF%20Core-ORM-512BD4?style=for-the-badge&logo=dotnet" />
  <img src="https://img.shields.io/badge/ML.NET-Machine%20Learning-512BD4?style=for-the-badge&logo=dotnet" />
  <img src="https://img.shields.io/badge/Ollama-LLM-000000?style=for-the-badge&logo=ollama" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/Swagger-API%20Docs-85EA2D?style=for-the-badge&logo=swagger" />
  <img src="https://img.shields.io/badge/Serilog-Logging-0ABF53?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Clean%20Architecture-SOLID-4CAF50?style=for-the-badge" />
</p>

<h1 align="center">NextJS Demo Back‑end Project</h1>

.NET 8 Web API with MySQL, ML.NET, and LLM (Ollama) This project is a backend service
built with .NET 8 Web API,designed to demonstrate modern backend development patterns,
machine learning integration, and LLM‑powered features.It supports CRUD operations,
predictive analytics, natural‑language processing, and secure authentication.
The API is fully integrated with a Next.js frontend for a complete full‑stack demo experience.

Key Features
Data & CRUD
• 	Full CRUD operations for Product entities stored in a MySQL database.
• 	MySQL integration using the official MySQL Connector/NET.
• 	Automatic EF Core migrations on startup (per environment).
Machine Learning (ML.NET)
• 	Regression models (e.g., price prediction).
• 	Binary classification (e.g., sentiment analysis).
• 	Multiclass classification (e.g., text categorization).
• 	Pretrained ML.NET model samples included.
LLM Integration (Ollama)
• 	Local LLM inference using Ollama.
• 	Supports models such as phi3:mini.
• 	Natural‑language processing endpoints for:
• 	Text analysis
• 	Question answering
• 	Chat‑style interactions
Security & Architecture
• 	JWT‑based authentication with login endpoint.
• 	Clean Architecture principles:
• 	Domain
• 	Application
• 	Infrastructure
• 	API
• 	SOLID‑compliant service and repository structure.
• 	Serilog logging for structured logs.
Developer Experience
• 	Swagger UI with built‑in JWT authentication support.
• 	xUnit test project for unit testing.
• 	Seamless integration with a Next.js frontend.

Tech Stack Overview

| Technology             | Purpose                                                            |
|------------------------|--------------------------------------------------------------------| 
| .NET 8 Web API         | Backend framework                                                  |
| MySQL                  | Relational database for persistent storage                         |
| EF Core                | ORM with automatic migrations                                      |
| ML.NET                 | Regression, binary, and multiclass ML models                       |
| Ollama (phi3:mini)     | Local LLM for NLP tasks							                  |
| Swagger / Swashbuckle  | API Documentation                                                  |
| Serilog                | Structured logging                                                 |
| JWT Authentication     | Secure token‑based access                                          |                                           
| xUnit			         | Unit testing                                                       |
| Clean Architecture     | Mocking library for handler tests                                  |
| Next.js Integration    | Integration testing infrastructure                                 |
| Clean Architecture     | Full‑stack demo with modern frontend                               |                                  |
 
Project Structure
NextJS1/
│
├── API/                 # Controllers, endpoints, Swagger
├── Application/         # Business logic, interfaces, DTOs
├── Domain/              # Entities, enums, core models
├── Infrastructure/      # EF Core, MySQL, ML.NET, Ollama services
├── tests/               # xUnit test project
└── Program.cs           # App startup, DI, middleware

Endpoints Overview
Products API
• Get all products: GET /api/products	
• Get product by ID: GET /api/products/{id}	
• Post new product: POST /api/products	
• Put update product: PUT /api/products/{id}	
• Delete product: DELETE /api/products/{id}	

ML.NET API
• Predict price: POST /api/ml/price
• Analyze sentiment: POST /api/ml/sentiment
• Categorize text: POST /api/ml/classify

LLM (Ollama) API
• Post /api/llm/analyze
• Post  /api/llm/chat

Authentication
• Login: POST /api/auth/login (returns JWT token)

Running the Project
1. Configure MySQL
Set environment variables or use Docker Compose (recommended).
2. Run the API
dotnet restore
dotnet run
3. Open Swagger UI
http://localhost:5000/swagger

Integration with Next.js Frontend
The backend is designed to work seamlessly with the NextClientApp project.
The frontend consumes:
- Product CRUD endpoints
- ML.NET prediction endpoints
- LLM chat endpoints
- JWT authentication
This creates a complete full‑stack demo showcasing modern .NET + Next.js development.


