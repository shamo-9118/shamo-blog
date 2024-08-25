import type { ArticleData } from '@/types/ArticleData';
import { abstractText } from '@/utils/abstractText';

export const formatArticleData = (articlesData: ArticleData[]) => {
  return articlesData.flatMap((articleData) =>
    articleData.postData.map((post) => {
      const title = abstractText('Title: ', '\nDraft:', post.content);
      const category = abstractText('Category: ', '\n---', post.content);

      return {
        id: post.id,
        path: post.path,
        retucontent: post.content,
        time: post.name,
        title: title,
        category: category,
      };
    }),
  );
};
