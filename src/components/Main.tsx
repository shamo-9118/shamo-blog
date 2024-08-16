import { Heading } from '@/components/Heading';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { fetchShamoArticleContents } from '@/utils/fetchShamoArticleContents';
import { useState, useMemo, useEffect } from 'react';

type ArticleData = {
  name: string;
  postData: {
    content: string;
    name: string;
  }[];
};

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
    console.log(
      articlesData.map((articleData) =>
        articleData.postData.map((post) => {
          return {
            content: post.content,
            name: post.name,
          };
        }),
      ),
    );
  }, [articlesData]);

  return (
    <main className='bg-[#f5f5f5] min-h-[100vh]'>
      <div className='max-w-[780px] mx-auto pt-[100px] pb-8'>
        <Heading>Blog</Heading>
      </div>
      <div className='max-w-[780px] mx-auto'>
        {isLoading ? <Loading /> : <Card />}
      </div>
    </main>
  );
};
