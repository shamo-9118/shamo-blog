import { useCallback, useState } from 'react';
import type { GitHubTreeResponse } from '@/types/GitHubTreeResponse';

export const useFetchGithubArticle = () => {
  // NOTE: GitHubから取得できるデータ型が不明のためany
  // TODO: GitHub側のデータかたわかり次第型をつける
  const [data, setData] = useState<GitHubTreeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGithubArticle = useCallback(async () => {
    // TODO: ここは引数で受け取れるようにするのが柔軟かもしれない
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const url = process.env.NEXT_PUBLIC_GITHUB_ENDPOINT;

    if (!url || !token) {
      console.error('GitHub API endpoint or token is not defined');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchGithubArticle };
};
