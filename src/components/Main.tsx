import { Heading } from '@/components/Heading';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { useFetchGithubArticle } from '@/hooks/useFetchGithubArticle';
import { useState, useEffect } from 'react';
import { Octokit } from 'octokit';

export const Main = () => {
  const [article, setArticle] = useState<any>();
  const { data, error, loading, fetchGithubArticle } = useFetchGithubArticle();
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const url = process.env.NEXT_PUBLIC_GITHUB_ENDPOINT;

  const fetchShamoArticle = async () => {
    const octokit = new Octokit({
      auth: token,
    });

    const response = await octokit.request(
      'GET /repos/shamo-9118/shamo-blog-article/contents/article/2024_8/2024_8_12.md',
      {
        owner: 'shamo-9118',
        repo: 'shamo-blog-article',
        path: 'article/2024_8/2024_8_12.md',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    if (response) {
      const decodedText = Buffer.from(response.data.content, 'base64').toString(
        'utf-8',
      );
      setArticle(decodedText);
    }
  };

  useEffect(() => {
    fetchGithubArticle();
    fetchShamoArticle();
  }, [fetchGithubArticle]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className='bg-[#f5f5f5] min-h-[100vh]'>
      <div className='max-w-[780px] mx-auto pt-[100px] pb-8'>
        <Heading>Blog</Heading>
      </div>
      <div className='max-w-[780px] mx-auto'>
        {loading ? <Loading /> : <Card />}
      </div>
    </main>
  );
};
