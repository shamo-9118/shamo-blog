import { Heading } from '@/components/Heading';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { useFetchGithubArticle } from '@/hooks/useFetchGithubArticle';
import { useEffect } from 'react';

export const Main = () => {
  const { data, error, loading, fetchGithubArticle } = useFetchGithubArticle();

  useEffect(() => {
    fetchGithubArticle();
  }, [fetchGithubArticle]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(data);

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
