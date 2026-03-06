import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/articles";
import { estimateReadingTimeFromMarkdown } from "@/utils/readingTime";
import { getMonthYear } from "@/utils/dateUtils";
import { ThemeToggle } from "@/components/ThemeToggle";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = useMemo(() => articles.find(a => a.slug === slug), [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Article not found.</p>
          <Link to="/" className="text-primary hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  const readingTime = article.markdown
    ? estimateReadingTimeFromMarkdown(article.markdown)
    : estimateReadingTimeFromMarkdown(article.description);

  return (
    <article className="min-h-screen bg-background">
      {/* Simple header with back button and theme toggle */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <header className="pt-24 pb-8 px-6 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Pierry Borges</span>
            <span>·</span>
            <span>{getMonthYear(article.createdAt)}</span>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-3">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-lg text-muted-foreground">{article.description}</p>
          )}
        </div>
      </header>

      <div className="px-6 py-10">
        <div className="prose prose-slate dark:prose-invert md:prose-lg max-w-3xl mx-auto">
          {article.markdown ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {article.markdown}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">No content provided.</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
