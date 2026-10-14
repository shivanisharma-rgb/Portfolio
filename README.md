# Shivani Sharma Portfolio

The portfolio uses React and Vite for the frontend, with an Express API that stores contact-form submissions in SQLite. The Smart Daily Task Manager, Ask Gemini, and CollabSphere cards link to the three supplied live demos.

## Run locally

1. Install Node.js 20.19+ or 22.12+, then run `npm install`.
2. Optionally copy `.env.example` to `.env` to configure the API port, CORS origins, or database path.
3. Run `npm run dev`. The portfolio is available at `http://localhost:5173`; Vite proxies `/api` requests to the Express server on port `3001`.
4. Run `npm test` for the contact API tests and `npm run build` to create the production frontend in `dist/`.
5. Run `NODE_ENV=production npm start` to serve the built frontend and API from Express.

Contact messages are saved in `data/portfolio.sqlite` by default. Set `DATABASE_PATH` to choose a different location. The database directory and `.env` files are ignored by Git.

For separate frontend and API hosting, set `VITE_API_BASE_URL` to the deployed API origin when building the frontend, and include the portfolio origin in the API server's comma-separated `CORS_ORIGINS` value. SQLite requires persistent disk storage: do not use an ephemeral serverless filesystem for the contact database.

## Supplied project demos

- Smart Daily Task Manager: https://shivani-smart-task-manager-2026.netlify.app/
- Ask Gemini: https://phase-5-shivani.netlify.app/
- CollabSphere: https://venerable-semolina-c405b0.netlify.app/login
# Portfolio
