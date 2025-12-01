import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

const postsDirectory = path.join(process.cwd(), "book");

function getRecursiveFilePaths(dir: string): string[] {
  const files = fs.readdirSync(dir);
  let filePaths: string[] = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      filePaths = filePaths.concat(getRecursiveFilePaths(filePath));
    } else if (file.endsWith(".md")) {
      filePaths.push(filePath);
    }
  });

  return filePaths;
}

export function getBlogPosts(): BlogPost[] {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filePaths = getRecursiveFilePaths(postsDirectory);

  const allPostsData = filePaths.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Create slug from file path relative to book directory
    const relativePath = path.relative(postsDirectory, filePath);
    const slug = relativePath.replace(/\.md$/, "").replace(/\//g, "-");

    // Infer metadata from content if not present in frontmatter
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = data.title || (titleMatch ? titleMatch[1] : "Untitled");

    // Remove the title from content if we inferred it, to avoid duplication
    const contentWithoutTitle = titleMatch
      ? content.replace(titleMatch[0], "")
      : content;

    // Infer description from the first paragraph or blockquote
    const descriptionMatch = contentWithoutTitle.match(
      /^(?:>|#+)?\s*([^#\n]+)/m
    );
    const description =
      data.description ||
      (descriptionMatch ? descriptionMatch[1].trim() : "No description");

    // Infer tags from directory name
    const dirName = path.dirname(relativePath);
    const tags = data.tags || [dirName !== "." ? dirName : "General"];

    // Use file creation time or a default date if not provided
    const stat = fs.statSync(filePath);
    const date =
      data.date || stat.birthtime.toISOString().split("T")[0];

    return {
      slug,
      title,
      description,
      date,
      content: contentWithoutTitle.trim(),
      tags,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const projects: Project[] = [
  {
    title: "专注时刻",
    description: "Productivity",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/app/justsudoku/id6612009100",
  },
  {
    title: "JustSudoku",
    description: "A pure Sudoku game",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/app/%E9%A1%BA%E5%8E%86/id6566170406",
  },
  {
    title: "顺历",
    description: "Utilities",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/app/%E8%AF%97%E8%AF%8D%E6%B8%B8/id6532592189",
  },
  {
    title: "诗词游",
    description: "Lifestyle",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/app/magic-focus/id6444272284",
  },
  {
    title: "Magic Focus+",
    description: "Focus on improving focus",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/app/yixi%E6%96%87%E4%BB%B6%E6%B5%8F%E8%A7%88%E5%99%A8/id6443494827",
  },
  {
    title: "YIXI文件浏览器",
    description: "Utilities",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/app/morsehelp/id6443531120",
  },
  {
    title: "MorseHelp",
    description: "Utilities",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/app/bigtodoplus/id6443440799",
  },
  {
    title: "BigTodoPlus",
    description: "More comfortable to-do list",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/developer/%E5%BF%97%E6%96%8C-%E6%9E%97/id529745886",
  },
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
  {
    title: "AquaFlowX",
    description: "Focus on drinking water",
    tech: ["Swift", "SwiftUI"],
    link: "https://apps.apple.com/us/app/%E4%B8%93%E6%B3%A8%E6%97%B6%E5%88%BB/id6737592700",
  },

];
