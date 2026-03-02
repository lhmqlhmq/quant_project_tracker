# quant_project_tracker

Project Tracker + Dashboard MVP for quant research workflow.

## Execution policy
- Agent coding runtime: **Codex only**
- ClaudeCode path: disabled for this project

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

## Data link (for quant workflow)
- Dashboard data source: `data/status.json`
- Tracker web reads: `../../data/status.json`
- You can update this JSON from your quant pipeline to refresh project status.

## Next planned features
- Strategy score breakdown (return, drawdown, stability)
- Backtest history timeline
- Filters: strategy family, date range, market regime
- Export: CSV / snapshot report
