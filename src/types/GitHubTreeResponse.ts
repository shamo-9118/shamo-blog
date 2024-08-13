import { TreeNode } from './treeNode';

export type GitHubTreeResponse = {
  sha: string;
  url: string;
  tree: TreeNode[];
  truncated: boolean;
};
