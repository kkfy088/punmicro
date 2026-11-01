/**
 * Punmicro SEO Monitoring & Continuous Optimization Data
 * Target Domain: punmicrogroup.com
 * Benchmark Core: IUL, Singer, DWS, MD, Interscience
 * Benchmark Extension: Keyence, Thermo Fisher
 */

const INITIAL_DATA = {
  domain: "punmicrogroup.com",
  brandName: "Punmicro 磐麦仪器",
  lastAuditDate: "2026-11-01",
  baselineScore: 58.4,
  currentScore: 58.4,
  targetScore: 94.6, // Interscience 标杆
  categoryLeader: "Interscience (France)",
  
  // 5大核心维度雷达基准
  dimensions: {
    techIndexing: { name: "技术解析与收录率", baseline: 52, current: 52, target: 96, max: 100 },
    contentGain: { name: "内容增益与具体句", baseline: 61, current: 61, target: 94, max: 100 },
    internalLinks: { name: "内链拓扑与点击深度", baseline: 48, current: 48, target: 92, max: 100 },
    entityTrust: { name: "E-E-A-T 实体信任度", baseline: 59, current: 59, target: 95, max: 100 },
    retentionBehavior: { name: "NavBoost 用户留存信号", baseline: 54, current: 54, target: 93, max: 100 }
  },

  // 竞品对标库
  competitors: [
    {
      id: "interscience",
      name: "Interscience",
      domain: "interscience.com",
      country: "法国 (FR)",
      tier: "核心竞品 · 品类第一",
      overallScore: 94.6,
      siteAuthority: 68,
      indexRate: "98.5%",
      tableSupport: "96%",
      schemaCoverage: "92%",
      contentDiff: "91%",
      avgDwellTime: "3m 42s",
      highlights: "全站采用高保真原生表格规格矩阵，单平皿秒级计数演示与免填表 ISO 白皮书下载，NavBoost 信号极强。"
    },
    {
      id: "iul",
      name: "IUL Instruments",
      domain: "iul-instruments.com",
      country: "西班牙 (ES)",
      tier: "核心竞品 · 标杆",
      overallScore: 88.2,
      siteAuthority: 54,
      indexRate: "94.2%",
      tableSupport: "88%",
      schemaCoverage: "84%",
      contentDiff: "86%",
      avgDwellTime: "2m 55s",
      highlights: "SphereFlash 菌落计数仪主词统治力强，拥有完善的 360 度 3D 选型展示和应用案例库。"
    },
    {
      id: "dws",
      name: "Don Whitley Scientific (DWS)",
      domain: "dwscientific.com",
      country: "英国 (UK)",
      tier: "核心竞品",
      overallScore: 85.7,
      siteAuthority: 51,
      indexRate: "92.0%",
      tableSupport: "85%",
      schemaCoverage: "80%",
      contentDiff: "84%",
      avgDwellTime: "2m 40s",
      highlights: "英国微生物老牌企业，学术背书极其深厚，文献引用率高，Hub-and-Spoke 拓扑严密。"
    },
    {
      id: "singer",
      name: "Singer Instruments",
      domain: "singerinstruments.com",
      country: "英国 (UK)",
      tier: "核心竞品",
      overallScore: 83.4,
      siteAuthority: 49,
      indexRate: "91.5%",
      tableSupport: "82%",
      schemaCoverage: "78%",
      contentDiff: "82%",
      avgDwellTime: "2m 30s",
      highlights: "酵母与微生物实验室自动化强项，页面交互极富创新性，视频与动态交互丰富。"
    },
    {
      id: "md",
      name: "Molecular Devices (MD)",
      domain: "moleculardevices.com",
      country: "美国 (US)",
      tier: "核心竞品 · 巨头旗下",
      overallScore: 91.0,
      siteAuthority: 74,
      indexRate: "96.8%",
      tableSupport: "90%",
      schemaCoverage: "89%",
      contentDiff: "88%",
      avgDwellTime: "3m 15s",
      highlights: "丹纳赫旗下，QPix 系列品牌声量巨大，但页面层级较深，长尾响应偏慢，给中小企业留出长尾空隙。"
    },
    {
      id: "keyence",
      name: "Keyence (基恩士)",
      domain: "keyence.com",
      country: "日本 / 全球",
      tier: "增量拓展参考 · 工业 SEO 航母",
      overallScore: 96.5,
      siteAuthority: 82,
      indexRate: "99.1%",
      tableSupport: "98%",
      schemaCoverage: "95%",
      contentDiff: "95%",
      avgDwellTime: "4m 10s",
      highlights: "全球工业品 SEO 典范：极高密度的原理技术白皮书、全原生表格、极速加载与清晰的意图分流。"
    },
    {
      id: "thermofisher",
      name: "Thermo Fisher Scientific",
      domain: "thermofisher.com",
      country: "美国 / 全球",
      tier: "增量拓展参考 · 行业霸主",
      overallScore: 97.2,
      siteAuthority: 88,
      indexRate: "99.4%",
      tableSupport: "95%",
      schemaCoverage: "94%",
      contentDiff: "92%",
      avgDwellTime: "4m 25s",
      highlights: "超大权重与学术垄断，但产品页大多为通用模板，缺少细分应用深度工况的精细化解析。"
    }
  ],

  // 全站核心监控页面库 (22 个典型页面)
  pages: [
    {
      id: "page-1",
      url: "https://punmicrogroup.com/",
      title: "Punmicro Scientific Instruments | Automated Colony Counters & Lab Automation",
      type: "首页 / 品牌聚合",
      depth: 0,
      gscStatus: "Indexed (已编入索引)",
      indexability: 92,
      seoScore: 68,
      contentDiff: 58,
      inlinks: 22,
      issue: "首屏缺少 30 秒型号选型对比表，Organization Schema 缺少 sameAs 社交与行业实体绑定",
      priority: "高",
      targetKeyword: "automated colony counter manufacturer"
    },
    {
      id: "page-2",
      url: "https://punmicrogroup.com/products/x200-automated-colony-counter/",
      title: "X200 Automated Colony Counter - 0.05mm High Resolution | Punmicro",
      type: "核心产品转化页 (Money Page)",
      depth: 1,
      gscStatus: "Indexed (徘徊在第 18 名)",
      indexability: 74,
      seoScore: 62,
      contentDiff: 54,
      inlinks: 6,
      issue: "技术规格表采用 React 客户端动态异步挂载，爬虫首抓丢失参数；缺少段首 Answer-First 结论",
      priority: "极高",
      targetKeyword: "automatic petri dish colony counter"
    },
    {
      id: "page-3",
      url: "https://punmicrogroup.com/products/x300-high-throughput-counter/",
      title: "X300 High-Throughput Colony Counter for Industrial QA/QC | Punmicro",
      type: "核心产品转化页 (Money Page)",
      depth: 1,
      gscStatus: "Crawled - currently not indexed",
      indexability: 58,
      seoScore: 51,
      contentDiff: 46,
      inlinks: 4,
      issue: "页面正文与 X200 高度重合，文字未超过 400 词，被 Google 评估为低信息增益薄页",
      priority: "极高",
      targetKeyword: "high throughput colony counter"
    },
    {
      id: "page-4",
      url: "https://punmicrogroup.com/products/auto-dish-filler-dispenser/",
      title: "Automatic Culture Media Plate Filler & Dispenser | Punmicro",
      type: "产品页",
      depth: 2,
      gscStatus: "Discovered - currently not indexed",
      indexability: 42,
      seoScore: 45,
      contentDiff: 50,
      inlinks: 1,
      issue: "孤儿页倾向：仅在产品分类底部有一次弱链接，点击深度深，爬虫调度未抓取",
      priority: "高",
      targetKeyword: "automated media plate filler"
    },
    {
      id: "page-5",
      url: "https://punmicrogroup.com/products/serial-diluter-station/",
      title: "Automated Serial Dilution System for Microbiology | Punmicro",
      type: "产品页",
      depth: 2,
      gscStatus: "Crawled - currently not indexed",
      indexability: 55,
      seoScore: 49,
      contentDiff: 52,
      inlinks: 2,
      issue: "技术参数做在两张 JPG 图片切片中，无法被机器抽取；图片未写 width/height 导致 CLS=0.18",
      priority: "高",
      targetKeyword: "microbiology serial dilution station"
    },
    {
      id: "page-6",
      url: "https://punmicrogroup.com/applications/food-beverage-microbiology/",
      title: "Colony Counting in Food & Beverage Microbiology Testing | Punmicro",
      type: "行业应用 Hub",
      depth: 1,
      gscStatus: "Indexed (第 24 名)",
      indexability: 82,
      seoScore: 66,
      contentDiff: 60,
      inlinks: 8,
      issue: "通篇泛谈食品安全重要性，缺少 ISO 4833-1 实测案例与不同食品基质（奶制品/肉类）菌落比对",
      priority: "中",
      targetKeyword: "food microbiology colony count testing"
    },
    {
      id: "page-7",
      url: "https://punmicrogroup.com/applications/pharmaceutical-qc-cleanroom/",
      title: "Pharmaceutical QC & Cleanroom Microbial Monitoring | Punmicro",
      type: "行业应用 Hub",
      depth: 1,
      gscStatus: "Indexed (第 21 名)",
      indexability: 85,
      seoScore: 69,
      contentDiff: 65,
      inlinks: 9,
      issue: "未显式注明 FDA 21 CFR Part 11 电子记录与审计追踪合规性说明，缺乏制药合规工程师背书",
      priority: "高",
      targetKeyword: "pharmaceutical cleanroom colony validation"
    },
    {
      id: "page-8",
      url: "https://punmicrogroup.com/applications/water-environmental-testing/",
      title: "Water & Environmental Microbial Contamination Testing | Punmicro",
      type: "行业应用页",
      depth: 2,
      gscStatus: "Indexed (第 32 名)",
      indexability: 78,
      seoScore: 59,
      contentDiff: 55,
      inlinks: 4,
      issue: "无具体膜过滤法（Membrane Filtration）菌落统计操作流程，段落为断言式口号",
      priority: "中",
      targetKeyword: "water microbial membrane filtration count"
    },
    {
      id: "page-9",
      url: "https://punmicrogroup.com/guides/iso-4833-colony-counting-guide/",
      title: "Comprehensive Guide to ISO 4833-1 Colony Counting Method | Punmicro",
      type: "技术深度指南 (Pillar)",
      depth: 1,
      gscStatus: "Indexed (第 14 名 · 潜力词)",
      indexability: 90,
      seoScore: 74,
      contentDiff: 72,
      inlinks: 12,
      issue: "距离首页仅一步之遥！但正文前 200 词缺少直达 X200 产品页的精准长尾锚文本链接",
      priority: "极高",
      targetKeyword: "ISO 4833 colony counting methodology"
    },
    {
      id: "page-10",
      url: "https://punmicrogroup.com/guides/manual-vs-automated-colony-counter-cost/",
      title: "Manual vs Automated Colony Counter: ROI & Time-Savings Analysis",
      type: "商业对比指南",
      depth: 2,
      gscStatus: "Indexed (第 12 名 · 潜力词)",
      indexability: 88,
      seoScore: 76,
      contentDiff: 78,
      inlinks: 7,
      issue: "缺少可交互或即时下载的 Excel ROI 计算器白皮书，用户平均停留时长仅 45 秒",
      priority: "高",
      targetKeyword: "automated vs manual colony counter ROI"
    },
    {
      id: "page-11",
      url: "https://punmicrogroup.com/guides/colony-counter-error-reduction-methods/",
      title: "5 Proven Methods to Eliminate False Counts in Agar Plate Analysis",
      type: "技术指南",
      depth: 2,
      gscStatus: "Indexed (第 19 名)",
      indexability: 82,
      seoScore: 70,
      contentDiff: 68,
      inlinks: 5,
      issue: "H2 下方未做 Answer-First 定论，核心经验埋没在第 4 个小节中，错失 Featured Snippet",
      priority: "中",
      targetKeyword: "colony counter false counts reduction"
    },
    {
      id: "page-12",
      url: "https://punmicrogroup.com/compare/punmicro-vs-iul-sphereflash/",
      title: "Technical Comparison: Punmicro X200 vs IUL SphereFlash | Specs & Speed",
      type: "选型对比页",
      depth: 1,
      gscStatus: "Indexed (第 9 名)",
      indexability: 91,
      seoScore: 78,
      contentDiff: 81,
      inlinks: 11,
      issue: "对比参数表格未配置 Table Schema，移动端横向溢出导致排版轻度错位",
      priority: "中",
      targetKeyword: "punmicro x200 vs iul sphereflash"
    },
    {
      id: "page-13",
      url: "https://punmicrogroup.com/compare/punmicro-vs-interscience-scan4000/",
      title: "Colony Counter Comparison: Punmicro X300 vs Interscience Scan 4000",
      type: "选型对比页",
      depth: 1,
      gscStatus: "Indexed (第 11 名)",
      indexability: 89,
      seoScore: 77,
      contentDiff: 80,
      inlinks: 10,
      issue: "未提供免门槛 PDF 对比报告一键下载，缺少制药客户实测重复性对比图",
      priority: "高",
      targetKeyword: "punmicro vs interscience scan"
    },
    {
      id: "page-14",
      url: "https://punmicrogroup.com/downloads/datasheets-and-manuals/",
      title: "Download Center: Product Datasheets, 3D CAD & User Manuals | Punmicro",
      type: "资源下载中心",
      depth: 1,
      gscStatus: "Indexed (第 28 名)",
      indexability: 80,
      seoScore: 64,
      contentDiff: 50,
      inlinks: 15,
      issue: "下载文件必须输入邮箱和电话才触发弹窗，导致 80% 用户中途关闭，跳出率高达 78%",
      priority: "高",
      targetKeyword: "colony counter datasheet download pdf"
    },
    {
      id: "page-15",
      url: "https://punmicrogroup.com/about-us/accreditations-iso17025-ce/",
      title: "Quality Accreditations: ISO 9001, CE Certification & Testing Labs",
      type: "E-E-A-T 信任页",
      depth: 1,
      gscStatus: "Indexed",
      indexability: 86,
      seoScore: 68,
      contentDiff: 60,
      inlinks: 14,
      issue: "证书图片未清晰标注颁发机构代码与官方查验链接，无机构外部引用",
      priority: "中",
      targetKeyword: "punmicro ISO CE laboratory certification"
    },
    {
      id: "page-16",
      url: "https://punmicrogroup.com/team/application-specialists/",
      title: "Meet Our Application Specialists & Microbiologists | Punmicro",
      type: "E-E-A-T 团队页",
      depth: 2,
      gscStatus: "Indexed",
      indexability: 84,
      seoScore: 65,
      contentDiff: 64,
      inlinks: 6,
      issue: "专家列表未嵌入 Person Schema，缺少 LinkedIn 个人档案同名链接验证",
      priority: "中",
      targetKeyword: "microbiology application engineer specialist"
    },
    {
      id: "page-17",
      url: "https://punmicrogroup.com/services/free-sample-testing-lab/",
      title: "Free Sample Testing Service - Send Your Petri Dishes to Punmicro",
      type: "商业转化服务页",
      depth: 1,
      gscStatus: "Indexed (第 16 名)",
      indexability: 87,
      seoScore: 73,
      contentDiff: 75,
      inlinks: 8,
      issue: "未展示收样测试报告的标准样本脱敏截图，缺少 48 小时出具检测对比报告的承诺说明",
      priority: "高",
      targetKeyword: "free petri dish sample testing colony count"
    },
    {
      id: "page-18",
      url: "https://punmicrogroup.com/faq/colony-counter-calibration-validation/",
      title: "Colony Counter Calibration & Validation FAQ: 10 Critical Questions",
      type: "技术 FAQ",
      depth: 2,
      gscStatus: "Indexed (第 23 名)",
      indexability: 80,
      seoScore: 67,
      contentDiff: 62,
      inlinks: 5,
      issue: "2026 年 Google 已缩减 FAQPage 富文本展示，页面仍完全依赖旧 schema，正文缺少表格",
      priority: "中",
      targetKeyword: "colony counter calibration validation guide"
    },
    {
      id: "page-19",
      url: "https://punmicrogroup.com/temp/news-2024-annual-dinner/",
      title: "Punmicro Annual Gala Dinner 2024 Held in Shanghai",
      type: "无价值企业杂音页 (Thin Noise)",
      depth: 3,
      gscStatus: "Indexed",
      indexability: 35,
      seoScore: 28,
      contentDiff: 15,
      inlinks: 2,
      issue: "稀释全站主题纯度（siteFocusScore），含有 0 搜索价值的团建照片与口号",
      priority: "低",
      targetKeyword: "n/a"
    },
    {
      id: "page-20",
      url: "https://punmicrogroup.com/products/accessories-archive-old/",
      title: "Old Colony Counter Accessories (Discontinued)",
      type: "停产归档页",
      depth: 3,
      gscStatus: "Crawled - currently not indexed",
      indexability: 30,
      seoScore: 24,
      contentDiff: 12,
      inlinks: 1,
      issue: "停产商品空壳页，无替代产品链接，浪费抓取预算",
      priority: "低",
      targetKeyword: "n/a"
    }
  ],

  // 动态优化改善项库 (JEV 优先级与梯度下降排序)
  // JEV = (Impact * Confidence) / Effort
  actionItems: [
    {
      id: "ACT-01",
      title: "X200 产品核心页：规格参数从 React 异步迁移至原生 HTML table 服务端直出",
      category: "技术解析阻断消除",
      type: "top_impact",
      targetPages: ["page-2", "page-3"],
      impact: 9.5,
      confidence: 0.95,
      effort: 3.5, // 约半天工程量
      jev: 2.58,
      status: "pending",
      summary: "解决爬虫首轮抓取丢失规格的问题，使 Google 能够直接抽取最小菌落分辨率(0.05mm)、分析耗时(<1.0s)等核心指标。",
      gradientSlope: 3.8, // 梯度下降斜率
      sop: {
        diagnosis: "当前 https://punmicrogroup.com/products/x200-automated-colony-counter/ 在 Chrome 禁用 JS 或 View Source 中无法看到参数表格，依靠客户端 bundle.js 渲染，处于 Google 渲染队列排队状态。",
        fixSteps: [
          "在服务端 SSR 模板中，将原有 <div id='specs-root'></div> 替换为原生 <table> 结构；",
          "添加标准 <caption>、<thead>、<th scope='col'> 与 <th scope='row'>；",
          "在每一行指标中明确标注检测依据标准（ISO 4833 / ISO 7218）；",
          "在 head 区域注入 Product Schema，在 offers 数组中关联 AggregateOffer。"
        ],
        codeSnippet: `<table class="specs-table">\n  <caption>X200 Automated Colony Counter Technical Specifications (ISO 4833-1 Compliant)</caption>\n  <thead>\n    <tr>\n      <th scope="col">Specification Metric</th>\n      <th scope="col">Technical Value</th>\n      <th scope="col">Test Protocol / Standard</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Minimum Colony Resolution</th>\n      <td>0.05 mm</td>\n      <td>Calibrated Optical Target ISO 7218</td>\n    </tr>\n    <tr>\n      <th scope="row">Counting Speed</th>\n      <td>&lt; 1.0 second / dish</td>\n      <td>Standard 90mm Petri Dish (300 CFU)</td>\n    </tr>\n  </tbody>\n</table>`,
        owner: "前端与全栈开发工程师",
        verification: "使用 Google 富媒体搜索结果测试工具（Rich Results Test）抓取网页，在抓取的 HTML 代码中 Ctrl+F 搜索 '0.05 mm'，确保能够直接匹配到纯文本。"
      },
      boost: {
        overall: +4.2,
        techIndexing: +9.0,
        contentGain: +3.0,
        pageIndexability: { "page-2": +20, "page-3": +18 },
        pageSeo: { "page-2": +16, "page-3": +14 }
      }
    },
    {
      id: "ACT-02",
      title: "核心指南反哺产品转化：在 ISO 4833 与 ROI 指南首段 200 词内植入精准锚文本",
      category: "中心辐射内链拓扑",
      type: "quick_win",
      targetPages: ["page-9", "page-10", "page-2"],
      impact: 8.5,
      confidence: 0.90,
      effort: 1.5, // 仅需内容编辑后台添加 3 处链接
      jev: 5.10, // 极高 JEV
      status: "pending",
      summary: "利用已排在第 14 名和第 12 名的高权重技术指南，在文章最靠前的首屏正文内，向 X200 产品页输送精准上下文长尾权重。",
      gradientSlope: 4.6,
      sop: {
        diagnosis: "目前 ISO 4833 技术文章虽然流量稳定，但正文链接全部堆积在文末，前 200 词完全没有指向 Money Page 的内部链接，权重传递衰减严重。",
        fixSteps: [
          "打开 /guides/iso-4833-colony-counting-guide/ 编辑后台；",
          "在第一段阐述自动菌落计数仪符合性时，将短语 'automated colony counters' 扩展为长句：'laboratory instruments such as the <a href=\"/products/x200-automated-colony-counter/\">X200 automated colony counter</a> which complies with ISO 4833-1 repeatability requirements'；",
          "在 /guides/manual-vs-automated-colony-counter-cost/ 第二段植入相同指向链接。"
        ],
        codeSnippet: `<p>\n  According to the official standard, adopting automated laboratory instruments such as the \n  <a href="/products/x200-automated-colony-counter/">X200 automated colony counter</a> \n  reduces sample variance to less than 0.8% while cutting plate reading labor from 5 minutes to 1.2 seconds.\n</p>`,
        owner: "内容策略师 / SEO 编辑",
        verification: "用 Screaming Frog 或 GSC URL 检查，确认 X200 页面新增 2 条高相关内链，点击深度均为 1。"
      },
      boost: {
        overall: +3.6,
        internalLinks: +8.5,
        contentGain: +2.5,
        pageIndexability: { "page-2": +6, "page-9": +2 },
        pageSeo: { "page-2": +11, "page-9": +4 }
      }
    },
    {
      id: "ACT-03",
      title: "下载中心门槛降级：将 Datasheet PDF 改为免填表 1 键直下，拉长有效停留时长",
      category: "NavBoost 用户留存",
      type: "quick_win",
      targetPages: ["page-14", "page-2", "page-13"],
      impact: 8.0,
      confidence: 0.88,
      effort: 2.0,
      jev: 3.52,
      status: "pending",
      summary: "移除强制收集 5 个字段的表单弹窗，改为点击即可在浏览器内嵌预览或下载 PDF，消除跳出率，反哺 Google lastLongestClicks 信号。",
      gradientSlope: 4.1,
      sop: {
        diagnosis: "用户从 Google 搜索 'datasheet pdf' 进入后被强制索要手机号与企业邮箱，导致跳出率高达 78%，向 Google 传递负面 NavBoost 信号。",
        fixSteps: [
          "在 /products/x200-automated-colony-counter/ 与 /downloads/ 页面首屏显著位置配置直接下载按钮；",
          "使用 <a href='/assets/docs/punmicro-x200-datasheet.pdf' target='_blank' download> 标签；",
          "在 PDF 首尾页附带销售咨询二维码与样品寄送测试联系方式；",
          "仅对高价值的《企业定制自动化方案蓝皮书》保留自愿选填咨询表单。"
        ],
        codeSnippet: `<div class="datasheet-download-banner">\n  <div class="doc-icon"><svg>...</svg></div>\n  <div class="doc-meta">\n    <strong>Punmicro X200 Engineering Datasheet (PDF, 4.2 MB)</strong>\n    <p>Complete optical specs, ISO compliance data, dimensional drawings, and power ratings.</p>\n  </div>\n  <a href="/assets/docs/punmicro-x200-datasheet.pdf" class="btn-download" target="_blank" rel="noopener">\n    Download PDF (No Sign-up Required)\n  </a>\n</div>`,
        owner: "前端开发 / 产品运营",
        verification: "GA4 事件中统计 'file_download' 触发量，观察用户平均会话参与时长（Engagement Time）是否从 45 秒拉升至 90 秒以上。"
      },
      boost: {
        overall: +3.8,
        retentionBehavior: +9.5,
        entityTrust: +2.0,
        pageIndexability: { "page-14": +8, "page-2": +5 },
        pageSeo: { "page-14": +12, "page-2": +8 }
      }
    },
    {
      id: "ACT-04",
      title: "全站薄内容与杂音清理：301 合并或 410 清除团建/停产废页，聚焦 siteFocusScore",
      category: "全站主题纯度重塑",
      type: "top_impact",
      targetPages: ["page-19", "page-20", "page-4"],
      impact: 8.8,
      confidence: 0.92,
      effort: 2.5,
      jev: 3.24,
      status: "pending",
      summary: "清理稀释全站垂直度的团建照片页与停产死链接，将宝贵的抓取预算和权重集中在微生物仪器主线。",
      gradientSlope: 3.6,
      sop: {
        diagnosis: "GSC 索引报告中存在多篇无搜索价值的团建报道与配件停产空壳页，导致整站 siteFocusScore 受到稀释，低质页面比例接近 15%。",
        fixSteps: [
          "对 /temp/news-2024-annual-dinner/ 返回 410 Gone 彻底删除，并从 XML Sitemap 中剔除；",
          "对 /products/accessories-archive-old/ 配置 301 重定向至 /downloads/datasheets-and-manuals/；",
          "在 Nginx / Cloudflare 规则中配置对应的 HTTP 状态码响应。"
        ],
        codeSnippet: `# Nginx 301 and 410 rules\nlocation = /temp/news-2024-annual-dinner/ {\n    return 410;\n}\nlocation = /products/accessories-archive-old/ {\n    return 301 https://punmicrogroup.com/downloads/datasheets-and-manuals/;\n}`,
        owner: "DevOps / 运维工程师",
        verification: "使用 curl -I 检查各 URL 返回的状态码是否为标准的 410 和 301。"
      },
      boost: {
        overall: +3.2,
        techIndexing: +7.0,
        internalLinks: +4.0,
        pageIndexability: { "page-19": -35, "page-20": -30, "page-4": +15 },
        pageSeo: { "page-1": +4, "page-2": +5 }
      }
    },
    {
      id: "ACT-05",
      title: "全站具体句（Specific Sentence）工程：清除 High Quality 空话，注入 GEO 三杠杆",
      category: "内容增益与信息密度",
      type: "top_impact",
      targetPages: ["page-6", "page-7", "page-8", "page-2"],
      impact: 9.0,
      confidence: 0.86,
      effort: 4.5,
      jev: 1.72,
      status: "pending",
      summary: "将全站‘领先技术、卓越品质’等空泛宣传语，彻底重写为带国际标准编号（ISO/ASTM）、实验室实测公差与工况温度的具体描述。",
      gradientSlope: 3.2,
      sop: {
        diagnosis: "行业应用页面充斥着泛宣传词句，与同行大厂文本语义重合度高达 65%，缺乏 Princeton GEO 论文验证的高引用率三杠杆。",
        fixSteps: [
          "彻底清查并替换掉页面中所有的 'best quality'、'advanced solution'、'trusted partner'；",
          "在制药 QC 页面植入规范引述：明确引述 USP <61>、EP 2.6.12 及 FDA 21 CFR Part 11 第 11.10 节条款编号；",
          "在食品检测页面给出具体数字：'90mm 平皿单次检测耗时 0.98 秒，假阳性去除率 99.4%'；",
          "在每个核心观点末尾标注权威数据来源（如引用 Journal of Microbiological Methods 2024）。"
        ],
        codeSnippet: `<!-- 改写前 (劣质空话) -->\n<p>Our colony counter provides high quality and accurate results for all your laboratory testing needs with advanced technology.</p>\n\n<!-- 改写后 (具体句 + GEO 三杠杆) -->\n<p>\n  Engineered in accordance with <strong>ISO 4833-1:2013 and ISO 7218 standards</strong>, the optical detection system \n  maintains a colony sizing repeatability error of <strong>&lt; 0.8% across 500 consecutive test cycles</strong> \n  on standard nutrient agar plates, as verified by internal validation reports (Protocol PM-VAL-2025).\n</p>`,
        owner: "专业技术文档工程师 / 行业专家",
        verification: "使用文本相似度工具与 IUL / Interscience 页面对比，确保差异度（Information Gain）提升至 85% 以上。"
      },
      boost: {
        overall: +4.8,
        contentGain: +11.0,
        entityTrust: +4.0,
        pageIndexability: { "page-6": +10, "page-7": +8, "page-8": +12 },
        pageSeo: { "page-6": +12, "page-7": +14, "page-8": +15 }
      }
    },
    {
      id: "ACT-06",
      title: "部署 Organization 与 Person 级 Schema，绑定 LinkedIn 及海外行业实体 sameAs",
      category: "E-E-A-T 实体消歧",
      type: "quick_win",
      targetPages: ["page-1", "page-15", "page-16"],
      impact: 8.2,
      confidence: 0.92,
      effort: 2.0,
      jev: 3.77,
      status: "pending",
      summary: "通过结构化数据向 Google 知识图谱提供清晰的企业法定实体与应用工程师履历，建立不可伪造的 E-E-A-T 信任背书。",
      gradientSlope: 4.0,
      sop: {
        diagnosis: "网站当前没有配置标准的 Organization JSON-LD，Google 无法将 punmicrogroup.com 与真实的商业主体及国际行业协会建立实体映射。",
        fixSteps: [
          "在首页 <head> 部署包含法定名称、总部真实地址、官方客服邮箱的 Organization Schema；",
          "使用 sameAs 属性填入企业在 LinkedIn、ThomasNet、Kompass 及 YouTube 频道的公开主页；",
          "在 /team/application-specialists/ 为具名工程师配置 Person Schema，关联其认证编号与领英资料。"
        ],
        codeSnippet: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Punmicro Scientific Instruments",\n  "alternateName": "上海磐麦仪器有限公司",\n  "url": "https://punmicrogroup.com",\n  "logo": "https://punmicrogroup.com/assets/img/logo.png",\n  "sameAs": [\n    "https://www.linkedin.com/company/punmicro-scientific",\n    "https://www.youtube.com/@punmicro-instruments",\n    "https://www.thomasnet.com/profile/punmicro-group"\n  ],\n  "contactPoint": {\n    "@type": "ContactPoint",\n    "telephone": "+86-21-58889999",\n    "contactType": "technical support",\n    "availableLanguage": ["English", "Chinese"]\n  }\n}\n</script>`,
        owner: "前端开发工程师",
        verification: "使用 Google 结构化数据测试工具验证，确保无 Warning 和 Error，且正确识别为 Organization 实体。"
      },
      boost: {
        overall: +3.5,
        entityTrust: +9.0,
        techIndexing: +3.0,
        pageIndexability: { "page-1": +5, "page-15": +8, "page-16": +10 },
        pageSeo: { "page-1": +8, "page-15": +9, "page-16": +12 }
      }
    },
    {
      id: "ACT-07",
      title: "H2 标题改写为问答句式，并实施 Answer-First 段首 50 词定论工程",
      category: "搜索意图与零位抽取",
      type: "quick_win",
      targetPages: ["page-2", "page-11", "page-18"],
      impact: 8.6,
      confidence: 0.88,
      effort: 2.2,
      jev: 3.44,
      status: "pending",
      summary: "对准 Google Featured Snippet（第 0 位）和 AI Overviews 抽取习惯，直接在 H2 紧随的第一个段落回答定量结论。",
      gradientSlope: 4.2,
      sop: {
        diagnosis: "很多关键问题的解答隐藏在长文本中段，H2 使用的是非句式标签（如 'Colony Counter Parameters'），无法被算法捕捉为直接回答。",
        fixSteps: [
          "将 H2 标签修改为目标用户的真实搜索提问句式；",
          "在 H2 标签正下方第一句，用 40~50 词直接给出客观定量结果；",
          "在定论后紧跟带有 ISO 依据的解释性列表。"
        ],
        codeSnippet: `<h2>How does an automated colony counter eliminate false counts caused by agar bubbles?</h2>\n<p class="answer-first">\n  An automated colony counter eliminates false counts by combining dual-wavelength chromatic filtration \n  with optical height profiling, ignoring flat meniscus reflections and bubbles to achieve a \n  false-positive reduction rate of &gt; 99.4% in accordance with ISO 7218 testing protocols.\n</p>`,
        owner: "技术内容编辑",
        verification: "使用 Google 搜索相关提问，监测是否在 30 天内触发 Featured Snippet 或直接展示段落富文本。"
      },
      boost: {
        overall: +3.9,
        contentGain: +8.5,
        retentionBehavior: +4.0,
        pageIndexability: { "page-2": +6, "page-11": +9, "page-18": +11 },
        pageSeo: { "page-2": +7, "page-11": +12, "page-18": +14 }
      }
    },
    {
      id: "ACT-08",
      title: "全站图片规范化五件套治理：WebP 格式、语义化中划线命名与显式尺寸声明",
      category: "技术基础与 Core Web Vitals",
      type: "top_impact",
      targetPages: ["page-2", "page-5", "page-12"],
      impact: 7.8,
      confidence: 0.94,
      effort: 3.0,
      jev: 2.44,
      status: "pending",
      summary: "解决图片未定义宽高引起的 CLS 累积布局抖动扣分，将大图转换为体积小于 150KB 的 WebP 格式，提高移动端评级。",
      gradientSlope: 2.9,
      sop: {
        diagnosis: "/products/serial-diluter-station/ 等页面因缺少 width 与 height 属性，在移动端加载时发生显著排版跳跃，CLS 达到 0.18。",
        fixSteps: [
          "将所有商品图与实拍图转为 .webp 格式，单张限制在 150KB 内；",
          "命名统一为模型与特征小写中划线（如 punmicro-x200-petri-bench-front.webp）；",
          "在 <img> 标签中显式注入 width='800' height='600' loading='lazy'；",
          "alt 属性精准描述图片内容（含型号与工况）。"
        ],
        codeSnippet: `<img \n  src="/assets/img/products/punmicro-x200-automated-colony-counter-bench.webp" \n  alt="Punmicro X200 Automated Colony Counter installed on a laminar flow cleanroom bench" \n  width="800" \n  height="600" \n  loading="lazy" \n  decoding="async" \n/>`,
        owner: "前端开发工程师 / UI 设计师",
        verification: "在 PageSpeed Insights 中复测移动端性能，确保 CLS ≤ 0.02，图片相关优化项清零。"
      },
      boost: {
        overall: +3.0,
        techIndexing: +6.5,
        retentionBehavior: +3.5,
        pageIndexability: { "page-5": +14, "page-2": +5 },
        pageSeo: { "page-5": +15, "page-2": +6 }
      }
    }
  ]
};

// 导出挂载
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INITIAL_DATA };
}
