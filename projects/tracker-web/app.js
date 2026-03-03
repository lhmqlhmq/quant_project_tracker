const i18n = {
  en: {
    subtitle: "Project tracking and dashboard (MVP)",
    sectionMetrics: "Core Metrics",
    sectionProjects: "Project List",
    sectionGantt: "Roadmap Timeline (Gantt)",
    sectionAgents: "Agent Focus & Next Step",
    sectionTodos: "High-Priority Todos",
    sectionNeedConfirm: "Items Requiring Jason's Confirmation",
    lastUpdated: "Last updated",
    thProject: "Project",
    thStage: "Stage",
    thProgress: "Progress",
    thOwner: "Owner",
    thUpdated: "Updated",
    metrics: ["Active Projects", "Backtests Today", "Avg Sharpe", "Win Rate"],
    stages: { MVP: "MVP", Design: "Design", Build: "Build" },
    ganttStart: "Start",
    ganttEnd: "ETA",
    agentRole: "Role",
    agentNow: "Now",
    agentNext: "Next",
    agentIssue: "Issue",
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
    sectionGantt: "项目甘特时间线",
    sectionAgents: "Agent 当前重点与下一步",
    sectionTodos: "高优先级待办",
    sectionNeedConfirm: "需 Jason 确认事项",
    lastUpdated: "最近更新",
    thProject: "项目",
    thStage: "阶段",
    thProgress: "进度",
    thOwner: "负责人",
    thUpdated: "更新时间",
    metrics: ["活跃项目", "今日回测次数", "平均夏普", "胜率"],
    stages: { MVP: "MVP", Design: "设计", Build: "开发" },
    ganttStart: "开始",
    ganttEnd: "预计完成",
    agentRole: "职务",
    agentNow: "当前",
    agentNext: "下一步",
    agentIssue: "问题",
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
    { name: "Governance & Risk Framework", start: "2026-02-26", end: "2026-03-05", progress: 92, status: "in_progress" },
    { name: "QC Pipeline Automation", start: "2026-02-27", end: "2026-03-06", progress: 90, status: "in_progress" },
    { name: "Strategy Search Engine", start: "2026-03-02", end: "2026-03-12", progress: 55, status: "in_progress" },
    { name: "Scoring & Review System", start: "2026-03-03", end: "2026-03-18", progress: 35, status: "risk" }
  ],
  agents: [],
  needConfirm: []
};

let data = { ...fallbackData };
let currentLang = localStorage.getItem("lang") || "en";

function t() { return i18n[currentLang] || i18n.en; }

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

function fmtDate(d) {
  return new Date(d).toLocaleDateString(t().locale, { year: "numeric", month: "short", day: "numeric" });
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
  document.getElementById("sectionNeedConfirm").textContent = dict.sectionNeedConfirm;
  document.getElementById("thProject").textContent = dict.thProject;
  document.getElementById("thStage").textContent = dict.thStage;
  document.getElementById("thProgress").textContent = dict.thProgress;
  document.getElementById("thOwner").textContent = dict.thOwner;
  document.getElementById("thUpdated").textContent = dict.thUpdated;

  const lu = data.updatedAt ? fmtDate(data.updatedAt) : "-";
  document.getElementById("lastUpdated").textContent = `${dict.lastUpdated}: ${lu}`;
}

function renderMetrics() {
  const grid = document.getElementById("metricsGrid");
  grid.innerHTML = t().metrics.map((label, idx) => `<div class="metric"><div class="label">${label}</div><div class="value">${data.metricsValues[idx] ?? "-"}</div></div>`).join("");
}

function renderProjects() {
  const tbody = document.getElementById("projectTable");
  const dict = t();
  tbody.innerHTML = (data.projects || []).map((p) => {
    const stageText = dict.stages[p.stage] || p.stage;
    const name = currentLang === "zh" ? (p.nameZh || p.name) : p.name;
    return `<tr><td>${name}</td><td>${stageText}</td><td><div>${p.progress}%</div><div class="progress"><span style="width:${p.progress}%"></span></div></td><td>${p.owner}</td><td>${fmtDate(p.updatedAt)}</td></tr>`;
  }).join("");
}

