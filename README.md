# Blackmarket Inc

![Blackmarket Inc](https://img.shields.io/badge/Blackmarket-Inc-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF)

Blackmarket Inc is a student auction platform developed as my Semester Project 2 at Noroff.

The application allows visitors to browse and search auction listings without an account. Registered Noroff students can create and manage listings, place bids using virtual credits, and manage their profile.

The project uses the Noroff Auction House API for authentication, profiles, listings and bidding.

---

## Live Website

The application is deployed using GitHub Pages:

**Live site:**  
https://nd-nitro.github.io/steffen_heltne_sp2_mar25ft/

---

## Features

### Visitors

Visitors can:

- Browse active auction listings
- Search listings
- Filter listings by category
- Sort listings
- View individual listing details
- View bid history
- Register using a `@stud.noroff.no` email address
- Log in to an existing account

### Registered Users

Authenticated users can:

- Log in and log out
- View their current credits
- Create auction listings
- Add multiple images to a listing
- Set an auction deadline
- Edit their own listings
- Delete their own listings
- Place bids on listings created by other users
- View bid history
- View their profile
- Edit their bio
- Edit their avatar
- Edit their profile banner
- View their own listings
- View listings they have bid on

---

## Built With

The project was created using:

- HTML5
- Vanilla JavaScript
- Tailwind CSS
- Vite
- Noroff API v2
- Git
- GitHub
- GitHub Pages
- ESLint
- Prettier

No JavaScript frontend framework is used.

---

## Noroff API

The application uses the Noroff API v2 Auction House.

Main API functionality used in the project includes:

- Authentication
- API key creation
- Auction listings
- Individual listing data
- Creating listings
- Updating listings
- Deleting listings
- Bidding
- Profiles
- Profile updates
- Profile listings
- Profile bids

API base URL:

```text
https://v2.api.noroff.dev
```

---

## Getting Started

Follow these instructions to run the project locally.

### 1. Clone the repository

Open a terminal and run:

```bash
git clone https://github.com/ND-Nitro/steffen_heltne_sp2_mar25ft.git
```

### 2. Navigate to the project

```bash
cd steffen_heltne_sp2_mar25ft
```

### 3. Install dependencies

Make sure Node.js and npm are installed.

Then run:

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will display a local development URL in the terminal.

It will normally look similar to:

```text
http://localhost:5173/
```

Open the URL shown by Vite in your browser.

---

## Production Build

To create a production build:

```bash
npm run build
```

The production files are generated inside:

```text
dist/
```

The project uses a Vite multi-page configuration so all application pages are included in the production build.

You can preview the production build locally with:

```bash
npm run preview
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Build

```bash
npm run build
```

Creates the production build.

### Preview

```bash
npm run preview
```

Runs the production build locally for testing.

### ESLint

```bash
npm run lint
```

Checks the JavaScript code for linting errors.

### Prettier

Format the project:

```bash
npm run format
```

Check formatting without changing files:

```bash
npm run format:check
```

---

## Project Structure

```text
.
├── index.html
├── listing.html
├── login.html
├── register.html
├── profile.html
├── create.html
├── edit.html
│
├── src/
│   ├── api/
│   │   ├── auth/
│   │   ├── listings/
│   │   └── profile/
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── utils/
│   │
│   ├── main.js
│   ├── listingMain.js
│   ├── loginMain.js
│   ├── registerMain.js
│   ├── profileMain.js
│   ├── createMain.js
│   ├── editMain.js
│   └── style.css
│
├── eslint.config.js
├── vite.config.js
├── package.json
└── README.md
```

### `api/`

Contains functions responsible for communicating with the Noroff API.

The API logic is separated into:

- Authentication
- Listings
- Profiles

### `components/`

Contains reusable UI components such as:

- Navbar
- Featured listing
- Listing cards
- Search bar
- Category filters
- Sorting controls
- Footer

### `pages/`

Contains page-specific JavaScript and functionality.

### `utils/`

Contains reusable helper functions used throughout the application.

---

## Authentication

Only users with a valid Noroff student email can register:

```text
@stud.noroff.no
```

After login, authentication information is stored locally and used when making authenticated requests to the Noroff API.

The application uses both:

- Bearer access token
- Noroff API key

Authenticated functionality includes creating listings, editing listings, deleting listings, bidding and updating the user's profile.

---

## Auction Credits

Registered users receive virtual credits through the Noroff Auction House API.

Credits can be used to place bids on listings.

The current credit balance is displayed in the navigation bar while the user is logged in.

---

## Listing Media

Users can add multiple image URLs when creating an auction listing.

On the listing detail page, the images are displayed as a gallery where additional images can be selected.

Images must use publicly accessible image URLs.

---

## GitHub Pages

The application is deployed through the `gh-pages` branch.

The source code is maintained on the `main` branch.

Because GitHub Pages hosts project repositories inside a repository-specific path, the application uses the Vite base URL and a reusable path helper to make internal navigation work both locally and on GitHub Pages.

---

## Code Quality

The project uses:

- ESLint for JavaScript linting
- Prettier for consistent formatting
- JSDoc for documenting important functions
- Feature branches for development
- Production builds through Vite

Before deployment, the project can be checked with:

```bash
npm run format:check
npm run lint
npm run build
```

---

## Development Workflow

The project was developed using Git feature branches.

Features were developed and tested separately before being merged into `main`.

Examples include:

- Authentication
- Registration
- Listing creation
- Listing editing and deletion
- Bidding
- Profile functionality
- Media gallery
- GitHub Pages deployment
- JSDoc documentation

This workflow helped isolate changes and made debugging easier during development.

---

## Accessibility

Accessibility and usability were considered throughout development, including:

- Semantic HTML
- Form labels
- Alternative text for images
- Keyboard-accessible buttons and links
- Clear error messages
- Responsive layouts
- Appropriate HTML element usage

---

## Design

The interface was designed in Figma before and during development.

The goal was to create a clean and responsive auction platform that works across desktop and mobile devices.

---

## Author

**Steffen Heltne**

Frontend Development student at Noroff.

GitHub:  
https://github.com/ND-Nitro
