import { Heading } from '@/components/Heading';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { fetchShamoArticleContents } from '@/utils/fetchShamoArticleContents';
import { formatArticleData } from '@/utils/formatArticleData';
import { useState, useMemo, useEffect } from 'react';
import type { ArticleData } from '@/types/ArticleData';

export const Main = () => {
  const [articlesData, setArticleData] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleContents = await fetchShamoArticleContents(setIsLoading);

      if (!articleContents) return;
      setArticleData(articleContents);
    };

    fetchArticle();
  }, []);

  const formatedArticleListData = useMemo(() => {
    return formatArticleData(articlesData);
  }, [articlesData]);

  return (
    <main className='bg-[#f5f5f5] min-h-[100vh]'>
      <div className='max-w-[780px] mx-auto pt-[100px] pb-12'>
        <Heading>Blog</Heading>
      </div>
      <div className='max-w-[780px] mx-auto space-y-4'>
        {isLoading ? (
          <Loading />
        ) : (
          formatedArticleListData.map((articleData) => (
            <Card key={articleData.id} articleData={articleData} />
          ))
        )}
      </div>
    </main>
  );
};
