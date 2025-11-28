export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  tags: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-modern-web-apps",
    title: "构建现代 Web 应用的思考",
    description: "探讨如何使用 React、Next.js 和 TypeScript 构建高性能的现代 Web 应用程序。",
    date: "2024-11-25",
    tags: ["React", "Next.js", "TypeScript"],
    content: `
在当今的 Web 开发领域，构建一个现代化的 Web 应用需要考虑很多因素。本文将分享一些我在实践中积累的经验。

## 技术栈选择

选择合适的技术栈是项目成功的基础。对于现代 Web 应用，我推荐以下组合：

- **Next.js** - 提供服务端渲染、静态生成等强大功能
- **TypeScript** - 类型安全带来更好的开发体验
- **Tailwind CSS** - 快速构建美观的 UI

## 性能优化

性能是用户体验的核心。以下是一些关键的优化策略：

1. 图片优化 - 使用 next/image 自动优化
2. 代码分割 - 按需加载组件
3. 缓存策略 - 合理利用浏览器缓存

## 总结

构建现代 Web 应用是一个持续学习的过程。保持对新技术的关注，同时夯实基础知识，才能在这个快速变化的领域保持竞争力。
    `,
  },
  {
    slug: "mastering-typescript",
    title: "深入理解 TypeScript 类型系统",
    description: "从基础到高级，全面掌握 TypeScript 的类型系统，提升代码质量。",
    date: "2024-11-20",
    tags: ["TypeScript", "JavaScript"],
    content: `
TypeScript 的类型系统是其最强大的特性之一。理解并善用类型系统可以显著提高代码质量和开发效率。

## 基础类型

TypeScript 提供了丰富的基础类型：

\`\`\`typescript
const name: string = "John";
const age: number = 25;
const isActive: boolean = true;
\`\`\`

## 高级类型

掌握高级类型可以让你的代码更加灵活：

### 联合类型与交叉类型

\`\`\`typescript
type Status = "pending" | "success" | "error";
type Combined = TypeA & TypeB;
\`\`\`

### 泛型

泛型让你的代码更具复用性：

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## 实践建议

1. 尽量避免使用 any
2. 善用类型推断
3. 为公共 API 编写完整的类型定义
    `,
  },
  {
    slug: "design-patterns-in-frontend",
    title: "前端设计模式实践",
    description: "介绍几种在前端开发中常用的设计模式，以及如何在 React 项目中应用它们。",
    date: "2024-11-15",
    tags: ["设计模式", "React", "架构"],
    content: `
设计模式是解决常见问题的经验总结。在前端开发中，合理运用设计模式可以让代码更加优雅和可维护。

## 观察者模式

观察者模式在前端状态管理中非常常见。

## 组合模式

React 组件本身就是组合模式的体现。我们可以通过组合小组件来构建复杂的 UI。

## 策略模式

策略模式适用于有多种算法或行为的场景，可以在运行时切换不同的策略。

## 总结

设计模式不是银弹，要根据实际场景选择合适的模式。过度设计反而会增加复杂性。
    `,
  },
  {
    slug: "react-server-components",
    title: "React Server Components 深度解析",
    description: "全面了解 React Server Components 的工作原理、使用场景和最佳实践。",
    date: "2024-11-10",
    tags: ["React", "RSC", "Next.js"],
    content: `
React Server Components (RSC) 是 React 生态系统中的一项重大创新，它改变了我们构建 React 应用的方式。

## 什么是 Server Components

Server Components 是一种在服务器端渲染的 React 组件，它们不会被打包到客户端 JavaScript 中。

## 优势

1. 减少客户端 JavaScript 体积
2. 直接访问后端资源
3. 自动代码分割
4. 更好的首屏加载性能

## 使用场景

- 数据获取组件
- 静态内容渲染
- 访问服务器端资源

## 与 Client Components 配合

在实际应用中，Server Components 和 Client Components 需要配合使用，各司其职。
    `,
  },
  {
    slug: "tailwind-css-best-practices",
    title: "Tailwind CSS 最佳实践指南",
    description: "分享在大型项目中使用 Tailwind CSS 的经验，包括组织方式、性能优化和常见问题解决。",
    date: "2024-11-05",
    tags: ["CSS", "Tailwind", "前端"],
    content: `
Tailwind CSS 已经成为现代前端开发的主流选择之一。本文将分享一些在实际项目中的最佳实践。

## 类名组织

合理组织类名可以提高代码可读性：

1. 布局类优先（flex, grid）
2. 尺寸类其次（w, h, p, m）
3. 外观类最后（bg, text, border）

## 组件抽象

当某个样式组合频繁使用时，考虑抽象成组件而非使用 @apply。

## 响应式设计

利用 Tailwind 的响应式前缀，采用移动优先的设计策略。

## 暗色模式

使用 dark: 前缀轻松实现暗色模式支持。
    `,
  },
  {
    slug: "nodejs-performance-tuning",
    title: "Node.js 性能调优实战",
    description: "从内存管理、事件循环到集群部署，全方位提升 Node.js 应用性能。",
    date: "2024-10-28",
    tags: ["Node.js", "性能优化", "后端"],
    content: `
Node.js 应用的性能优化是一个系统工程，需要从多个维度入手。

## 内存管理

1. 避免内存泄漏
2. 合理设置堆内存大小
3. 使用流处理大文件

## 事件循环优化

理解事件循环机制，避免阻塞主线程：

- 将 CPU 密集型任务移至 Worker Threads
- 合理使用 setImmediate 和 process.nextTick
- 监控事件循环延迟

## 集群部署

使用 cluster 模块或 PM2 充分利用多核 CPU。

## 监控与诊断

建立完善的监控体系，及时发现性能瓶颈。
    `,
  },
  {
    slug: "git-workflow-for-teams",
    title: "团队 Git 工作流实践",
    description: "介绍适合团队协作的 Git 工作流，包括分支策略、代码审查和发布流程。",
    date: "2024-10-20",
    tags: ["Git", "团队协作", "工程化"],
    content: `
良好的 Git 工作流是团队高效协作的基础。

## 分支策略

推荐使用简化的 Git Flow：

- main: 生产环境代码
- develop: 开发分支
- feature/*: 功能分支
- hotfix/*: 紧急修复

## 提交规范

采用 Conventional Commits 规范：

- feat: 新功能
- fix: Bug 修复
- docs: 文档更新
- refactor: 代码重构

## 代码审查

Code Review 是保证代码质量的重要环节：

1. 保持 PR 小而专注
2. 提供足够的上下文
3. 及时响应反馈

## 自动化

利用 CI/CD 自动化测试和部署流程。
    `,
  },
  {
    slug: "web-security-essentials",
    title: "Web 安全入门指南",
    description: "了解常见的 Web 安全威胁以及如何在开发中防范它们。",
    date: "2024-10-15",
    tags: ["安全", "Web 开发", "最佳实践"],
    content: `
Web 安全是每个开发者都应该关注的话题。

## XSS 攻击防范

1. 对用户输入进行转义
2. 使用 CSP（内容安全策略）
3. 设置 HttpOnly Cookie

## CSRF 防护

1. 使用 CSRF Token
2. 验证 Origin/Referer
3. SameSite Cookie 属性

## SQL 注入

1. 使用参数化查询
2. ORM 框架的正确使用
3. 最小权限原则

## 其他安全措施

- HTTPS 加密传输
- 安全的密码存储
- 定期安全审计
    `,
  },
  {
    slug: "docker-for-developers",
    title: "开发者 Docker 入门",
    description: "从零开始学习 Docker，掌握容器化开发的核心概念和实践技巧。",
    date: "2024-10-08",
    tags: ["Docker", "DevOps", "容器化"],
    content: `
Docker 已经成为现代软件开发的标配工具。

## 核心概念

- 镜像（Image）：应用的只读模板
- 容器（Container）：镜像的运行实例
- Dockerfile：构建镜像的脚本

## 常用命令

1. docker build - 构建镜像
2. docker run - 运行容器
3. docker compose - 编排多容器应用

## 开发环境容器化

将开发环境容器化的优势：

- 环境一致性
- 快速搭建
- 隔离性好

## 最佳实践

- 使用多阶段构建减小镜像体积
- 合理利用缓存加速构建
- 遵循一个容器一个进程原则
    `,
  },
  {
    slug: "api-design-principles",
    title: "RESTful API 设计原则",
    description: "设计优雅、一致且易于使用的 RESTful API 的核心原则和实践指南。",
    date: "2024-10-01",
    tags: ["API", "后端", "架构"],
    content: `
良好的 API 设计能够极大提升开发体验和系统可维护性。

## 资源命名

- 使用名词而非动词
- 使用复数形式
- 层级关系用嵌套表示

## HTTP 方法

- GET：获取资源
- POST：创建资源
- PUT：完整更新
- PATCH：部分更新
- DELETE：删除资源

## 状态码

正确使用 HTTP 状态码：

- 2xx：成功
- 4xx：客户端错误
- 5xx：服务端错误

## 版本控制

推荐在 URL 中包含版本号，如 /api/v1/users

## 文档

使用 OpenAPI/Swagger 维护 API 文档。
    `,
  },
];

