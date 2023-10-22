import { useMutation, useQuery } from '@tanstack/react-query';
import { requestTokenKey } from '../utilities/constants';
import {
  AddArticleProperties,
  EditArticleProperties,
  addArticle,
  editArticle,
  getArticle,
  getArticles,
} from '../utilities/request';

interface UseArticlesQueryProperties {
  board: BoardLike;
}

export const useArticlesQuery = ({ board }: UseArticlesQueryProperties) =>
  useQuery<Article[]>({
    queryKey: ['articles', board.uuid],
    queryFn: () => getArticles({ board }),
    enabled: !!board.uuid,
    suspense: true,
  });

interface UseArticleQueryProperties {
  board: BoardLike;
  article?: ArticleLike;
}

export const useArticleQuery = ({
  board,
  article,
}: UseArticleQueryProperties) =>
  useQuery<Article | undefined>({
    queryKey: ['article', board.uuid, article?.uuid],
    queryFn: () => article && getArticle({ board, article }),
    enabled: !!board.uuid && !!article && !!article.uuid,
    suspense: true,
  });

interface UseArticleAddMutationProperties {
  board: BoardLike;
}
type UseArticleAddMutateProperties = Omit<
  AddArticleProperties,
  keyof UseArticleAddMutationProperties
>;

export const useArticleAddMutation = ({
  board,
}: UseArticleAddMutationProperties) => {
  const requestToken = localStorage.getItem(requestTokenKey);
  return useMutation<Article | undefined, Error, UseArticleAddMutateProperties>(
    {
      mutationKey: ['article', 'add', board.uuid],
      mutationFn: async ({ title, content }: UseArticleAddMutateProperties) => {
        if (requestToken) {
          return addArticle({ board, title, content, requestToken });
        }
      },
    },
  );
};

interface UseArticleEditMutationProperties {
  board: BoardLike;
  article?: ArticleLike;
}
type UseArticleMutateProperties = Omit<
  EditArticleProperties,
  keyof UseArticleEditMutationProperties
>;

export const useArticleEditMutation = ({
  board,
  article,
}: UseArticleEditMutationProperties) => {
  const requestToken = localStorage.getItem(requestTokenKey);
  return useMutation<Article | undefined, Error, UseArticleMutateProperties>({
    mutationKey: ['article', 'edit', board.uuid, article?.uuid],
    mutationFn: async ({ title, content }: UseArticleMutateProperties) => {
      if (requestToken && article) {
        return editArticle({ board, article, title, content, requestToken });
      }
    },
  });
};
