import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Loader2 } from 'lucide-react';

interface ReadmeDisplayProps {
  username: string;
  repo: string;
}

const ReadmeDisplay = ({ username, repo }: ReadmeDisplayProps) => {
  const [readme, setReadme] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/readme`);
        if (!response.ok) {
          throw new Error('Failed to fetch README');
        }
        const data = await response.json();
        const content = atob(data.content);
        setReadme(content);
      } catch (err) {
        setError('Failed to load README');
        console.error('Error fetching README:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [username, repo]);

  const formatReadmeContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-slate-900 mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-slate-800 mb-3 mt-6">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium text-slate-700 mb-2 mt-4">$3</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br />');
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={20} />
            Loading README...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-red-600">Error loading README</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Current Focus
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200">
              Live Updates
            </Badge>
          </div>
          <a
            href={`https://github.com/${username}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            View Repository
            <ExternalLink size={16} />
          </a>
        </div>
        <p className="text-slate-600">
          Track my current projects and development progress from my main repository
        </p>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto">
          <div 
            className="prose prose-slate max-w-none text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formatReadmeContent(readme) 
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadmeDisplay;