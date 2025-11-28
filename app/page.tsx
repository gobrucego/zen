import Link from "next/link";
import { blogPosts, projects, formatDate } from "@/lib/data";

export default function Home() {
  const recentPosts = blogPosts.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          你好，我是 <span className="text-muted-foreground">Zen</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          一名热爱技术的全栈开发者，专注于构建优雅、高效的 Web 应用。
          在这里分享我的技术思考、开源项目和学习心得。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            阅读博客
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            查看项目
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">最新文章</h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            查看全部 →
          </Link>
        </div>
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-border p-6 transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col gap-2">
                <time className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </time>
                <h3 className="text-lg font-semibold group-hover:text-muted-foreground transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">精选项目</h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="group rounded-xl border border-border p-6 transition-colors hover:bg-muted/50"
            >
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub →
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    查看 →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
