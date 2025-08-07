import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { articles } from "@/articles";
import { estimateReadingTimeFromMarkdown } from "@/utils/readingTime";
import { getMonthYear } from "@/utils/dateUtils";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = useMemo(() => articles.find(a => a.slug === slug), [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Article not found.</p>
          <Link to="/" className="text-blue-600 hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  const readingTime = article.markdown
    ? estimateReadingTimeFromMarkdown(article.markdown)
    : estimateReadingTimeFromMarkdown(article.description);

  return (
    <article className="min-h-screen bg-white">
      <header className="pt-24 pb-8 px-6 border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
            <span className="font-medium text-gray-900">Pierry Borges</span>
            <span>·</span>
            <span>{getMonthYear(article.createdAt)}</span>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-lg text-gray-600">{article.description}</p>
          )}
        </div>
      </header>

      <div className="px-6 py-10">
        <div className="prose prose-slate md:prose-lg max-w-3xl mx-auto">
          {article.markdown ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {article.markdown}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-600">No content provided.</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;


