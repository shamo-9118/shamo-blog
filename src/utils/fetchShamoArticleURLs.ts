import { Octokit } from 'octokit';
import type { GithubFileResponse } from '@/types/GithubFileResponse';

type ArticleDirectoryData = {
  git_url: string;
  name: string;
};

type Tree = {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
};

type ArticleContentTreeData = {
  name: string;
  articleContentsTree: Tree[];
};
export const fetchShamoArticleURLs = async (): Promise<
  ArticleContentTreeData[] | void
> => {
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

    const articleDirectoryDatas: ArticleDirectoryData[] = response.data.map(
      (responseData: GithubFileResponse) => {
        return {
          git_url: responseData.git_url,
          name: responseData.name,
        };
      },
    );

    const articleContentPromises = articleDirectoryDatas.map(
      async (articleDirectoryData) => {
        const responseArticleContentData = await fetch(
          articleDirectoryData.git_url,
        );

        if (!responseArticleContentData.ok) {
          throw new Error(
            `HTTP Request error: ${responseArticleContentData.ok}`,
          );
        }

        const articleContentData = await responseArticleContentData.json();

        const articleContentsTree: Tree[] = articleContentData.tree;

        return {
          name: articleDirectoryData.name,
          articleContentsTree,
        };
      },
    );

    const articleContentTreeData = await Promise.all(articleContentPromises);

    return articleContentTreeData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `shamo-blog-articleから記事のURL取得に失敗しました: ${error.message}`,
      );
    }
  }
};
