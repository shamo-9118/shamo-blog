import { Octokit } from 'octokit';
import type { GithubFileResponse } from '@/types/GithubFileResponse';

export const fetchShamoArticleURLs = async (): Promise<string[] | void> => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.request(
      'GET /repos/shamo-9118/shamo-blog-article/contents/article/',
      {
        owner: 'shamo-9118',
        repo: 'shamo-blog-article',
        path: 'article/',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    if (response.status !== 200) {
      throw new Error(`HTTP Request error ${response.status}`);
    }

    return response.data.map(
      (responseData: GithubFileResponse) => responseData.url,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `shamo-blog-articleから記事のURL取得に失敗しました: ${error.message}`,
      );
    }
  }
};
