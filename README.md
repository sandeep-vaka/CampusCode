# CampusCode

CampusCode is a student-focused campus coding and hackathon website built with React and Vite. It presents a landing page for a hackathon "arena", lets visitors browse sample hackathons, and includes demo sign-up, login and dashboard pages.

> **Status:** frontend-only demo. There is no backend, database or API, and sign-in is simulated. See [Application Limitations](#application-limitations).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Application Limitations](#application-limitations)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

The goal of CampusCode is to give students one place to discover hackathons, find teammates, build projects and submit them. The current version is a frontend that demonstrates the design and user flow. All hackathons, builders and dates shown in the app are sample content stored in the source code, not real data.

## Features

These are implemented in the current code.

**Landing page (`/`)**
- Hero section, scrolling keyword marquee, About, a video section, How It Works (Discover, Team Up, Build, Ship), a Hackathons list, a mission statement, Community and a call to action, followed by a footer.
- The video section plays a short clip automatically when it is in view, pauses when scrolled away, and can be clicked to unmute, pause or play. Users who prefer reduced motion see a poster image instead of autoplay.
- Scroll-triggered reveal animations, page transitions and a purple cursor glow (the glow is disabled on touch devices and for reduced motion).

**Pages and routing**
- `/login` and `/signup` with form validation (email format, name and college length, password of 8+ characters with a letter and a number, matching confirmation, accepting terms).
- `/dashboard`, available only when signed in. It shows summary tiles, a hackathon list with Register buttons, "Team up" invite buttons, a profile card with log out, and an activity feed.
- `/hackathons/:slug` detail pages for three sample hackathons: `ai-innovation`, `future-web` and `campus-tech`.
- `/info/:slug` placeholder pages for footer links (for example `students`, `faq`, `terms`).
- A custom 404 page for unknown routes.

**Accessibility and usability**
- Skip-to-content link, visible keyboard focus outlines, a mobile menu that closes with Escape, and a separate page title for each route.
- Responsive layout checked from phone to desktop widths.

**Demo account and state**
- A "Use demo account" button signs in as a sample user.
- Registrations, invites and activity are saved in the browser, so they remain after a reload.

## Screenshots

Screenshots are not included yet. To add them:

1. Run the app locally (`npm run dev`) and take screenshots of the pages you want to show, such as the landing page, login, dashboard and a hackathon detail page.
2. Create a folder for them, for example `docs/screenshots/`, and save the images there.
3. Replace the placeholders below with image links that use your real file names.

```markdown
![Landing page](docs/screenshots/your-file-name.png)
```

| Page | Screenshot |
|------|------------|
| Landing page | _Add screenshot_ |
| Login / Sign up | _Add screenshot_ |
| Dashboard | _Add screenshot_ |
| Hackathon detail | _Add screenshot_ |

## Tech Stack

These come from `package.json`.

| Technology | Version range | Purpose |
|------------|---------------|---------|
| [React](https://react.dev/) | ^19.3.1 | UI library |
| [Vite](https://vite.dev/) | ^8.3.6 | Development server and build tool |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.3.4 | Styling, added through the `@tailwindcss/vite` plugin |
| [React Router](https://reactrouter.com/) (`react-router-dom`) | ^7.18.5 | Client-side routing |
| [Framer Motion](https://www.framer.com/motion/) | ^14.9.1 | Animations |
| [Lucide React](https://lucide.dev/) | ^1.69.0 | Icons |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | ^1.90.0 | Linting |

The fonts Inter, DM Mono and Anton are loaded from Google Fonts in `index.html`.

## Project Structure

```text
campuscode/
├── public/                 Static files served as-is
│   ├── favicon.svg
│   ├── icons.svg
│   └── videos/             Video and poster image for the landing page
├── src/
│   ├── main.jsx            App entry point
│   ├── App.jsx             Route definitions
│   ├── components/         Page sections and reusable UI parts
│   ├── pages/              One file per route (Home, Login, Signup, Dashboard, ...)
│   ├── layouts/            Shared layout (navbar, footer, page title)
│   ├── context/            Mock session and app state
│   ├── data/mockData.js    All sample content (hackathons, builders, info pages)
│   ├── hooks/              Form, document title and cursor glow hooks
│   ├── lib/                Validation, localStorage and animation helpers
│   └── styles/             Global styles, design tokens and animations
├── index.html              HTML template
├── vite.config.js          Vite configuration (React and Tailwind plugins)
├── vercel.json             Vercel configuration (see Deployment)
└── package.json            Dependencies and scripts
```

## Installation and Setup

You need [Node.js](https://nodejs.org/) and npm. Vite 8 requires Node `^20.19.0` or `>=22.12.0`.

1. Clone the repository (replace the URL with your own):

   ```bash
   git clone https://github.com/<your-username>/<your-repository>.git
   ```

2. Go into the project folder. This is the folder that contains `package.json`:

   ```bash
   cd campuscode
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local address shown in the terminal. Vite usually uses `http://localhost:5173`.

No environment variables or API keys are needed.

## Available Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally (run `npm run build` first) |
| `npm run lint` | Checks the code with Oxlint |

## Deployment

The project is a static site, so it can be hosted on [Vercel](https://vercel.com/) without any server setup.

`vercel.json` contains a rewrite that sends every URL to `index.html`. This is needed because the app uses client-side routing: without it, refreshing or directly opening a URL such as `/login` would return a 404.

**Settings**

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Root Directory | The folder that contains `package.json` and `vercel.json`. If the repository root is the project folder, leave it blank. If the project sits inside a `campuscode` folder in the repository, enter `campuscode`. |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | 20.19+ or 22.12+ (22.x recommended) |
| Environment Variables | None |

**Steps**

1. Push the project to a GitHub repository. Do not commit `node_modules` or `dist` (they are already in `.gitignore`).
2. Sign in to Vercel and choose **Add New > Project**.
3. Import the GitHub repository.
4. Enter the settings above and click **Deploy**.
5. When the deployment finishes, open the live URL, then refresh on `/login` and open `/dashboard` directly to confirm routing works.

## Application Limitations

CampusCode is a frontend demo and is **not production-ready**.

- **No backend.** There is no server, database or API. Nothing is sent over the network by the app itself.
- **Mock authentication.** Login accepts any email and password and is labelled "Demo mode" in the interface. No passwords are stored or checked. This is not secure and must not be used to protect real data.
- **localStorage persistence.** The session, registered profiles, hackathon registrations, invites and activity are stored in your browser under one key, `campuscode.v1`. Data stays on that browser and device only, is not shared between users, does not sync between tabs, and disappears if you clear site data. Accounts created locally will not exist on a deployed site, because it has a different origin.
- **Sample content.** Hackathon names, dates, prizes, builders, the demo user and the info page text are placeholders in `src/data/mockData.js`.
- **Invented dashboard numbers.** The points total on the dashboard is calculated by a simple formula in the code and has no real meaning. "Team up" invites only change the interface.
- **No automated tests** are included in the repository.
- **Accessibility** was checked with scripted browser tests and keyboard use only. It has not been tested with a screen reader. The landing page video has a text description but no captions.

## Future Improvements

These are ideas only. None of them are implemented.

- A real backend and database with secure authentication
- Real hackathon data managed by organizers
- Team formation, with accepted invites and shared project submissions
- Round submissions and scoring for judges
- Captions for the landing page video
- Automated tests
- A focus trap for the mobile menu and a full screen reader review

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-change`
3. Make your changes and run `npm run lint` and `npm run build` to check them.
4. Commit with a clear message and push the branch.
5. Open a pull request describing what you changed and why.

For larger changes, open an issue first so the idea can be discussed.

