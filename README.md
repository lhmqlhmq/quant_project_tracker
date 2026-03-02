# quant_project_tracker

Project Tracker + Dashboard MVP for quant research workflow.

## Current MVP (v0.2)
- Bilingual static dashboard (EN / 中文)
- Core metrics cards
- Project tracking table
- High-priority todo list

## Project structure
- `projects/tracker-web/` → current tracker dashboard app

## Run locally
Open `projects/tracker-web/index.html` directly in browser, or run a simple static server from repo root:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/projects/tracker-web/
```

## Next planned features
- Data source from JSON/API (instead of hardcoded JS)
- Strategy score breakdown (return, drawdown, stability)
- Backtest history timeline
- Filters: strategy family, date range, market regime
- Export: CSV / snapshot report
