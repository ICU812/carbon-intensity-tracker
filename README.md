# Carbon Intensity Tracker
Full Stack Developer Technical Interview Test — Carbon Intensity Tracker

## Description
A REACT + Node.js web application that allows users to read, update, delete and store national carbon intensity values.

Built with:

- React + Vite (frontend)
- Node.js + Express (backend)
- SQLite + TypeORM (database)

## Project Structure
- `carbon-intensity-tracker-api/` — backend (Node.js, Express, SQLite) (WIP)
- `carbon-intensity-tracker-ui/` — frontend (React, Vite) (Not yet implemented)

## Prerequisites

- Node.js (>= 22.x recommended)
- npm (>= 10.x)

## Installation

1. Install dependencies:

```bash
cd carbon-intensity-tracker-api && npm install
cd ../carbon-intensity-tracker-ui && npm install
```

## Local development

Before running the api for the first time, seed the database:

```bash
cd carbon-intensity-tracker-api && npm run seed
```

```bash
cd carbon-intensity-tracker-api && npm run dev
```

## API Endpoints

- `GET /api/intensity` — Get all carbon intensity records

## Troubleshooting

- Ensure database is seeded before running backend.
    - carbon-intensity-tracker-api/src/db/carbon_intensity.sqlite
- Ensure correct Node.js version is installed.
- Check logs if any errors occur on startup.


## Authors
Calum Brunt
