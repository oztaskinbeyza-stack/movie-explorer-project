# 🌌 NovaStream - Premium Cinematic Experience

NovaStream is a highly optimized, aesthetically premium, and feature-rich movie and series exploration platform built with React and Tailwind CSS. It integrates seamlessly with TMDB for rich media data and utilizes Supabase for secure, real-time data persistence.

## 🚀 Tech Stack

- **Frontend Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS + Native CSS Variables
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Database & Auth:** Supabase (PostgreSQL)
- **Data Source:** TMDB (The Movie Database) API
- **State Management:** React Context API

## ✨ Key Features

- **Premium UI/UX Architecture:** A glassmorphic, dark-mode-first interface featuring an interactive, hardware-accelerated radial mouse-tracking glow effect and buttery smooth structural transitions.
- **Cinematic Expansion Cards:** Prime Video & Netflix-style intelligent hover cards that dynamically expand out of their scroll containers to reveal deep metadata, synopses, and quick action buttons.
- **AI-Driven Recommendation Engine:** A proprietary "Neural Engine" that calculates localized compatibility scores based on your active watchlist to deliver highly targeted movie and series recommendations.
- **Role-Based Authentication (RBAC):** Secure login, registration, and session persistence via Supabase Auth, supporting distinct user and administrative profiles.
- **Dynamic Watchlist Management:** Users can instantly bookmark titles to their personalized watchlist, intuitively categorizing them as "Plan to Watch," "Currently Watching," or "Already Watched."
- **Interactive Community Reviews:** Integrated comment, upvote, and reply system combining real-world TMDB reviews with internal user-generated platform reviews.
- **Performance Optimized:** 
  - Uses `requestAnimationFrame` and CSS `translate3d` transforms for lighting animations to completely eliminate layout thrashing.
  - Implements heavily memoized component rendering and custom Debounce algorithms for instantaneous search.
  - Responsive lazy-loading system for high-resolution TMDB backdrops and posters.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd film-projesi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your secret keys:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy

NovaStream departs from traditional "flat" UI templates by utilizing absolute depth, transparency, and micro-interactions. Key visual achievements include:
- **Ghost Layering:** Cinematic backdrop patterns that float seamlessly behind the primary content.
- **Typography:** Subpixel-perfect letter tracking combined with metallic CSS drop-shadows and vibrant cyan/indigo gradients.
- **Interactive Lighting:** Custom cursor lighting that maps soft radial gradients to the exact coordinates of the user without dropping frames.

## 📝 Milestone Documentation

This project represents a comprehensive leap from a basic Movie Explorer (Milestone 1) to a full-fledged, premium streaming service interface. It demonstrates advanced React architectural patterns, direct CSS DOM manipulation for high-refresh-rate animations, and robust third-party API orchestration.

---
*Content metadata provided by TMDB. Developed as an advanced full-stack React project.*