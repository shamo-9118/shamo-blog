import { fetchShamoArticleURLs } from '@/utils/fetchShamoArticleURLs';

export const fetchShamoArticleContents = async () => {
  try {
    const shamoArticleUrls = await fetchShamoArticleURLs();

    if (!shamoArticleUrls) return;

    const fetchPromises = shamoArticleUrls.map(async (shamoArticleUrl) => {
      const res = await fetch(shamoArticleUrl);

      if (!res.ok) {
        throw new Error(`HTTP Request error: ${res.status}`);
      }

      return res.json();
    });

    const allData = await Promise.all(fetchPromises);

    return allData;
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
