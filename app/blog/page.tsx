import Link from "next/link";
import { getBlogPosts, formatDate } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客",
  description: "分享技术文章、开发经验和学习心得。",
};

export default function BlogPage() {
  const blogPosts = getBlogPosts();
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">博客</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          分享技术文章、开发经验和学习心得。
        </p>
      </header>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex flex-col gap-3 rounded-xl border border-border p-6 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <time className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                  <div className="flex flex-wrap gap-2">
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
                <h2 className="text-xl font-semibold tracking-tight group-hover:text-muted-foreground transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  阅读全文 →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
