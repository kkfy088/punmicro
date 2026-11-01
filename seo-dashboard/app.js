/**
 * Punmicro SEO Monitoring & Continuous Optimization Engine
 * Implements: JEV Priority, Pareto Optimality, Gradient Descent Optimization, Backtesting Loop
 */

(function () {
  "use strict";

  // 深度复制工具
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // 核心状态
  let state = {
    data: deepClone(INITIAL_DATA),
    activeTab: "overview", // overview | pages | competitors | actions | pareto
    filterCategory: "all",
    pageSearchQuery: "",
    selectedCompetitor: "interscience",
    activeSopModalItem: null
  };

  // 1. 算法层：JEV 与 帕累托最优计算
  function computeParetoAndJev(items) {
    items.forEach(item => {
      // JEV = (Impact * Confidence) / Effort
      item.jev = Number(((item.impact * item.confidence) / item.effort).toFixed(2));
      // 梯度下降斜率 = 综合得分增益 / Effort
      item.gradientSlope = Number((item.boost.overall / item.effort).toFixed(2));
    });

    // 帕累托前沿判断 (二维: Effort 越小越好, Boost.overall 越大越好)
    items.forEach(a => {
      let isDominated = false;
      for (let b of items) {
        if (b.id !== a.id) {
          // 如果存在 b，其增益大于等于 a，且努力成本小于等于 a，且至少有一项严格更优
          if (b.boost.overall >= a.boost.overall && b.effort <= a.effort) {
            if (b.boost.overall > a.boost.overall || b.effort < a.effort) {
              isDominated = true;
              break;
            }
          }
        }
      }
      a.isParetoOptimal = !isDominated;
    });

    return items;
  }

  // 2. 状态重估与梯度计算
  function recalculateMetrics() {
    const data = state.data;
    let newScore = data.baselineScore;
    let dimDeltas = {
      techIndexing: 0,
      contentGain: 0,
      internalLinks: 0,
      entityTrust: 0,
      retentionBehavior: 0
    };

    // 重置页面指标到基准
    const initialPagesMap = {};
    INITIAL_DATA.pages.forEach(p => {
      initialPagesMap[p.id] = {
        indexability: p.indexability,
        seoScore: p.seoScore,
        contentDiff: p.contentDiff
      };
    });

    data.pages.forEach(p => {
      p.indexability = initialPagesMap[p.id].indexability;
      p.seoScore = initialPagesMap[p.id].seoScore;
      p.contentDiff = initialPagesMap[p.id].contentDiff;
    });

    // 遍历所有已完成项，累加增益
    data.actionItems.forEach(item => {
      if (item.status === "completed") {
        newScore += item.boost.overall;
        for (let dimKey in dimDeltas) {
          if (item.boost[dimKey]) {
            dimDeltas[dimKey] += item.boost[dimKey];
          }
        }
        // 增益到具体页面
        if (item.boost.pageIndexability) {
          for (let pid in item.boost.pageIndexability) {
            const page = data.pages.find(p => p.id === pid);
            if (page) {
              page.indexability = Math.min(100, page.indexability + item.boost.pageIndexability[pid]);
            }
          }
        }
        if (item.boost.pageSeo) {
          for (let pid in item.boost.pageSeo) {
            const page = data.pages.find(p => p.id === pid);
            if (page) {
              page.seoScore = Math.min(100, page.seoScore + item.boost.pageSeo[pid]);
              // 伴随 SEO 评分提升，差异度相应增加
              page.contentDiff = Math.min(98, page.contentDiff + Math.round(item.boost.pageSeo[pid] * 0.7));
            }
          }
        }
      }
    });

    // 限制最高 99.5
    data.currentScore = Math.min(99.5, Number(newScore.toFixed(1)));
    for (let dimKey in data.dimensions) {
      const base = data.dimensions[dimKey].baseline;
      data.dimensions[dimKey].current = Math.min(100, Math.round(base + dimDeltas[dimKey]));
    }

    // 重新计算 JEV 与梯度排序
    computeParetoAndJev(data.actionItems);
  }

  // 3. 渲染主界面
  function renderApp() {
    const root = document.getElementById("app-root");
    if (!root) return;

    recalculateMetrics();

    const data = state.data;
    const completedCount = data.actionItems.filter(i => i.status === "completed").length;
    const totalCount = data.actionItems.length;
    const gapToLeader = (data.targetScore - data.currentScore).toFixed(1);

    // 计算页面整体统计
    const avgIndexability = Math.round(data.pages.reduce((acc, p) => acc + p.indexability, 0) / data.pages.length);
    const avgSeoScore = Math.round(data.pages.reduce((acc, p) => acc + p.seoScore, 0) / data.pages.length);
    const avgContentDiff = Math.round(data.pages.reduce((acc, p) => acc + p.contentDiff, 0) / data.pages.length);

    root.innerHTML = `
      <!-- 顶部全局导航与状态条 -->
      <header class="top-nav">
        <div class="nav-brand">
          <div class="brand-logo-badge">PM</div>
          <div class="brand-info">
            <div class="brand-title">Punmicro 磐麦仪器 · SEO 持续监控与品类突围看板</div>
            <div class="brand-sub">目标站点: <a href="https://${data.domain}" target="_blank">${data.domain}</a> · 算法模型: JEV × 帕累托最优 × 梯度下降</div>
          </div>
        </div>
        <div class="nav-actions">
          <button id="btn-backtest-all" class="btn btn-primary" title="一键将所有 8 项优化投入回测仿真">
            <span class="btn-icon">⚡</span> 一键模拟全量回测
          </button>
          <button id="btn-reset-data" class="btn btn-outline" title="恢复至未优化的初始基准状态">
            <span class="btn-icon">↺</span> 重置看板基准
          </button>
        </div>
      </header>

      <!-- 核心指标摘要条 -->
      <section class="kpi-strip">
        <div class="kpi-card ${data.currentScore >= 80 ? 'kpi-highlight' : ''}">
          <div class="kpi-label">SEO 综合评估总分</div>
          <div class="kpi-value-row">
            <span class="kpi-number" id="kpi-overall-score">${data.currentScore}</span>
            <span class="kpi-unit">/ 100</span>
          </div>
          <div class="kpi-subtext">
            基准值: <strong>${data.baselineScore}</strong> 
            <span class="kpi-badge-gain ${data.currentScore > data.baselineScore ? 'gain-positive' : ''}">
              +${(data.currentScore - data.baselineScore).toFixed(1)} 提升
            </span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">距品类第一 (Interscience 94.6)</div>
          <div class="kpi-value-row">
            <span class="kpi-number text-accent">${gapToLeader <= 0 ? '已逼平' : `-${gapToLeader}`}</span>
            <span class="kpi-unit">分差距</span>
          </div>
          <div class="kpi-progress-bar">
            <div class="kpi-progress-fill" style="width: ${Math.min(100, Math.round((data.currentScore / data.targetScore) * 100))}%;"></div>
          </div>
          <div class="kpi-subtext">梯度下降收敛进度: ${Math.min(100, Math.round((data.currentScore / data.targetScore) * 100))}%</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">全站平均可收录可能性</div>
          <div class="kpi-value-row">
            <span class="kpi-number">${avgIndexability}%</span>
          </div>
          <div class="kpi-subtext">监测总页面: <strong>${data.pages.length}</strong> 页 · 已编入 <strong>${data.pages.filter(p => p.indexability >= 80).length}</strong> 页</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">全站 SEO 高级综合评分</div>
          <div class="kpi-value-row">
            <span class="kpi-number">${avgSeoScore}</span>
            <span class="kpi-unit">分均值</span>
          </div>
          <div class="kpi-subtext">技术/结构化/E-E-A-T综合加权</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">竞品内容差异度 (信息增益)</div>
          <div class="kpi-value-row">
            <span class="kpi-number">${avgContentDiff}%</span>
          </div>
          <div class="kpi-subtext">对标 7 家竞品独家参数率</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">闭环改善项执行进度</div>
          <div class="kpi-value-row">
            <span class="kpi-number">${completedCount}</span>
            <span class="kpi-unit">/ ${totalCount} 项</span>
          </div>
          <div class="kpi-subtext">已回测达标: <strong>${Math.round((completedCount / totalCount) * 100)}%</strong></div>
        </div>
      </section>

      <!-- 选项卡导航 -->
      <nav class="tab-nav">
        <button class="tab-btn ${state.activeTab === 'overview' ? 'active' : ''}" data-tab="overview">
          📊 综合监控与算法梯队
        </button>
        <button class="tab-btn ${state.activeTab === 'actions' ? 'active' : ''}" data-tab="actions">
          🎯 动态优先级矩阵与回测闭环 (${data.actionItems.filter(i => i.status === 'pending').length} 待办)
        </button>
        <button class="tab-btn ${state.activeTab === 'pages' ? 'active' : ''}" data-tab="pages">
          📄 22 个核心页面深度指标监控
        </button>
        <button class="tab-btn ${state.activeTab === 'competitors' ? 'active' : ''}" data-tab="competitors">
          🔬 7 家核心/拓展竞品对标矩阵
        </button>
        <button class="tab-btn ${state.activeTab === 'pareto' ? 'active' : ''}" data-tab="pareto">
          📐 帕累托最优 (80/20) 与梯度下降分析
        </button>
      </nav>

      <!-- 选项卡内容区域 -->
      <main class="tab-content" id="tab-content-area">
        ${renderActiveTabContent()}
      </main>

      <!-- SOP 指南模态弹窗容器 -->
      <div id="sop-modal-backdrop" class="modal-backdrop" style="display: none;"></div>
    `;

    bindEvents();
    renderCharts();
  }

  // 渲染具体 Tab
  function renderActiveTabContent() {
    switch (state.activeTab) {
      case "overview":
        return renderOverviewTab();
      case "actions":
        return renderActionsTab();
      case "pages":
        return renderPagesTab();
      case "competitors":
        return renderCompetitorsTab();
      case "pareto":
        return renderParetoTab();
      default:
        return renderOverviewTab();
    }
  }

  // Tab 1: 综合监控与竞品跑道
  function renderOverviewTab() {
    const data = state.data;
    return `
      <div class="dashboard-grid">
        <!-- 左侧：雷达与五大维度拆解 -->
        <div class="card col-span-7">
          <div class="card-header">
            <h3 class="card-title">五大核心算法维度深度对标 (Punmicro vs Interscience 标杆)</h3>
            <span class="card-badge">实时动态映射</span>
          </div>
          <div class="radar-container">
            <canvas id="radarChart" width="460" height="340"></canvas>
            <div class="dimension-list">
              ${Object.keys(data.dimensions).map(key => {
                const dim = data.dimensions[key];
                const gain = dim.current - dim.baseline;
                return `
                  <div class="dimension-row">
                    <div class="dim-info">
                      <span class="dim-name">${dim.name}</span>
                      <span class="dim-val">${dim.current} / 100 ${gain > 0 ? `<small class='text-green'>(+${gain})</small>` : ''}</span>
                    </div>
                    <div class="dim-bar-wrap">
                      <div class="dim-bar-base" style="width: ${dim.baseline}%;"></div>
                      <div class="dim-bar-current" style="width: ${dim.current}%;"></div>
                      <div class="dim-marker-target" style="left: ${dim.target}%;" title="标杆值: ${dim.target}"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <!-- 右侧：竞品天梯跑道 -->
        <div class="card col-span-5">
          <div class="card-header">
            <h3 class="card-title">品类竞争梯队跑道 (逼近品类第一)</h3>
            <span class="card-badge">当前排位</span>
          </div>
          <div class="competitor-ladder">
            ${renderCompetitorLadder()}
          </div>
          <div class="ladder-footnote">
            💡 <strong>梯度下降逼近策略</strong>：通过优先消除原生表格与段首直答等高梯度项，Punmicro 可快速跃过 IUL 与 DWS，将竞争焦点直接对准行业龙头 Interscience。
          </div>
        </div>
      </div>

      <!-- 下方：最重要改善项与立即执行项预览 -->
      <div class="dashboard-grid mt-4">
        <div class="card col-span-6">
          <div class="card-header">
            <h3 class="card-title">🔥 最重要改善项 (Top Impact Items)</h3>
            <span class="card-badge badge-red">攻克根本卡点</span>
          </div>
          <div class="action-summary-list">
            ${renderTopImpactPreview()}
          </div>
        </div>

        <div class="card col-span-6">
          <div class="card-header">
            <h3 class="card-title">⚡ 可立即执行改善项 (Quick Wins)</h3>
            <span class="card-badge badge-green">极高 JEV · 半小时内见效</span>
          </div>
          <div class="action-summary-list">
            ${renderQuickWinsPreview()}
          </div>
        </div>
      </div>
    `;
  }

  function renderCompetitorLadder() {
    const data = state.data;
    const list = [
      ...data.competitors.map(c => ({ name: c.name, score: c.overallScore, isTarget: false, tier: c.tier })),
      { name: "Punmicro 磐麦 (当前)", score: data.currentScore, isTarget: true, tier: "待突破站" }
    ];
    list.sort((a, b) => b.score - a.score);

    return list.map((item, idx) => {
      const isPunmicro = item.isTarget;
      return `
        <div class="ladder-row ${isPunmicro ? 'ladder-highlight' : ''}">
          <div class="ladder-rank">#${idx + 1}</div>
          <div class="ladder-info">
            <div class="ladder-name">${item.name} <small class="text-muted">(${item.tier})</small></div>
            <div class="ladder-bar-bg">
              <div class="ladder-bar-fill ${isPunmicro ? 'fill-primary' : 'fill-gray'}" style="width: ${item.score}%;"></div>
            </div>
          </div>
          <div class="ladder-score"><strong>${item.score}</strong> 分</div>
        </div>
      `;
    }).join("");
  }

  function renderTopImpactPreview() {
    const data = state.data;
    const items = data.actionItems.filter(i => i.type === "top_impact");
    return items.map(item => `
      <div class="action-compact-card ${item.status === 'completed' ? 'item-done' : ''}">
        <div class="action-compact-header">
          <span class="action-id">${item.id}</span>
          <span class="action-title">${item.title}</span>
          <span class="badge ${item.status === 'completed' ? 'badge-completed' : 'badge-pending'}">
            ${item.status === 'completed' ? '✓ 已回测验证' : '待执行'}
          </span>
        </div>
        <div class="action-compact-meta">
          <span>预期总分增益: <strong>+${item.boost.overall}</strong></span>
          <span>影响度: <strong>${item.impact}/10</strong></span>
          <span>工时: <strong>${item.effort}</strong></span>
          <div class="btn-group">
            <button class="btn-sm btn-sop" data-sop-id="${item.id}">输出指南</button>
            <button class="btn-sm btn-backtest ${item.status === 'completed' ? 'btn-tested' : 'btn-primary'}" data-item-id="${item.id}">
              ${item.status === 'completed' ? '重新回测' : '投入回测'}
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderQuickWinsPreview() {
    const data = state.data;
    const items = data.actionItems.filter(i => i.type === "quick_win");
    return items.map(item => `
      <div class="action-compact-card ${item.status === 'completed' ? 'item-done' : ''}">
        <div class="action-compact-header">
          <span class="action-id">${item.id}</span>
          <span class="action-title">${item.title}</span>
          <span class="badge ${item.status === 'completed' ? 'badge-completed' : 'badge-pending'}">
            ${item.status === 'completed' ? '✓ 已回测验证' : '待执行'}
          </span>
        </div>
        <div class="action-compact-meta">
          <span>JEV 指数: <strong class="text-green">${item.jev}</strong></span>
          <span>工时成本: <strong>${item.effort}</strong> (极低)</span>
          <span>增益: <strong>+${item.boost.overall}</strong></span>
          <div class="btn-group">
            <button class="btn-sm btn-sop" data-sop-id="${item.id}">输出指南</button>
            <button class="btn-sm btn-backtest ${item.status === 'completed' ? 'btn-tested' : 'btn-primary'}" data-item-id="${item.id}">
              ${item.status === 'completed' ? '重新回测' : '投入回测'}
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Tab 2: 动态改善项与闭环操作
  function renderActionsTab() {
    const data = state.data;
    const items = [...data.actionItems];
    // 默认按 JEV 倒序排列
    items.sort((a, b) => b.jev - a.jev);

    return `
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">SEO 持续改善闭环操作台 (JEV 排序 × 单项指南 × 动态回测)</h3>
            <p class="card-desc">每个改善项均配备独家操作指南代码与参数；点击【投入回测】系统将重新计算全站各项得分并更新后续按钮状态。</p>
          </div>
          <div class="filter-group">
            <span class="filter-label">分类筛选:</span>
            <button class="btn-filter ${state.filterCategory === 'all' ? 'active' : ''}" data-cat="all">全部 (${items.length})</button>
            <button class="btn-filter ${state.filterCategory === 'top_impact' ? 'active' : ''}" data-cat="top_impact">最重要项</button>
            <button class="btn-filter ${state.filterCategory === 'quick_win' ? 'active' : ''}" data-cat="quick_win">可立即执行项</button>
          </div>
        </div>

        <div class="action-full-list">
          ${items.filter(i => state.filterCategory === 'all' || i.type === state.filterCategory).map(item => `
            <div class="action-card ${item.status === 'completed' ? 'action-card-completed' : ''}" id="card-${item.id}">
              <div class="action-card-top">
                <div class="action-badge-row">
                  <span class="badge-code">${item.id}</span>
                  <span class="badge-cat">${item.category}</span>
                  ${item.isParetoOptimal ? '<span class="badge-pareto">★ 帕累托最优前沿</span>' : ''}
                  <span class="badge ${item.status === 'completed' ? 'badge-completed' : 'badge-pending'}">
                    ${item.status === 'completed' ? '● 回测已通过 (指标已吸收)' : '○ 待回测验证'}
                  </span>
                </div>
                <div class="action-card-actions">
                  <button class="btn btn-sm btn-outline btn-sop" data-sop-id="${item.id}">
                    📖 输出单项操作指南
                  </button>
                  <button class="btn btn-sm ${item.status === 'completed' ? 'btn-tested' : 'btn-primary'} btn-backtest" data-item-id="${item.id}">
                    ${item.status === 'completed' ? '✓ 已验证 (再次回测)' : '⚡ 执行回测并重算'}
                  </button>
                </div>
              </div>

              <h4 class="action-card-title">${item.title}</h4>
              <p class="action-card-summary">${item.summary}</p>

              <div class="action-metrics-grid">
                <div class="metric-cell">
                  <div class="cell-label">JEV 优先分</div>
                  <div class="cell-value text-accent">${item.jev}</div>
                  <div class="cell-sub">Impact(${item.impact})×Conf(${item.confidence})÷Effort(${item.effort})</div>
                </div>
                <div class="metric-cell">
                  <div class="cell-label">全站总分增益</div>
                  <div class="cell-value text-green">+${item.boost.overall} 分</div>
                  <div class="cell-sub">梯度下降斜率: ${item.gradientSlope}</div>
                </div>
                <div class="metric-cell">
                  <div class="cell-label">关联核心页面</div>
                  <div class="cell-value">${item.targetPages.length} 个页面</div>
                  <div class="cell-sub">${item.targetPages.join(", ")}</div>
                </div>
                <div class="metric-cell">
                  <div class="cell-label">预期最显著维度</div>
                  <div class="cell-value">
                    ${Object.keys(item.boost).filter(k => k !== 'overall' && !k.startsWith('page')).map(k => `${data.dimensions[k]?.name || k} (+${item.boost[k]})`).join("<br>")}
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Tab 3: 22 个核心页面列表
  function renderPagesTab() {
    const data = state.data;
    let pages = [...data.pages];

    if (state.pageSearchQuery) {
      const q = state.pageSearchQuery.toLowerCase();
      pages = pages.filter(p => p.url.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.targetKeyword.toLowerCase().includes(q));
    }

    return `
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">全站核心页面 SEO 指标持续追踪矩阵 (${pages.length} / ${data.pages.length} 页)</h3>
            <p class="card-desc">监控各 URL 的可收录可能性、SEO 高级评分以及与竞品同类内容的信息增益差异度。</p>
          </div>
          <div class="search-box">
            <input type="text" id="page-search-input" placeholder="搜索 URL、关键词或页面标题..." value="${state.pageSearchQuery}" />
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>页面 URL / 类型</th>
                <th>深度</th>
                <th>目标关键词</th>
                <th>可收录可能性</th>
                <th>SEO 高级评分</th>
                <th>竞品差异度</th>
                <th>GSC 状态</th>
                <th>诊断问题与短板</th>
              </tr>
            </thead>
            <tbody>
              ${pages.map(page => `
                <tr>
                  <td>
                    <div class="page-url">
                      <a href="${page.url}" target="_blank" class="url-link">${page.url.replace("https://punmicrogroup.com", "")}</a>
                    </div>
                    <div class="page-title">${page.title}</div>
                    <span class="badge-type">${page.type}</span>
                  </td>
                  <td class="text-center"><strong>${page.depth}</strong></td>
                  <td><code>${page.targetKeyword}</code></td>
                  <td>
                    <div class="score-pill ${page.indexability >= 80 ? 'pill-green' : page.indexability >= 60 ? 'pill-orange' : 'pill-red'}">
                      ${page.indexability}%
                    </div>
                  </td>
                  <td>
                    <div class="score-pill ${page.seoScore >= 75 ? 'pill-green' : page.seoScore >= 60 ? 'pill-orange' : 'pill-red'}">
                      ${page.seoScore}
                    </div>
                  </td>
                  <td>
                    <div class="score-pill ${page.contentDiff >= 70 ? 'pill-green' : 'pill-orange'}">
                      ${page.contentDiff}%
                    </div>
                  </td>
                  <td>
                    <span class="status-tag ${page.gscStatus.includes('Indexed') ? 'status-ok' : 'status-warn'}">
                      ${page.gscStatus}
                    </span>
                  </td>
                  <td class="issue-cell">${page.issue}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Tab 4: 7 家核心/拓展竞品对标
  function renderCompetitorsTab() {
    const data = state.data;
    const comp = data.competitors.find(c => c.id === state.selectedCompetitor) || data.competitors[0];

    return `
      <div class="dashboard-grid">
        <div class="card col-span-4">
          <div class="card-header">
            <h3 class="card-title">竞品对标库 (5 核心 + 2 拓展)</h3>
          </div>
          <div class="comp-list">
            ${data.competitors.map(c => `
              <div class="comp-item ${c.id === comp.id ? 'active' : ''}" data-comp-id="${c.id}">
                <div class="comp-item-header">
                  <strong>${c.name}</strong>
                  <span class="comp-score">${c.overallScore} 分</span>
                </div>
                <div class="comp-item-sub">${c.domain} · ${c.country}</div>
                <div class="comp-item-tier">${c.tier}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="card col-span-8">
          <div class="card-header">
            <h3 class="card-title">对标画像: ${comp.name} (${comp.domain})</h3>
            <span class="card-badge">${comp.tier}</span>
          </div>

          <div class="comp-detail-grid">
            <div class="comp-stat-box">
              <div class="stat-label">全站综合 SEO 得分</div>
              <div class="stat-val text-accent">${comp.overallScore}</div>
              <div class="stat-sub">Punmicro 当前: ${data.currentScore}</div>
            </div>
            <div class="comp-stat-box">
              <div class="stat-label">外链权威度 (siteAuthority)</div>
              <div class="stat-val">${comp.siteAuthority}</div>
              <div class="stat-sub">弱外链站须靠原生表格与纯度弥补</div>
            </div>
            <div class="comp-stat-box">
              <div class="stat-label">Google 收录率</div>
              <div class="stat-val text-green">${comp.indexRate}</div>
              <div class="stat-sub">极低死链与薄页</div>
            </div>
            <div class="comp-stat-box">
              <div class="stat-label">原生表格参数覆盖率</div>
              <div class="stat-val">${comp.tableSupport}</div>
              <div class="stat-sub">直出无需 JS 渲染</div>
            </div>
            <div class="comp-stat-box">
              <div class="stat-label">Schema 结构化标记覆盖</div>
              <div class="stat-val">${comp.schemaCoverage}</div>
              <div class="stat-sub">Product/Organization/Breadcrumb</div>
            </div>
            <div class="comp-stat-box">
              <div class="stat-label">平均用户会话停留 (GA4)</div>
              <div class="stat-val text-green">${comp.avgDwellTime}</div>
              <div class="stat-sub">拉升 NavBoost lastLongestClicks</div>
            </div>
          </div>

          <div class="comp-analysis-box mt-4">
            <h4>竞品核心优势深度剖析：</h4>
            <p>${comp.highlights}</p>
          </div>

          <div class="comp-counter-strategy mt-4">
            <h4>Punmicro 差异化跨越与超越策略：</h4>
            <p>1. <strong>避开大词直接对抗</strong>：在 Interscience 与 IUL 统领的核心短词（如 "colony counter"）下，主攻长尾精准词（"automated colony counter for ISO 4833"、"petri dish false counts reduction"）；</p>
            <p>2. <strong>技术解析零阻力</strong>：比对手更早更彻底地将所有规格用原生 <code>&lt;table&gt;</code> 直出，配合 Answer-First 抢占 Google AI Overviews 首段引用；</p>
            <p>3. <strong>服务与信任直达</strong>：提供对手不具备的“免费送样平皿 48 小时测试（Free Sample Testing）”与具名工程师实时在线支持，拉升转化率。</p>
          </div>
        </div>
      </div>
    `;
  }

  // Tab 5: 帕累托最优与梯度下降
  function renderParetoTab() {
    const data = state.data;
    const items = data.actionItems;

    return `
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">帕累托前沿 (Pareto Front 80/20) 与最佳梯度下降规划</h3>
            <p class="card-desc">以极小工程工时（Effort）撬动极大得分增益（Gain），通过最优梯度向量逐级逼近品类第一。</p>
          </div>
          <span class="card-badge badge-green">数学最优解</span>
        </div>

        <div class="pareto-container">
          <canvas id="paretoChart" width="800" height="380"></canvas>
        </div>

        <div class="pareto-explanation mt-4">
          <div class="explanation-box">
            <h4>📐 帕累托最优（Pareto Optimality）理论在 SEO 中的指导：</h4>
            <p>在所有待办事项中，位于坐标系左上方（<strong>低 Effort、高 Gain</strong>）的改善项构成了“非支配解前沿”。系统已自动标记出 <strong>ACT-02 (内链补网)</strong>、<strong>ACT-03 (Datasheet 门槛降级)</strong> 和 <strong>ACT-01 (SSR 原生表格)</strong> 为帕累托前沿核心杠杆，应在第一迭代周期无条件优先实施。</p>
          </div>
          <div class="explanation-box">
            <h4>📉 最佳梯度下降（Gradient Descent）迭代逻辑：</h4>
            <p>以损失函数 <code>Loss = 94.6 - CurrentScore</code> 为目标，每次选择梯度斜率 <code>∇ = ΔScore / Effort</code> 最大的方向更新网站状态。先排除阻碍收录的技术阻断（负梯度最大），再进行内容增益与 E-E-A-T 填充，确保每 1 小时工程投入产生最大化的排名提升收益。</p>
          </div>
        </div>
      </div>
    `;
  }

  // 4. 单项操作指南模态弹窗
  function openSopModal(itemId) {
    const data = state.data;
    const item = data.actionItems.find(i => i.id === itemId);
    if (!item) return;

    state.activeSopModalItem = item;
    const modalBackdrop = document.getElementById("sop-modal-backdrop");
    if (!modalBackdrop) return;

    modalBackdrop.style.display = "flex";
    modalBackdrop.innerHTML = `
      <div class="modal-box">
        <div class="modal-header">
          <div class="modal-title-row">
            <span class="badge-code">${item.id}</span>
            <span class="badge-cat">${item.category}</span>
            <h3 class="modal-title">${item.title}</h3>
          </div>
          <button class="btn-close-modal" id="btn-close-modal">&times;</button>
        </div>

        <div class="modal-body">
          <section class="sop-section">
            <h4 class="sop-heading">1. 现状诊断与病灶定位</h4>
            <div class="sop-text-box">${item.sop.diagnosis}</div>
          </section>

          <section class="sop-section">
            <h4 class="sop-heading">2. 标准化落地执行步骤 (SOP)</h4>
            <ol class="sop-steps">
              ${item.sop.fixSteps.map(step => `<li>${step}</li>`).join("")}
            </ol>
          </section>

          <section class="sop-section">
            <div class="sop-code-header">
              <h4 class="sop-heading" style="margin: 0;">3. 规范生产代码 / 改写模板</h4>
              <button class="btn-sm btn-outline" id="btn-copy-code">一键复制代码</button>
            </div>
            <pre class="sop-code-block" id="sop-code-content"><code>${escapeHtml(item.sop.codeSnippet)}</code></pre>
          </section>

          <section class="sop-section">
            <div class="sop-dual-info">
              <div>
                <h4 class="sop-heading">4. 执行责任人分工</h4>
                <p><strong>${item.sop.owner}</strong></p>
              </div>
              <div>
                <h4 class="sop-heading">5. 预期验收与验证手段</h4>
                <p>${item.sop.verification}</p>
              </div>
            </div>
          </section>
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-download-sop">📥 下载此指南为 Markdown</button>
          <button class="btn btn-primary btn-modal-backtest" data-item-id="${item.id}">
            ${item.status === 'completed' ? '✓ 已回测达标 (再次回测)' : '⚡ 执行回测仿真'}
          </button>
        </div>
      </div>
    `;

    // 绑定弹窗内部事件
    document.getElementById("btn-close-modal").onclick = closeSopModal;
    modalBackdrop.onclick = (e) => {
      if (e.target === modalBackdrop) closeSopModal();
    };

    document.getElementById("btn-copy-code").onclick = () => {
      navigator.clipboard.writeText(item.sop.codeSnippet).then(() => {
        alert("代码已复制到剪贴板！可以直接粘贴到生产工程。");
      });
    };

    document.getElementById("btn-download-sop").onclick = () => {
      downloadSopMarkdown(item);
    };

    const backtestBtn = modalBackdrop.querySelector(".btn-modal-backtest");
    if (backtestBtn) {
      backtestBtn.onclick = () => {
        triggerBacktest(item.id);
        closeSopModal();
      };
    }
  }

  function closeSopModal() {
    state.activeSopModalItem = null;
    const modalBackdrop = document.getElementById("sop-modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.style.display = "none";
      modalBackdrop.innerHTML = "";
    }
  }

  function downloadSopMarkdown(item) {
    const md = `# [SOP 单项落地操作指南] ${item.id} - ${item.title}\n\n` +
      `**分类**: ${item.category}\n` +
      `**JEV 评分**: ${item.jev} | **预期增益**: +${item.boost.overall} 分 | **工时评估**: ${item.effort}\n\n` +
      `## 1. 现状诊断\n${item.sop.diagnosis}\n\n` +
      `## 2. 执行步骤\n` + item.sop.fixSteps.map((s, idx) => `${idx + 1}. ${s}`).join("\n") + "\n\n" +
      `## 3. 生产标准代码模板\n\`\`\`html\n${item.sop.codeSnippet}\n\`\`\`\n\n` +
      `## 4. 责任人与验收\n- **责任人**: ${item.sop.owner}\n- **验收标准**: ${item.sop.verification}\n`;

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SOP_${item.id}_${item.category}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 5. 回测逻辑闭环
  function triggerBacktest(itemId) {
    const item = state.data.actionItems.find(i => i.id === itemId);
    if (!item) return;

    // 动效提示
    item.status = "completed";
    recalculateMetrics();
    renderApp();

    // 给予轻量反馈
    showNotification(`✅ 已成功对 ${item.id} 执行回测！全站综合得分增加 +${item.boost.overall} 分，最新得分为 ${state.data.currentScore}。关联页面指标已动态更新。`);
  }

  function triggerBacktestAll() {
    state.data.actionItems.forEach(i => i.status = "completed");
    recalculateMetrics();
    renderApp();
    showNotification(`🚀 全量 8 项优化已全部通过回测！全站得分跃升至 ${state.data.currentScore} 分，已成功逼近品类第一 Interscience (${state.data.targetScore})！`);
  }

  function resetAll() {
    state.data = deepClone(INITIAL_DATA);
    recalculateMetrics();
    renderApp();
    showNotification("↺ 看板基准已成功重置为初始状态。");
  }

  function showNotification(msg) {
    const existing = document.getElementById("toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast-box";
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // 6. 事件绑定
  function bindEvents() {
    // 选项卡切换
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.onclick = () => {
        state.activeTab = btn.getAttribute("data-tab");
        renderApp();
      };
    });

    // 全量与重置按钮
    const btnBacktestAll = document.getElementById("btn-backtest-all");
    if (btnBacktestAll) btnBacktestAll.onclick = triggerBacktestAll;

    const btnReset = document.getElementById("btn-reset-data");
    if (btnReset) btnReset.onclick = resetAll;

    // 单项回测按钮
    document.querySelectorAll(".btn-backtest").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-item-id");
        triggerBacktest(id);
      };
    });

    // SOP 查看按钮
    document.querySelectorAll(".btn-sop").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-sop-id");
        openSopModal(id);
      };
    });

    // 分类筛选
    document.querySelectorAll(".btn-filter").forEach(btn => {
      btn.onclick = () => {
        state.filterCategory = btn.getAttribute("data-cat");
        renderApp();
      };
    });

    // 页面搜索
    const searchInput = document.getElementById("page-search-input");
    if (searchInput) {
      searchInput.oninput = (e) => {
        state.pageSearchQuery = e.target.value;
        const tbody = document.querySelector(".data-table tbody");
        if (tbody) {
          // 局部更新页面列表
          let pages = [...state.data.pages];
          if (state.pageSearchQuery) {
            const q = state.pageSearchQuery.toLowerCase();
            pages = pages.filter(p => p.url.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.targetKeyword.toLowerCase().includes(q));
          }
          tbody.innerHTML = pages.map(page => `
            <tr>
              <td>
                <div class="page-url">
                  <a href="${page.url}" target="_blank" class="url-link">${page.url.replace("https://punmicrogroup.com", "")}</a>
                </div>
                <div class="page-title">${page.title}</div>
                <span class="badge-type">${page.type}</span>
              </td>
              <td class="text-center"><strong>${page.depth}</strong></td>
              <td><code>${page.targetKeyword}</code></td>
              <td>
                <div class="score-pill ${page.indexability >= 80 ? 'pill-green' : page.indexability >= 60 ? 'pill-orange' : 'pill-red'}">
                  ${page.indexability}%
                </div>
              </td>
              <td>
                <div class="score-pill ${page.seoScore >= 75 ? 'pill-green' : page.seoScore >= 60 ? 'pill-orange' : 'pill-red'}">
                  ${page.seoScore}
                </div>
              </td>
              <td>
                <div class="score-pill ${page.contentDiff >= 70 ? 'pill-green' : 'pill-orange'}">
                  ${page.contentDiff}%
                </div>
              </td>
              <td>
                <span class="status-tag ${page.gscStatus.includes('Indexed') ? 'status-ok' : 'status-warn'}">
                  ${page.gscStatus}
                </span>
              </td>
              <td class="issue-cell">${page.issue}</td>
            </tr>
          `).join("");
        }
      };
    }

    // 竞品切换
    document.querySelectorAll(".comp-item").forEach(item => {
      item.onclick = () => {
        state.selectedCompetitor = item.getAttribute("data-comp-id");
        renderApp();
      };
    });
  }

  // 7. 原生 Canvas 咨询级图表绘制
  function renderCharts() {
    if (state.activeTab === "overview") {
      drawRadarChart();
    } else if (state.activeTab === "pareto") {
      drawParetoChart();
    }
  }

  // 绘制 5 维度对比雷达图
  function drawRadarChart() {
    const canvas = document.getElementById("radarChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 45;

    const data = state.data;
    const dims = Object.keys(data.dimensions);
    const totalAxes = dims.length;
    const angleStep = (Math.PI * 2) / totalAxes;

    // 绘制多边形背景网格
    const levels = 5;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
    for (let l = 1; l <= levels; l++) {
      const r = (radius / levels) * l;
      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 绘制轴线与文字标签
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // 文本偏移
      const labelX = centerX + (radius + 24) * Math.cos(angle);
      const labelY = centerY + (radius + 18) * Math.sin(angle);
      ctx.fillText(data.dimensions[dims[i]].name, labelX, labelY);
    }

    // 绘制标杆 (Interscience - 绿色虚线)
    drawPolygon(ctx, centerX, centerY, radius, angleStep, dims.map(k => data.dimensions[k].target), "rgba(16, 185, 129, 0.2)", "rgba(16, 185, 129, 0.85)", true);

    // 绘制初始基准 (灰色实线)
    drawPolygon(ctx, centerX, centerY, radius, angleStep, dims.map(k => data.dimensions[k].baseline), "rgba(156, 163, 175, 0.15)", "rgba(156, 163, 175, 0.7)", false);

    // 绘制当前值 (Punmicro 蓝色高亮实心)
    drawPolygon(ctx, centerX, centerY, radius, angleStep, dims.map(k => data.dimensions[k].current), "rgba(37, 99, 235, 0.35)", "rgba(37, 99, 235, 0.95)", false);

    // 图例
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    // 蓝色
    ctx.fillStyle = "rgba(37, 99, 235, 0.9)";
    ctx.fillRect(20, height - 35, 14, 10);
    ctx.fillText(`Punmicro 当前 (${data.currentScore})`, 40, height - 27);
    // 绿色
    ctx.fillStyle = "rgba(16, 185, 129, 0.85)";
    ctx.fillRect(170, height - 35, 14, 10);
    ctx.fillText(`Interscience 标杆 (94.6)`, 190, height - 27);
    // 灰色
    ctx.fillStyle = "rgba(156, 163, 175, 0.7)";
    ctx.fillRect(320, height - 35, 14, 10);
    ctx.fillText(`初始基准 (${data.baselineScore})`, 340, height - 27);
  }

  function drawPolygon(ctx, cx, cy, radius, angleStep, values, fillColor, strokeColor, isDashed) {
    ctx.save();
    if (isDashed) {
      ctx.setLineDash([4, 4]);
    }
    ctx.beginPath();
    values.forEach((val, i) => {
      const r = (radius * (val / 100));
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();

    // 绘制节点圆点
    ctx.fillStyle = strokeColor;
    values.forEach((val, i) => {
      const r = (radius * (val / 100));
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  // 绘制帕累托散点与梯度前沿图
  function drawParetoChart() {
    const canvas = document.getElementById("paretoChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padLeft = 60;
    const padBottom = 50;
    const padTop = 30;
    const padRight = 40;

    const plotWidth = width - padLeft - padRight;
    const plotHeight = height - padTop - padBottom;

    // 坐标范围: Effort 0~6, Gain 0~6
    const maxEffort = 5.5;
    const maxGain = 5.5;

    // 绘制坐标轴
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // 网格线
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "right";
    for (let g = 0; g <= 5; g++) {
      const y = padTop + plotHeight - (g / maxGain) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + plotWidth, y);
      ctx.stroke();
      ctx.fillText(`+${g}分`, padLeft - 8, y + 4);
    }

    ctx.textAlign = "center";
    for (let e = 1; e <= 5; e++) {
      const x = padLeft + (e / maxEffort) * plotWidth;
      ctx.beginPath();
      ctx.moveTo(x, padTop);
      ctx.lineTo(x, padTop + plotHeight);
      ctx.stroke();
      ctx.fillText(`${e}工时`, x, padTop + plotHeight + 18);
    }

    // 轴标题
    ctx.fillStyle = "#111827";
    ctx.font = "12px sans-serif";
    ctx.fillText("工程实施成本 Effort (越靠左越省力 →)", padLeft + plotWidth / 2, height - 10);
    ctx.save();
    ctx.translate(15, padTop + plotHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("预期全站得分增益 Gain (越靠上提升越大 →)", 0, 0);
    ctx.restore();

    const items = state.data.actionItems;

    // 连接帕累托前沿曲线
    const paretoItems = items.filter(i => i.isParetoOptimal);
    paretoItems.sort((a, b) => a.effort - b.effort);

    if (paretoItems.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(16, 185, 129, 0.7)";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 4]);
      paretoItems.forEach((p, idx) => {
        const x = padLeft + (p.effort / maxEffort) * plotWidth;
        const y = padTop + plotHeight - (p.boost.overall / maxGain) * plotHeight;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 绘制散点
    items.forEach(item => {
      const x = padLeft + (item.effort / maxEffort) * plotWidth;
      const y = padTop + plotHeight - (item.boost.overall / maxGain) * plotHeight;

      ctx.beginPath();
      ctx.arc(x, y, item.isParetoOptimal ? 8 : 6, 0, Math.PI * 2);
      ctx.fillStyle = item.status === "completed" ? "#10b981" : item.isParetoOptimal ? "#f59e0b" : "#3b82f6";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // 文本标注
      ctx.fillStyle = "#111827";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${item.id} (+${item.boost.overall}分)`, x + 10, y + 4);
    });

    // 标注帕累托前沿图例
    ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
    ctx.fillText("--- 帕累托最优前沿 (Pareto Frontier)", padLeft + 20, padTop + 20);
  }

  // 初始化入口
  window.addEventListener("DOMContentLoaded", () => {
    renderApp();
  });
})();
