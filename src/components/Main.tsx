import { Heading } from '@/components/Heading';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { fetchShamoArticleContents } from '@/utils/fetchShamoArticleContents';
import { abstractText } from '@/utils/abstractText';
import { useState, useMemo, useEffect } from 'react';

type ArticleData = {
  name: string;
  postData: {
    id: string,
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
    return articlesData.flatMap((articleData) =>
      articleData.postData.map((post) => {
        const title = abstractText('Title: ', '\nDraft:', post.content);
        const category = abstractText('Category: ', '\n---', post.content);

        return {
          id: post.id,
          retucontent: post.content,
          time: post.name,
          title: title,
          category: category,
        };
      }),
    );
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
