import { fetchShamoArticleURLs } from '@/utils/fetchShamoArticleURLs';
import { formatFileNameToData } from './formatFileNameToData';
import type { ContentData } from '@/types/ContentData';

export const fetchShamoArticleContents = async () => {
  try {
    const articleContentTreesData = await fetchShamoArticleURLs();

    if (!articleContentTreesData) return;

    const fetchPromises = articleContentTreesData.map(
      async (articleContentTreeData) => {
        const articleContentPromises =
          articleContentTreeData.articleContentsTree.map(
            async (articleContentData) => {
              const res = await fetch(articleContentData.url);
              if (!res.ok) {
                throw new Error(`HTTP Request error: ${res.status}`);
              }

              const parsedRes: ContentData = await res.json();

              return {
                res: parsedRes,
                path: articleContentData.path,
              };
            },
          );

        const articleContentsData = await Promise.all(articleContentPromises);
        const payloadDrticleContents = articleContentsData.map(
          (articleContentData) => {
            return {
              name: formatFileNameToData(articleContentData.path),
              content: Buffer.from(
                articleContentData.res.content,
                'base64',
              ).toString('utf-8'),
            };
          },
        );

        return {
          name: articleContentTreeData.name.split('_').join('/'),
          postData: payloadDrticleContents,
        };
      },
    );

    return await Promise.all(fetchPromises);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `shamo-blog-articleから記事の取得中にエラーが発生しました:${error.message}`,
      );

      return;
    }

    console.error(`shamo-blog-articleから記事の取得中にエラーが発生しました`);
  }
};
