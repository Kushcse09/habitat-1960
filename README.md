# GeoEcoz

An earth-observation control panel for tracking environmental threats in near real time — deforestation, wildfire risk, coral bleaching, and wildlife corridor disruption — built for **Hack the Habitat**.

GeoEcoz turns raw environmental signals into a region-by-region risk score, surfaces it on an interactive map, and lets field teams log new threats on the ground. It's built for the people who need to act on this data fast: conservationists, rangers, researchers, and local NGOs — not just people who want to look at it.

## The problem

Environmental threat data is scattered across satellite feeds, climate APIs, and field reports that rarely talk to each other. By the time a signal gets noticed, the damage is often already done. GeoEcoz consolidates that signal into one place and scores it, so a spike in fire density or a temperature anomaly in a fragile region gets flagged before it becomes a headline.

## How it works

1. **Data ingestion** — environmental signals (fire density, temperature anomaly, deforestation rate) are pulled in per region.
2. **Risk scoring** — a weighted scoring function (`lib/scoring.ts`) combines these signals into a single 0–100 risk score per region.
3. **Field alerts** — scored regions are plotted on a live map. Anyone can log a new threat directly from the field, adding to the monitoring picture in real time.

## Features

- Interactive dark-mode map of monitored regions, color-coded by risk level
- Click-through region detail panel: risk score, threat type, 30-day trend, and a plain-language field note
- Sortable, filterable log of all monitored regions
- Threat reporting form for crowdsourced field observations
- Lightweight risk-scoring engine you can extend with real data sources

## Tech stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Map:** react-leaflet with dark-themed tiles
- **Charts:** Recharts
- **Backend:** Next.js Route Handlers (in-memory data store, no external DB required to run)

## Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project structure

```
app/
  page.tsx              # main dashboard (map + region log)
  report/page.tsx        # threat reporting form
  about/page.tsx          # mission + how-it-works
  api/
    regions/route.ts      # GET monitored regions
    stats/route.ts        # GET aggregated stats
    reports/route.ts       # GET/POST field reports
lib/
  scoring.ts               # risk-scoring formula
```

## API reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/regions` | GET | Returns all monitored regions with risk scores and 30-day trend data |
| `/api/stats` | GET | Returns aggregated stats (active threats, high-risk zone count, etc.) |
| `/api/reports` | GET | Returns all submitted field reports |
| `/api/reports` | POST | Submits a new field threat report |

## Risk scoring

Each region's risk score (0–100) is calculated from three weighted factors:

- Fire density
- Temperature anomaly
- Deforestation rate

See `lib/scoring.ts` for the exact formula. This is designed to be swapped out for real satellite/climate data sources (e.g. NASA FIRMS, Open-Meteo) without changing the rest of the app.

## Roadmap

- [ ] Connect live satellite/climate data feeds in place of mock data
- [ ] Persist reports and regions to a real database
- [ ] Push notifications for regions crossing into critical risk
- [ ] Historical playback of risk trends over time
- [ ] Role-based access for verified field partners

## Team

Built for Hack the Habitat 2026.

## License

MIT
