# Sahil Singh — Personal Portfolio Website

A cinematic, editorial, and interactive digital portfolio engineered for **Sahil Singh**, Data Analyst specializing in **Data Analytics, Business Intelligence, Data Visualization, and GenAI / RAG systems**.

---

## ✦ Key Highlights & Architecture

- **Primary Visual Identity**:
  - Head-only avatar isolated with precision transparency (`/avatar_transparent.webp` and `/avatar_transparent.png`).
  - Floating 3D tilt, ambient crimson lighting, and seamless parallax integration.
  - Multi-pose extensible architecture via `src/data/avatarConfig.js`.

- **Cinematic Interactions**:
  - **Custom Glowing Cursor** on desktop with magnetic tracking and contextual states (`VIEW PROJECT →`). Automatically disabled on touch/mobile devices.
  - **Initial Loading Experience**: Minimalist system initialization, progress indicator, and smooth avatar reveal.
  - **Smooth Momentum Scrolling**: Integrated Lenis scroll synced with GSAP ScrollTrigger.
  - **Sticky Capabilities Stream**: Pinned viewport transitioning through *Data Analytics*, *Business Intelligence*, *Data Engineering*, and *GenAI / RAG* without fake percentage bars.
  - **Horizontal Interactive Projects**: Showcase for **RetainRAG** (7,043 customers, 50 features, 9 phases) and **DataCo Supply Chain Analytics** (180K+ orders, 53 columns, 5 markets, 23 regions, 50 categories) with interactive architecture modals.
  - **Interactive 3D Digital Globe**: Three.js Earth wireframe with crimson orbital nodes rotating progressively to reveal LinkedIn, GitHub, Email, and Resume.
  - **Magnetic Final CTA**: "LET'S BUILD SOMETHING USEFUL" with magnetic pull and quick collaboration dialog.
  - **Audio Synthesis**: Optional Web Audio API micro-sound feedback with mute toggle.

---

## ✦ Project Structure

```
├── public/
│   ├── avatar.png                  # Original personal avatar
│   ├── avatar_transparent.png      # Background-isolated PNG avatar (head-only)
│   ├── avatar_transparent.webp     # Ultra-fast high-fidelity WebP avatar
│   ├── favicon.svg                 # Custom minimalist monogram favicon
│   └── resume.pdf                  # (Optional) Drop your PDF resume here
│
├── src/
│   ├── components/
│   │   ├── AvatarHead.jsx          # Floating head-only avatar with 3D tilt & crimson glow
│   │   ├── CustomCursor.jsx        # Glowing desktop cursor with contextual states
│   │   ├── CinematicLoader.jsx     # Initial loading sequence
│   │   ├── Navbar.jsx              # Luxury editorial navbar & audio toggle
│   │   ├── Hero.jsx                # Asymmetric hero with mouse parallax & scroll transform
│   │   ├── WhoIAm.jsx              # Editorial layout with scroll-driven text reveals
│   │   ├── WhatCanIDo.jsx          # Sticky pinned scroll through 4 analytical domains
│   │   ├── RecentWork.jsx          # Horizontal case studies with metric counters
│   │   ├── ProjectModal.jsx        # Project deep-dive modal (architecture & pipelines)
│   │   ├── Experience.jsx          # IFDA Institute vertical timeline with glowing track
│   │   ├── TechMarquee.jsx         # Continuous scroll-accelerated toolkit ribbon
│   │   ├── DigitalGlobe.jsx        # Three.js 3D globe rotating through social stages
│   │   ├── ContactCTA.jsx          # Magnetic "LET'S TALK →" button & inquiry modal
│   │   ├── ResumeModal.jsx         # Executive resume viewer & print trigger
│   │   └── Footer.jsx              # Minimal footer with live IST clock & back-to-top
│   │
│   ├── data/
│   │   ├── portfolioData.js        # Single factual data source (strict, no invented facts)
│   │   └── avatarConfig.js         # Extensible avatar poses and lighting config
│   │
│   ├── hooks/
│   │   ├── useLenis.js             # Momentum scroll hooked to GSAP
│   │   ├── useReducedMotion.js     # Accessibility media query detector
│   │   └── useAudioCue.js          # Web Audio synthesized UI feedback
│   │
│   ├── styles/
│   │   └── index.css               # Tailwind v4, Syne/Space Grotesk typography, crimson glows
│   │
│   ├── App.jsx                     # Continuous single-experience orchestrator
│   └── main.jsx                    # React root entry
│
├── index.html                      # SEO metadata and font preconnects
├── vite.config.js                  # Vite & Tailwind configuration
└── package.json                    # Project configuration & scripts
```

---

## ✦ Getting Started

### 1. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000/`.

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## ✦ How to Update Content Later

1. **Add Social & Repository Links**:
   Open `src/data/portfolioData.js` and insert your exact LinkedIn URL, GitHub URL, and email.

2. **Add Your PDF Resume**:
   Drop your PDF file into the `public/` folder as `public/resume.pdf`.

3. **Add Additional Avatar Poses**:
   Open `src/data/avatarConfig.js` and add new head-only assets into the `alternativePoses` array.
