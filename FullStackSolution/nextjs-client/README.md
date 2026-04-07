<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Server%20Actions-Next.js-000000?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/SSR%2FSSG%2FISR-Rendering-000000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/REST%20API-.NET%20Backend-512BD4?style=for-the-badge&logo=dotnet" />
</p>

<h1 align="center">NextJS Demo Front‑end Project</h1>

Next.js 15 + React 19 Frontend for Full‑Stack Demo
This project is a modern frontend application built with Next.js 15 (App Router) and React 19,
designed to integrate seamlessly with a .NET 8 backend. It demonstrates server‑side rendering,
client‑side interactivity, server actions, and real‑time communication with machine‑learning 
and LLM‑powered backend endpoints.
The UI includes product management, ML.NET prediction tools, LLM chat, and interactive demos 
that showcase the capabilities of a full‑stack system.

Key Features
Product Management
• 	Full CRUD UI for Product entities.
• 	Real‑time updates using React 19 features.
• 	Form validation and optimistic UI patterns.
Rendering & React 19
• 	Server Components and Client Components used where appropriate.
• 	Server Actions for form submissions and mutations.
• 	Examples of SSR, SSG, and ISR for different pages.
• 	React 19 transitions and form status demos.
ML.NET Integration
• 	UI for regression, binary classification, and multiclass classification predictions.
• 	Interactive forms that send data to backend ML models.
• 	Real‑time display of prediction results.
LLM (Ollama) Integration
• 	Chat interface for interacting with local LLM models.
• 	Text analysis and question‑answering UI.
• 	Streaming responses (if enabled by backend).
Developer Experience
• 	TailwindCSS for styling.
• 	API client utilities for clean backend communication.
• 	Clear folder structure for scalable development.
• 	Fully integrated with the .NET backend for a unified full‑stack demo.

Tech Stack Overview

| Technology             | Purpose                                                            |
|------------------------|--------------------------------------------------------------------| 
| Next.js 15             | App Router, SSR/SSG/ISR, server actions                            |
| React 19               | Modern UI with transitions and form status                         |
| TypeScript             | Type‑safe frontend development                                     |
| TailwindCSS            | Utility‑first styling                                              |
| Next.js Server Actions | Backend mutations without API routes				                  |
| REST API Integration   | Communication with .NET backend                                    |
| Ollama UI              | LLM chat and NLP tools                                             |
| ML.NET UI              | Prediction forms and result visualization                          |                                           

Project Structure

NextClientApp/
│
├── app/                 # App Router pages and layouts
│   ├── products/        # Product CRUD UI
│   ├── ml/              # ML.NET prediction pages
│   ├── llm/             # LLM chat and analysis UI
│   └── api/             # Server actions (if used)
│
├── components/          # Reusable UI components
├── lib/                 # API clients, helpers, utilities
├── public/              # Static assets
└── styles/              # Global styles (Tailwind)

Pages & Modules
Products
• 	List, create, update, delete products.
• 	Uses server actions for mutations.
• 	Demonstrates React 19 form status and transitions.
ML.NET Tools
• 	Regression prediction form.
• 	Binary classification (sentiment analysis).
• 	Multiclass classification (text categorization).
• 	Clean UI for sending structured data to backend models.
LLM Chat
• 	Chat interface for interacting with Ollama.
• 	Text analysis and Q&A tools.
• 	Supports streaming responses (if backend enabled).
Demo Pages
• 	SSR example page.
• 	SSG example page.
• 	ISR example page.
• 	React 19 interactive demos.

Running the Project

Install dependencies
npm install
Start development server
npm run dev
Open in browser
http://localhost:3000

Backend Integration
The frontend communicates with the .NET backend for:
• 	Product CRUD operations
• 	ML.NET predictions
• 	LLM chat and analysis
• 	Authentication (if enabled)
All API URLs are configured through environment variables for each environment (dev/stage/prod).

Full‑Stack Experience
This frontend is designed to work together with the NextJS1 backend project to demonstrate:
• 	Modern full‑stack architecture
• 	Machine learning integration
• 	Local LLM workflows
• 	Clean separation of concerns
• 	Real‑world development patterns






































This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
