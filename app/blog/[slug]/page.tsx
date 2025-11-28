import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, formatDate } from "@/lib/data";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← 返回博客
        </Link>
        <div className="flex flex-wrap items-center gap-4 mb-4">
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
      </header>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {post.content.split("\n").map((paragraph, index) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("## ")) {
            return (
              <h2
                key={index}
                className="text-2xl font-semibold tracking-tight mt-10 mb-4"
              >
                {trimmed.slice(3)}
              </h2>
            );
          }

          if (trimmed.startsWith("### ")) {
            return (
              <h3
                key={index}
                className="text-xl font-semibold tracking-tight mt-8 mb-3"
              >
                {trimmed.slice(4)}
              </h3>
            );
          }

          if (trimmed.startsWith("```")) {
            return null;
          }

          if (trimmed.startsWith("- **")) {
            const match = trimmed.match(/^- \*\*(.+?)\*\* - (.+)$/);
            if (match) {
              return (
                <p key={index} className="text-muted-foreground my-2 pl-4">
                  <strong className="text-foreground">{match[1]}</strong> -{" "}
                  {match[2]}
                </p>
              );
            }
          }

          if (trimmed.match(/^\d+\. /)) {
            return (
              <p key={index} className="text-muted-foreground my-2 pl-4">
                {trimmed}
              </p>
            );
          }

          return (
            <p key={index} className="text-muted-foreground leading-7 my-4">
              {trimmed}
            </p>
          );
        })}
      </div>

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← 返回博客列表
        </Link>
      </footer>
    </article>
  );
}
