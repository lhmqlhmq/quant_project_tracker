# quant_project_tracker

Project Tracker + Dashboard MVP for quant research workflow.

## Current MVP (v0.1)
- Static dashboard homepage (`index.html`)
- Core metrics cards
- Project tracking table
- High-priority todo list

## Run locally
Open `index.html` directly in browser, or run a simple static server:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Next planned features
- Data source from JSON/API (instead of hardcoded JS)
- Strategy score breakdown (return, drawdown, stability)
- Backtest history timeline
- Filters: strategy family, date range, market regime
- Export: CSV / snapshot report
