# Premium Futuristic Portfolio

A premium personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- Futuristic glassmorphism design with animated gradients
- Scroll reveal animations and parallax movement
- Project filtering with interactive cards
- Skills visualization and animated timeline
- Contact form with validation
- Dark/light theme toggle
- Custom cursor and scroll progress indicator
- Fully responsive layout

## Tech Stack

- React (hooks + functional components)
- Vite
- Tailwind CSS
- Framer Motion
- React Icons + Lucide Icons

## Run Locally

1. Install dependencies:

   npm install

2. Start development server:

   npm run dev

3. Build for production:

   npm run build

4. Preview production build:

   npm run preview

## Structure

- src/components/ui: Reusable UI primitives (Button, Card, Badge, SectionWrapper)
- src/features: Feature modules (hero, about, projects, skills, experience, contact)
- src/layouts: Main layout wrappers (navbar, footer, global overlays)
- src/pages: Page composition layer
- src/context: Global state providers (theme)
- src/hooks: Reusable custom hooks (scroll progress/animations)
- src/data: Portfolio content data
- src/utils: Shared helper functions
- src/index.css: Global styles, theme tokens, utility classes

## Customize

- Edit your personal content in src/data/portfolioData.js
- Update hero text in src/features/hero/HeroSection.jsx
- Replace project links and images in src/data/portfolioData.js
- Update social links in src/features/contact/components/ContactLinks.jsx

## Automatic Netlify deployment

The build settings are stored in `netlify.toml`.

To enable automatic updates for the existing Netlify site:

1. Open the site in Netlify and go to Project configuration > Developer settings > Continuous deployment > Repository.
2. Select Link repository and choose `saadas09/final-portfolio` on GitHub.
3. Set the production branch to `main`, the build command to `npm run build`, and the publish directory to `dist`.

After connecting the repository, each push to `main` triggers a new build and deployment to the existing site URL. Saving files locally does not publish them; commit and push the changes when they are ready.
