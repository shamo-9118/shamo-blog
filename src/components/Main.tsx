import { Heading } from '@/components/Heading';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { fetchShamoArticleContents } from '@/utils/fetchShamoArticleContents';
import { useState, useMemo, useEffect } from 'react';

export const Main = () => {
  const [articleData, setArticleData] = useState<any[] | undefined>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleContents = await fetchShamoArticleContents();
      setArticleData(articleContents);
    };

    fetchArticle();
  }, []);
  console.log(articleData);

  const formatedArticleDataList = useMemo(() => {
    articleData?.map(() => {});
  }, []);
  return (
    <main className='bg-[#f5f5f5] min-h-[100vh]'>
      <div className='max-w-[780px] mx-auto pt-[100px] pb-8'>
        <Heading>Blog</Heading>
      </div>
      <div className='max-w-[780px] mx-auto'>
        <Card />
      </div>
    </main>
  );
};
