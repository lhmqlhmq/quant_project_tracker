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
    "定义统一评分口径（收益/回撤/稳定性）",
    "固化回测结果落盘格式（JSON + CSV）",
    "补齐 Dashboard 数据更新时间戳"
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
