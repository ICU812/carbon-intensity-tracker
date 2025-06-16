# Carbon Intensity Tracker
Full Stack Developer Technical Interview Test — Carbon Intensity Tracker

## Description
A React + Node.js web application that allows users to read, update, delete and store national carbon intensity values.

Tech stack:

- React + Vite (UI)
- Node.js + Express (API)
- SQLite + TypeORM (database)

## Project Structure
- `carbon-intensity-tracker-api/` — API server and database (Node.js, Express, SQLite)
- `carbon-intensity-tracker-ui/` — UI application (React, Vite)

## Installation

Prerequisites:
- Node.js (>= 22.x recommended)
- npm (>= 10.x)
Docker (optional, for containerised deployment)

1. Install dependencies:

```bash
cd carbon-intensity-tracker-api && npm install
cd ../carbon-intensity-tracker-ui && npm install
```

## Local development

```bash
# Before running the api for the first time, seed the database:
cd carbon-intensity-tracker-api && npm run seed

# In separate terminals

# Start the API:
cd carbon-intensity-tracker-api && npm run dev

# Start the UI:
cd carbon-intensity-tracker-ui && npm run dev
```

## API Endpoints

- `GET /api/intensity` — Get all carbon intensity records
- `GET /generation` - Planned
- `GET /intensity/date` - Planned

## Docker Deployment

Build and start containers:

```bash
docker compose up --build
```

After startup:
- API: http://localhost:3001
- UI: http://localhost:8080

To stop the containers:
```bash
docker compose down
```

## Troubleshooting

- Ensure database is seeded before running API.
    - carbon-intensity-tracker-api/src/db/carbon_intensity.sqlite
- Ensure correct Node.js version is installed.
- Check logs if any errors occur on startup.


## Authors
Calum Brunt
