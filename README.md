# Punmicro SEO Monitoring & Continuous Optimization Dashboard
> 目标域名：`punmicrogroup.com`（上海磐麦仪器）  
> 在线演示：[https://kkfy088.github.io/punmicro/seo-dashboard/](https://kkfy088.github.io/punmicro/seo-dashboard/)  
> 理论体系：基于 Google Search Central 官方文档、2024 Content Warehouse API 泄露逆向实证与细分工业品前 20 名搜索特征

---

## 1. 核心监控指标与业务架构

看板针对中小型/出海制造企业“外链权重较弱（`siteAuthority` 偏低）且品牌自然流量较小（`ChromeInTotal` / `NavBoost` 较弱）”的典型困境，建立了三层持续追踪指标：

1. **页面可收录可能性 (Indexability Probability)**：
   - 算法综合评估：代码直出率（SSR / 原生 `<table>` 直出）、Canonical 闭环率、点击深度（≤3）、Sitemap 孤儿页筛查及内容丰富度（>300 词）。
2. **SEO 高级综合评分 (Advanced SEO Score)**：
   - 技术基建（30%）、内容信息增益与具体句（30%）、内链拓扑与点击深度（20%）、E-E-A-T 实体信任背书（10%）、NavBoost 交互留存时长（10%）。
3. **竞品内容差异度 (Content Differentiation / Information Gain)**：
   - 依据普林斯顿大学与 IIT Delhi 关于 GEO 论文及 Google 信息增益专利，量化独家实测参数、国际权威标准（ISO 4833 / ISO 7218 / ASTM）及具体工况描述与同类竞品的差异化比例。

---

## 2. 竞品对标体系 (5 核心 + 2 拓展)

- **核心竞品群 (Core Competitors)**：
  - **Interscience (法国)**：品类第一标杆（94.6 分）。全原生表格、单平皿秒级计数、免门槛白皮书，NavBoost 信号极强。
  - **IUL Instruments (西班牙)**：SphereFlash 菌落计数仪主词统治力强，3D 选型展示完善（88.2 分）。
  - **Don Whitley Scientific / DWS (英国)**：厌氧培养与菌落检测学术背书深厚，文献引用率高（85.7 分）。
  - **Singer Instruments (英国)**：实验室自动化创新强项，页面交互极富创新性（83.4 分）。
  - **Molecular Devices / MD (美国)**：丹纳赫旗下巨头，QPix 系列品牌声量巨大（91.0 分）。
- **增量拓展参考竞品 (Benchmark Giants)**：
  - **Keyence (基恩士)**：全球工业品 SEO 典范（96.5 分），极高密度的原理技术白皮书、全原生表格直出。
  - **Thermo Fisher Scientific (赛默飞)**：生命科学航母（97.2 分），全网超高权重。

---

## 3. 动态优先级与优化算法

看板引入运筹学与机器学习优化思想，拒绝无序散乱的优化：

1. **JEV (Jevons Economic Value) 评估模型**：
   $$JEV = \frac{Impact\ (预期影响\ 1\sim 10) \times Confidence\ (实现置信度\ 0.1\sim 1.0)}{Effort\ (工程工作量\ 1\sim 10)}$$
2. **帕累托最优 (Pareto Front 80/20 前沿)**：
   在 $(Effort, Gain)$ 二维空间中计算非支配解，自动圈出以 20% 工程量撬动 80% 收益的决定性杠杆（如内链补网、表格原生直出、Datasheet 门槛降级）。
3. **最佳梯度下降 (Gradient Descent) 逼近品类第一**：
   定义与品类第一名标杆的差距为损失函数 $Loss = Score_{Target} - Score_{Current}$。系统计算各优化项的斜率 $\nabla_i = \frac{\Delta Score_i}{Effort_i}$，将优化项划分为：
   - **🔥 最重要改善项 (Top Impact Items)**：$\Delta Score$ 最大，攻克收录与排名的根本卡点；
   - **⚡ 可立即执行改善项 (Quick Wins)**：工时极低（≤2h）且 JEV 极高，半小时内即可上线见效。

---

## 4. 交互与回测闭环操作

1. **输出单项操作指南**：
   每个改善项配备独立的 SOP 弹窗，输出具体的病灶定位、执行步骤、生产级代码片段（原生 HTML `<table>`、JSON-LD、Nginx 301/410 规则等）及一键复制代码与 Markdown 下载。
2. **回测仿真闭环 (Backtest & Re-scoring)**：
   点击【执行回测】后，仿真引擎自动重估各项得分：
   - 实时累加全站综合得分并刷新 5 维度雷达图；
   - 动态更新 22 个受影响页面的可收录率、SEO 分及竞品差异度；
   - 按钮更新为“已验证”，并触发梯度优化器重新排序后续待办项；
   - 支持【一键模拟全量回测】直观演示 Punmicro 从 58.4 分跃升至 92+ 分逼近品类第一的全过程。

---

## 5. 项目部署结构

- `/seo-dashboard/index.html`：仪表盘主单页应用
- `/seo-dashboard/data.js`：22 个核心页面基线数据、7 大竞品对比矩阵与 8 大动态改善项库
- `/seo-dashboard/app.js`：JEV、帕累托与梯度下降算法引擎，Canvas 雷达图与散点图绘制，回测闭环驱动
- `/seo-dashboard/styles.css`：咨询级商务美学样式
- `/index.html`：根目录路由重定向与进入入口
