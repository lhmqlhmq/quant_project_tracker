const i18n = {
  en: {
    subtitle: "Project tracking and dashboard (MVP)",
    sectionMetrics: "Core Metrics",
    sectionProjects: "Project List",
    sectionGantt: "Roadmap Gantt",
    sectionAgents: "Agent Focus & Next Step",
    sectionTodos: "High-Priority Todos",
    thProject: "Project",
    thStage: "Stage",
    thProgress: "Progress",
    thOwner: "Owner",
    thUpdated: "Updated",
    metrics: ["Active Projects", "Backtests Today", "Avg Sharpe", "Win Rate"],
    stages: { MVP: "MVP", Design: "Design", Build: "Build" },
    agentNow: "Now",
    agentNext: "Next",
    todos: [
      "Define a unified scoring framework (return / drawdown / stability)",
      "Standardize backtest result output format (JSON + CSV)",
      "Add data freshness timestamp to the dashboard"
    ],
    locale: "en-US"
  },
  zh: {
    subtitle: "项目跟踪与仪表盘（MVP）",
    sectionMetrics: "核心指标",
    sectionProjects: "项目清单",
    sectionGantt: "项目甘特概览",
    sectionAgents: "Agent 当前重点与下一步",
    sectionTodos: "高优先级待办",
    thProject: "项目",
    thStage: "阶段",
    thProgress: "进度",
    thOwner: "负责人",
    thUpdated: "更新时间",
    metrics: ["活跃项目", "今日回测次数", "平均夏普", "胜率"],
    stages: { MVP: "MVP", Design: "设计", Build: "开发" },
    agentNow: "当前",
    agentNext: "下一步",
    todos: [
      "定义统一评分口径（收益 / 回撤 / 稳定性）",
      "标准化回测结果输出格式（JSON + CSV）",
      "为仪表盘增加数据更新时间戳"
    ],
    locale: "zh-CN"
  }
};

const fallbackData = {
  metricsValues: [3, 12, 1.47, "58%"],
  projects: [
    { name: "QC Pipeline", stage: "MVP", progress: 90, owner: "Jason", updatedAt: "2026-03-02" },
    { name: "Strategy Search", stage: "Design", progress: 55, owner: "Jason", updatedAt: "2026-03-02" },
    { name: "Scoring Engine", stage: "Build", progress: 35, owner: "Jason", updatedAt: "2026-03-01" }
  ],
  gantt: [
    { name: "Governance & Risk", progress: 92 },
    { name: "QC Pipeline", progress: 90 },
    { name: "Strategy Search", progress: 55 },
    { name: "Scoring Engine", progress: 35 }
  ],
  agents: [
    { name: "Emma", now: "Lifecycle gating", next: "Approve release checklist" },
    { name: "Anna", now: "Vol signal space", next: "Narrow parameter grid" }
  ]
};

let data = { ...fallbackData };
let currentLang = localStorage.getItem("lang") || "en";

function t() {
  return i18n[currentLang] || i18n.en;
}

async function loadData() {
  try {
    const res = await fetch("../../data/status.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json?.projects && json?.metricsValues) data = { ...fallbackData, ...json };
  } catch (_) {
    data = { ...fallbackData };
  }
}

function applyStaticText() {
  const dict = t();
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.getElementById("subtitle").textContent = dict.subtitle;
  document.getElementById("sectionMetrics").textContent = dict.sectionMetrics;
  document.getElementById("sectionProjects").textContent = dict.sectionProjects;
  document.getElementById("sectionGantt").textContent = dict.sectionGantt;
  document.getElementById("sectionAgents").textContent = dict.sectionAgents;
  document.getElementById("sectionTodos").textContent = dict.sectionTodos;
  document.getElementById("thProject").textContent = dict.thProject;
  document.getElementById("thStage").textContent = dict.thStage;
  document.getElementById("thProgress").textContent = dict.thProgress;
  document.getElementById("thOwner").textContent = dict.thOwner;
  document.getElementById("thUpdated").textContent = dict.thUpdated;
}

function renderMetrics() {
  const grid = document.getElementById("metricsGrid");
  const dict = t();
  grid.innerHTML = dict.metrics
    .map((label, idx) => `<div class="metric"><div class="label">${label}</div><div class="value">${data.metricsValues[idx] ?? "-"}</div></div>`)
    .join("");
}

function renderProjects() {
  const tbody = document.getElementById("projectTable");
  const dict = t();
  tbody.innerHTML = (data.projects || [])
    .map((p) => {
      const stageText = dict.stages[p.stage] || p.stage;
      const dateText = new Date(p.updatedAt).toLocaleDateString(dict.locale, { year: "numeric", month: "short", day: "numeric" });
      return `<tr><td>${p.name}</td><td>${stageText}</td><td><div>${p.progress}%</div><div class="progress"><span style="width:${p.progress}%"></span></div></td><td>${p.owner}</td><td>${dateText}</td></tr>`;
    })
    .join("");
}

function renderGantt() {
  const board = document.getElementById("ganttBoard");
  board.innerHTML = (data.gantt || [])
    .map((g) => `<div class="gantt-row"><div class="gantt-name">${g.name}</div><div class="gantt-track"><span style="width:${g.progress}%"></span></div></div>`)
    .join("");
}

function renderAgents() {
  const board = document.getElementById("agentBoard");
  const dict = t();
  board.innerHTML = (data.agents || [])
    .map((a) => `<div class="agent-card"><div class="name">${a.name}</div><div class="line">${dict.agentNow}: ${a.now}</div><div class="line">${dict.agentNext}: ${a.next}</div></div>`)
    .join("");
}

function renderTodos() {
  document.getElementById("todoList").innerHTML = t().todos.map((item) => `<li>${item}</li>`).join("");
}

function renderAll() {
  applyStaticText();
  renderMetrics();
  renderProjects();
  renderGantt();
  renderAgents();
  renderTodos();
}

const btnEn = document.getElementById("btnEn");
const btnZh = document.getElementById("btnZh");
function updateLangButtons() {
  btnEn.classList.toggle("active", currentLang === "en");
  btnZh.classList.toggle("active", currentLang === "zh");
}
btnEn.addEventListener("click", () => {
  currentLang = "en";
  localStorage.setItem("lang", currentLang);
  renderAll();
  updateLangButtons();
});
btnZh.addEventListener("click", () => {
  currentLang = "zh";
  localStorage.setItem("lang", currentLang);
  renderAll();
  updateLangButtons();
});

(async function init() {
  await loadData();
  renderAll();
  updateLangButtons();
})();
