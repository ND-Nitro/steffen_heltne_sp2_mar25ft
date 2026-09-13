# AI Usage Log

This document describes how I used AI during the development of **Blackmarket Inc**, my Semester Project 2.

I used ChatGPT as a development assistant throughout the project. AI was mainly used for planning, explaining concepts, debugging, reviewing code, suggesting improvements, and helping with documentation.

All suggested solutions were implemented, tested, and adjusted as part of my own development process.

---

## AI Usage

### August–September 2026 — Project Structure and Planning

**Tool:** ChatGPT

I used AI to help plan the initial folder structure and separation of responsibilities in the application.

This included organizing the project into:

- API functions
- Components
- Page-specific JavaScript
- Utility functions

The suggestions helped me understand how separating responsibilities could make the application easier to maintain and debug. I adapted the structure to fit the requirements of my own project.

---

### August–September 2026 — Authentication and API Keys

**Tool:** ChatGPT

I used AI while implementing and debugging authentication with the Noroff API.

AI helped explain the relationship between:

- Access tokens
- Bearer authentication
- Noroff API keys
- Local storage

This helped me separate authentication functionality into reusable API functions.

I tested registration, login, logout, API key creation, and authenticated API requests during development.

---

### August–September 2026 — Creating, Editing and Deleting Listings

**Tool:** ChatGPT

I used AI to help debug API requests related to auction listings.

This included:

- Creating listings
- Updating listings
- Deleting listings
- Checking listing ownership
- Sending the correct request data to the API

AI was especially useful for identifying problems with request data and API responses.

I tested the functionality using listings created through my own account and adjusted the implementation when problems were discovered.

---

### September 2026 — Bidding and Bid History

**Tool:** ChatGPT

I used AI while implementing the auction bidding functionality.

AI helped with:

- Validating bid amounts
- Sending bid requests
- Comparing a new bid against the current highest bid
- Displaying bid history
- Identifying the leading bid

I tested bidding using different accounts to make sure users could bid on listings created by other users.

---

### September 2026 — Profile and Credits

**Tool:** ChatGPT

I used AI to help connect profile information from the Noroff API to the user interface.

This included:

- Displaying profile information
- Displaying the user's current credits
- Updating avatar, banner and bio
- Showing listings created by the user
- Showing listings the user had bid on

One issue was that the locally stored user information did not always contain the latest credit balance. I changed the implementation so the current profile information could be fetched from the API.

---

### September 2026 — Listing Media Gallery

**Tool:** ChatGPT

I used AI to help extend the listing media functionality.

The original implementation mainly handled a single image. I expanded the create listing form to support multiple image URLs.

AI also helped with implementing the image gallery on the individual listing page.

I tested the gallery using listings containing multiple images.

---

### September 2026 — Git and Feature Branch Workflow

**Tool:** ChatGPT

I used AI for guidance with Git commands and the feature branch workflow.

This included:

- Creating branches
- Switching branches
- Creating commits
- Pushing branches
- Merging completed features into `main`

Using separate branches helped me keep individual features isolated while developing and testing them.

---

### September 2026 — ESLint, Prettier and Production Build

**Tool:** ChatGPT

I used AI while debugging code-quality and production-build issues.

This included problems involving:

- ESLint
- Prettier
- The generated `dist` directory
- Filename casing
- Vite production builds
- Multi-page Vite configuration

One important issue was that the original production build only included `index.html`.

I updated the Vite configuration so the production build also included the login, register, profile, listing, create and edit pages.

After making changes, I used formatting, linting and production builds to verify the project.

---

### September 2026 — GitHub Pages Deployment

**Tool:** ChatGPT

I used AI to help deploy the application using GitHub Pages.

After the first deployment, the landing page worked but internal navigation resulted in 404 errors.

AI helped me identify that the problem was caused by absolute paths pointing to the root of the GitHub Pages domain instead of the repository path.

I implemented a reusable path helper using the Vite base URL and tested the deployed application again.

After the changes, navigation between the deployed pages worked correctly.

---

### September 2026 — JSDoc Documentation

**Tool:** ChatGPT

I used AI to help create consistent JSDoc documentation for important functions in the project.

The documentation describes:

- Function purposes
- Parameters
- Return values
- Asynchronous functions

After adding the documentation, I ran Prettier, ESLint and the Vite production build to verify that the changes did not introduce errors.

---

### September 2026 — Responsive Design and Mobile Testing

**Tool:** ChatGPT

I used AI during the final responsive testing of the application.

While testing the application at small screen sizes, I identified layout problems in the navigation bar and featured listing section.

AI helped suggest Tailwind CSS adjustments for smaller screens. I then tested the changes at mobile viewport sizes and adjusted the implementation.

---

## How AI Was Used

AI was used as a supporting development tool rather than as a replacement for testing and development decisions.

During the project I used AI mainly to:

- Explain unfamiliar concepts
- Review and debug code
- Suggest possible solutions
- Help identify errors
- Assist with Git commands
- Improve documentation
- Help troubleshoot deployment
- Suggest responsive design improvements

I reviewed the suggestions in the context of my project and tested the implemented functionality throughout development.

Using AI also helped me understand several areas better, especially API authentication, asynchronous JavaScript, reusable components, Git workflows, Vite production builds, and deployment.
