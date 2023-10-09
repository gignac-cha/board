import { useMutation, useQuery } from '@tanstack/react-query';
import { requestTokenKey } from '../utilities/constants';
import {
  AddCommentProperties,
  EditCommentProperties,
  addComment,
  deleteComment,
  editComment,
  getComments,
} from '../utilities/request';

interface UseCommentsQueryProperties {
  board: BoardLike;
  article: ArticleLike;
}

export const useCommentsQuery = ({
  board,
  article,
}: UseCommentsQueryProperties) =>
  useQuery<Comment[] | undefined>(
    ['comments', board.uuid, article.uuid],
    () => getComments({ board, article }),
    {
      enabled: !!board.uuid && !!article.uuid,
      suspense: true,
    },
  );

// interface UseCommentQueryProperties {
//   board: BoardLike;
//   article: ArticleLike;
//   comment: CommentLike;
// }

// export const useCommentQuery = ({
//   board,
//   article,
//   comment,
// }: UseCommentQueryProperties) =>
//   useQuery<Comment | undefined>(
//     ['comment', board.uuid, article.uuid],
//     () => getComment({ board, article, comment }),
//     {
//       enabled: !!board.uuid && !!article.uuid && !!comment.uuid,
//       suspense: true,
//     },
//   );

interface UseCommentAddMutationProperties {
  board: BoardLike;
  article: ArticleLike;
}
type UseCommentAddMutateProperties = Omit<
  AddCommentProperties,
  keyof UseCommentAddMutationProperties
>;

export const useCommentAddMutation = ({
  board,
  article,
}: UseCommentAddMutationProperties) => {
  const requestToken = localStorage.getItem(requestTokenKey);
  return useMutation<Comment | undefined, Error, UseCommentAddMutateProperties>(
    ['comment', 'add', board.uuid, article.uuid],
    async ({ content }: UseCommentAddMutateProperties) => {
      if (requestToken) {
        return addComment({ board, article, content, requestToken });
      }
    },
  );
};

interface UseCommentEditMutationProperties {
  board: BoardLike;
  article: ArticleLike;
  comment: CommentLike;
}
type UseCommentEditMutateProperties = Omit<
  EditCommentProperties,
  keyof UseCommentEditMutationProperties
>;

export const useCommentEditMutation = ({
  board,
  article,
  comment,
}: UseCommentEditMutationProperties) => {
  const requestToken = localStorage.getItem(requestTokenKey);
  return useMutation<
    Comment | undefined,
    Error,
    UseCommentEditMutateProperties
  >(
    ['comment', 'edit', board.uuid, article.uuid, comment.uuid],
    async ({ content }: UseCommentEditMutateProperties) => {
      if (requestToken) {
        return editComment({ board, article, comment, content, requestToken });
      }
    },
  );
};

interface UseCommentDeleteMutationProperties {
  board: BoardLike;
  article: ArticleLike;
  comment: CommentLike;
}

export const useCommentDeleteMutation = ({
  board,
  article,
  comment,
}: UseCommentDeleteMutationProperties) => {
  const requestToken = localStorage.getItem(requestTokenKey);
  return useMutation<CommentLike | undefined, Error>(
    ['comment', 'delete', board.uuid, article.uuid, comment.uuid],
    async () => {
      if (requestToken) {
        return deleteComment({ board, article, comment, requestToken });
      }
    },
  );
};
