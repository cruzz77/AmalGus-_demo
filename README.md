# AmalGus Glass Marketplace Prototype

AmalGus is a high-performance, AI-driven discovery and matching platform designed for the glass and allied materials industry. It leverages Large Language Models (LLMs) to bridge the gap between complex natural language requirements and technical product specifications, ensuring buyers find the perfect glass match for their structural, aesthetic, and functional needs.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4 with a custom "Glassmorphism" design system
- **Animations**: Framer Motion for fluid UI transitions
- **3D Graphics**: Spline 3D for immersive visual experiences
- **Icons**: Lucide React
- **API Client**: Axios

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: Groq SDK for ultra-low latency LLM inference

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: A running instance (local or MongoDB Atlas)
- **Groq API Key**: Obtainable from [Groq Cloud](https://console.groq.com/)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Create a `.env` file:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   MONGO_URI=your_mongodb_connection_string_here
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *Note: The system will automatically seed the database with 15 baseline products if the collection is empty.*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:5173`.

---

## 🧠 Intelligent Matching Engine

AmalGus employs a **hybrid dual-layer matching architecture** to ensure reliability and precision:

1.  **Backend AI Layer (Primary)**: 
    When a query is submitted, the backend fetches candidates from MongoDB and passes them to the **Llama 3 70B** model via Groq. The AI performs a qualitative analysis of technical specs (thickness, coatings, U-values, certifications) against the user's intent to generate a match score and a natural language explanation.

2.  **Frontend Fallback Layer (Resilience)**: 
    If the backend is unreachable or the AI engine fails, the application immediately switches to a **client-side matching algorithm**. This algorithm uses keyword proximity, numerical spec matching (e.g., thickness parsing), and category mapping to provide high-quality results without any downtime.

---

## 🤖 AI Tools & Implementation

- **Groq (Llama 3 70B)**: Used as the core reasoning engine. Its high-token throughput allows for real-time ranking of product candidates with detailed justifications.
- **Antigravity AI**: Served as the lead architect and developer for end-to-end implementation, refactoring the codebase for ES Modules consistency, and implementing the "Always-Visible" frontend resilience logic.

---

## ⚖️ Key Assumptions & Trade-offs

- **UX Over Strict Consistency**: We implemented a hardcoded `src/data/products.js` fallback. This ensures that the "Discovery" page never appears empty, prioritizing user engagement over a strict "backend-only" data flow.
- **Zero-Configuration Seeding**: The backend assumes that if the database is empty, the developer wants a baseline dataset. We implemented automatic idempotent seeding on startup to eliminate manual setup steps.
- **Explainable AI (XAI)**: We prioritized providing a text-based "AI Insight" for every match. This builds trust with B2B buyers by explaining *why* a $3,000 IGU unit matches their energy-efficiency query.
- **Performance vs. Complexity**: We opted for direct LLM ranking rather than vector embeddings (RAG) for this prototype to maintain ultra-fast response times and simplify the deployment architecture while maintaining high accuracy for the initial 100-item scale.