function renderGantt() {
  const board = document.getElementById("ganttBoard");
  const tasks = data.gantt || [];
  if (!tasks.length) { board.innerHTML = "-"; return; }
  const min = Math.min(...tasks.map((x) => new Date(x.start).getTime()));
  const max = Math.max(...tasks.map((x) => new Date(x.end).getTime()));
  const span = Math.max(max - min, 86400000);

  board.innerHTML = tasks.map((g) => {
    const s = new Date(g.start).getTime();
    const e = new Date(g.end).getTime();
    const left = ((s - min) / span) * 100;
    const width = Math.max(((e - s) / span) * 100, 2);
    const cls = g.status === "risk" ? "risk" : g.status === "blocked" ? "blocked" : "ok";
    const name = currentLang === "zh" ? (g.nameZh || g.name) : g.name;
    return `
      <div class="gantt-row">
        <div class="gantt-meta">
          <div class="gantt-name">${name}</div>
          <div class="gantt-dates">${t().ganttStart}: ${fmtDate(g.start)} · ${t().ganttEnd}: ${fmtDate(g.end)}</div>
        </div>
        <div class="gantt-timeline">
          <div class="gantt-bar ${cls}" style="left:${left}%;width:${width}%">${g.progress}%</div>
        </div>
      </div>`;
  }).join("");
}

function renderAgents() {
  const board = document.getElementById("agentBoard");
  const dict = t();
  board.innerHTML = (data.agents || []).map((a) => {
    const role = currentLang === "zh" ? (a.roleZh || a.role) : (a.role || a.roleZh);
    const now = currentLang === "zh" ? (a.nowZh || a.now) : (a.now || a.nowZh);
    const next = currentLang === "zh" ? (a.nextZh || a.next) : (a.next || a.nextZh);
    const issue = currentLang === "zh" ? (a.issueZh || a.issue) : (a.issue || a.issueZh);
    return `
    <div class="agent-card ${issue ? "has-issue" : ""}">
      <div class="name">${a.name}</div>
      <div class="line"><strong>${dict.agentRole}:</strong> ${role || "-"}</div>
      <div class="line"><strong>${dict.agentNow}:</strong> ${now || "-"}</div>
      <div class="line"><strong>${dict.agentNext}:</strong> ${next || "-"}</div>
      ${issue ? `<div class="line issue"><strong>${dict.agentIssue}:</strong> ${issue}</div>` : ""}
    </div>`;
  }).join("");
}

function renderNeedConfirm() {
  const list = document.getElementById("needConfirmList");
  const items = data.needConfirm || [];
  if (!items.length) {
    list.innerHTML = "";
    return;
  }
  list.innerHTML = items.map((x) => `<li>${currentLang === "zh" ? (x.zh || x.en || x) : (x.en || x.zh || x)}</li>`).join("");
}

function renderTodos() { document.getElementById("todoList").innerHTML = t().todos.map((item) => `<li>${item}</li>`).join(""); }
function renderAll() { applyStaticText(); renderMetrics(); renderProjects(); renderNeedConfirm(); renderGantt(); renderAgents(); renderTodos(); }

const btnEn = document.getElementById("btnEn");
const btnZh = document.getElementById("btnZh");
function updateLangButtons() { btnEn.classList.toggle("active", currentLang === "en"); btnZh.classList.toggle("active", currentLang === "zh"); }
btnEn.addEventListener("click", () => { currentLang = "en"; localStorage.setItem("lang", currentLang); renderAll(); updateLangButtons(); });
btnZh.addEventListener("click", () => { currentLang = "zh"; localStorage.setItem("lang", currentLang); renderAll(); updateLangButtons(); });

(async function init() { await loadData(); renderAll(); updateLangButtons(); })();