export const projects: Project[] = [
  {
    title: "个人博客系统",
    description: "使用 Next.js 和 MDX 构建的现代博客系统，支持 Markdown 写作、代码高亮、暗色模式等功能。",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    link: "https://blog.example.com",
    github: "https://github.com/example/blog",
  },
  {
    title: "任务管理应用",
    description: "一个简洁高效的任务管理工具，支持拖拽排序、标签分类、数据同步等功能。",
    tech: ["React", "Redux", "Node.js", "PostgreSQL"],
    link: "https://tasks.example.com",
    github: "https://github.com/example/tasks",
  },
  {
    title: "实时协作白板",
    description: "支持多人实时协作的在线白板工具，可用于头脑风暴、流程图绘制等场景。",
    tech: ["React", "Socket.io", "Canvas API", "Redis"],
    github: "https://github.com/example/whiteboard",
  },
  {
    title: "CLI 开发工具",
    description: "一套提升开发效率的命令行工具集，包含代码生成、项目初始化等实用功能。",
    tech: ["Node.js", "TypeScript", "Commander.js"],
    github: "https://github.com/example/dev-cli",
  },
  {
    title: "组件库",
    description: "一个轻量级的 React UI 组件库，注重可访问性和自定义能力。",
    tech: ["React", "TypeScript", "Storybook", "Rollup"],
    link: "https://ui.example.com",
    github: "https://github.com/example/ui-lib",
  },
  {
    title: "数据可视化平台",
    description: "支持多种图表类型的数据可视化平台，可连接多种数据源进行实时展示。",
    tech: ["Vue.js", "D3.js", "ECharts", "WebSocket"],
    link: "https://charts.example.com",
  },
  {
    title: "API 网关",
    description: "高性能的 API 网关服务，支持限流、熔断、负载均衡等功能。",
    tech: ["Go", "Redis", "etcd", "gRPC"],
    github: "https://github.com/example/api-gateway",
  },
  {
    title: "在线代码编辑器",
    description: "基于 Monaco Editor 的在线代码编辑器，支持多语言语法高亮和智能提示。",
    tech: ["React", "Monaco Editor", "WebAssembly", "Docker"],
    link: "https://code.example.com",
    github: "https://github.com/example/online-editor",
  },
  {
    title: "消息推送服务",
    description: "统一的消息推送平台，支持邮件、短信、App Push 等多种渠道。",
    tech: ["Node.js", "RabbitMQ", "MongoDB", "FCM"],
    github: "https://github.com/example/push-service",
  },
  {
    title: "图床服务",
    description: "自建图床服务，支持图片压缩、CDN 加速、水印添加等功能。",
    tech: ["Rust", "S3", "Cloudflare", "Sharp"],
    link: "https://img.example.com",
    github: "https://github.com/example/image-hosting",
  },
  {
    title: "监控告警系统",
    description: "全栈应用监控平台，支持性能指标收集、日志分析和告警通知。",
    tech: ["Python", "InfluxDB", "Grafana", "Prometheus"],
    github: "https://github.com/example/monitor",
  },
  {
    title: "低代码表单平台",
    description: "可视化表单设计器，支持拖拽搭建、逻辑配置和数据收集。",
    tech: ["React", "DnD Kit", "JSON Schema", "MySQL"],
    link: "https://form.example.com",
    github: "https://github.com/example/form-builder",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
