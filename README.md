# ProjectHub-Frontend

A modern front-end application for the ProjectHub platform, built using React, Vite and Tailwind CSS.  
This repo handles the client side of [ProjectHub](https://github.com/sanjay-2003-ss/Projecthub-frontend) where users can create, view, edit and share projects.

## 🛠️ Tech Stack

- **React** (functional components + hooks)  
- **Vite** for fast dev build & HMR  
- **Tailwind CSS** for utility-first styling  
- **Framer Motion** for smooth animations  
- **Firebase Auth** for user authentication  
- Custom API wrapper (`src/utils/api`) to communicate with backend  

## 🚀 Getting Started

### Prerequisites  
- Node.js (version 16 +)  
- npm or yarn  
- A running backend API instance (ensure the endpoints your front-end hits are available)  

✅ Key Features

*User registration & login via Firebase Auth.
*CRUD operations for projects (create, read, update, delete).
*Tag input (comma-separated) for projects, parsed into arrays.
*GitHub link + optional live demo link for each project.
*Animation effects using Framer Motion for UI interactions.
*Responsive layout and styling with Tailwind CSS.
*Protected routes: only logged-in users can create/edit/manage their projects.

API error handling and loading states in forms.

### Setup & Run  
```bash
# 1. Clone this repo
git clone https://github.com/sanjay-2003-ss/Projecthub-frontend.git
cd Projecthub-frontend

# 2. Install dependencies
npm install   # or yarn

# 3. Configure environment variables
# Create a `.env` file in the root (see .env.example) and set:
# VITE_API_BASE_URL=your_backend_url
# VITE_FIREBASE_API_KEY=…
# VITE_FIREBASE_AUTH_DOMAIN=…
# VITE_FIREBASE_PROJECT_ID=…
# etc.

# 4. Run in development mode
npm run dev   # or yarn dev

/
├── public/           # Static public assets
├── src/
│   ├── components/   # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/        # Route pages (Home, Login, CreateProject, MyProjects, etc.)
│   ├── utils/        # Utility modules (api wrapper, firebase config)
│   ├── App.jsx       # Root app & routing logic
│   └── main.jsx      # Entry point
├── tailwind.config.js
├── vite.config.js
└── README.md

# 5. Build for production
npm run build
