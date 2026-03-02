const data = {
  metrics: [
    { label: "Active Projects", value: 3 },
    { label: "Backtests Today", value: 12 },
    { label: "Avg Sharpe", value: 1.47 },
    { label: "Win Rate", value: "58%" }
  ],
  projects: [
    { name: "QC Pipeline", stage: "MVP", progress: 90, owner: "Jason", updatedAt: "2026-03-02" },
    { name: "Strategy Search", stage: "Design", progress: 55, owner: "Jason", updatedAt: "2026-03-02" },
    { name: "Scoring Engine", stage: "Build", progress: 35, owner: "Jason", updatedAt: "2026-03-01" }
  ],
  todos: [
    "Define a unified scoring framework (return / drawdown / stability)",
    "Standardize backtest result output format (JSON + CSV)",
    "Add data freshness timestamp to the dashboard"
  ]
};

function renderMetrics() {
  const grid = document.getElementById("metricsGrid");
  grid.innerHTML = data.metrics.map(m => `
    <div class="metric">
      <div class="label">${m.label}</div>
      <div class="value">${m.value}</div>
    </div>
  `).join("");
}

function renderProjects() {
  const tbody = document.getElementById("projectTable");
  tbody.innerHTML = data.projects.map(p => `
    <tr>
      <td>${p.name}</td>
      <td>${p.stage}</td>
      <td>
        <div>${p.progress}%</div>
        <div class="progress"><span style="width:${p.progress}%"></span></div>
      </td>
      <td>${p.owner}</td>
      <td>${p.updatedAt}</td>
    </tr>
  `).join("");
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = data.todos.map(t => `<li>${t}</li>`).join("");
}

renderMetrics();
renderProjects();
renderTodos();
