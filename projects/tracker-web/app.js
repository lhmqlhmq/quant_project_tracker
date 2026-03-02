const i18n = {
  en: {
    subtitle: "Project tracking and dashboard (MVP)",
    sectionMetrics: "Core Metrics",
    sectionProjects: "Project List",
    sectionTodos: "High-Priority Todos",
    thProject: "Project",
    thStage: "Stage",
    thProgress: "Progress",
    thOwner: "Owner",
    thUpdated: "Updated",
    metrics: ["Active Projects", "Backtests Today", "Avg Sharpe", "Win Rate"],
    stages: { MVP: "MVP", Design: "Design", Build: "Build" },
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
    sectionTodos: "高优先级待办",
    thProject: "项目",
    thStage: "阶段",
    thProgress: "进度",
    thOwner: "负责人",
    thUpdated: "更新时间",
    metrics: ["活跃项目", "今日回测次数", "平均夏普", "胜率"],
    stages: { MVP: "MVP", Design: "设计", Build: "开发" },
    todos: [
      "定义统一评分口径（收益 / 回撤 / 稳定性）",
      "标准化回测结果输出格式（JSON + CSV）",
      "为仪表盘增加数据更新时间戳"
    ],
    locale: "zh-CN"
  }
};

const data = {
  metricsValues: [3, 12, 1.47, "58%"],
  projects: [
    { name: "QC Pipeline", stage: "MVP", progress: 90, owner: "Jason", updatedAt: "2026-03-02" },
    { name: "Strategy Search", stage: "Design", progress: 55, owner: "Jason", updatedAt: "2026-03-02" },
    { name: "Scoring Engine", stage: "Build", progress: 35, owner: "Jason", updatedAt: "2026-03-01" }
  ]
};

let currentLang = localStorage.getItem("lang") || "en";

function t() {
  return i18n[currentLang] || i18n.en;
}

function applyStaticText() {
  const dict = t();
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.getElementById("subtitle").textContent = dict.subtitle;
  document.getElementById("sectionMetrics").textContent = dict.sectionMetrics;
  document.getElementById("sectionProjects").textContent = dict.sectionProjects;
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
    .map(
      (label, idx) => `
    <div class="metric">
      <div class="label">${label}</div>
      <div class="value">${data.metricsValues[idx]}</div>
    </div>
  `
    )
    .join("");
}

function renderProjects() {
  const tbody = document.getElementById("projectTable");
  const dict = t();
  tbody.innerHTML = data.projects
    .map((p) => {
      const stageText = dict.stages[p.stage] || p.stage;
      const dateText = new Date(p.updatedAt).toLocaleDateString(dict.locale, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      return `
    <tr>
      <td>${p.name}</td>
      <td>${stageText}</td>
      <td>
        <div>${p.progress}%</div>
        <div class="progress"><span style="width:${p.progress}%"></span></div>
      </td>
      <td>${p.owner}</td>
      <td>${dateText}</td>
    </tr>
  `;
    })
    .join("");
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = t().todos.map((item) => `<li>${item}</li>`).join("");
}

function renderAll() {
  applyStaticText();
  renderMetrics();
  renderProjects();
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

renderAll();
updateLangButtons();
