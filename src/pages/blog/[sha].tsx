import { useRouter } from 'next/router';
import { Octokit } from 'octokit';
import { useEffect, useState } from 'react';

// GitHub API のレスポンス型
interface GitHubFileContentResponse {
  type: 'file';
  encoding: 'base64';
  content: string;
  download_url: string;
  git_url: string;
  html_url: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
}

export default function PostPage() {
  const [postContent, setPostContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { path } = router.query;

  const fetchPostContent = async () => {
    if (!path) return;

    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const octokit = new Octokit({ auth: token });

    try {
      const response = (await octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}',
        {
          owner: 'shamo-9118',
          repo: 'shamo-blog-article',
          path: `article/2024_8/${path}.md`,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      )) as { data: GitHubFileContentResponse };

      if (response.data.type === 'file' && response.data.content) {
        // Base64 デコード
        const decodedContent = Buffer.from(
          response.data.content,
          'base64',
        ).toString('utf-8');
        setPostContent(decodedContent);
      } else {
        setError('記事のデータが取得できませんでした');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostContent();
  }, [path]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Post Content</h1>
      <div>{postContent}</div>
    </div>
  );
}
