import { css } from '@emotion/css';
import { faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useCommentEditMutation,
  useCommentsQuery,
} from '../../../../../queries/useCommentQuery';
import { commonStyles } from '../../../../../styles/common';

interface EditCommentProperties {
  board: Board;
  article: Article;
  comment: Comment;
  onFinished: () => void;
}

const styles = {
  container: css({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: '.5rem',
  }),
  input: css({
    flexGrow: 1,
  }),
  greenButton: css({
    backgroundColor: 'green !important',
  }),
};

export const EditComment: FunctionComponent<EditCommentProperties> = ({
  board,
  article,
  comment,
  onFinished,
}) => {
  const { refetch: refetchComments } = useCommentsQuery({ board, article });
  const { mutateAsync: editComment } = useCommentEditMutation({
    board,
    article,
    comment,
  });

  const ref = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState<string>();

  useEffect(() => {
    if (ref.current) {
      setContent(ref.current.value.trim());
    }
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value.trim());
  }, []);

  const onClick = useCallback(async () => {
    if (content) {
      onFinished();
      await editComment({ content });
      await refetchComments();
    }
  }, [content, editComment, onFinished, refetchComments]);

  const isDisabled = useMemo(
    () => !content || content === comment.content,
    [comment.content, content],
  );

  return (
    <div className={styles.container}>
      <input
        ref={ref}
        className={classNames([
          commonStyles.inputText,
          commonStyles.smallInputText,
          styles.input,
        ])}
        defaultValue={comment.content}
        onChange={onChange}
      />
      <button
        className={classNames([
          commonStyles.button,
          commonStyles.smallButton,
          !isDisabled && styles.greenButton,
        ])}
        title="Save"
        onClick={onClick}
        disabled={isDisabled}
      >
        <FontAwesomeIcon
          icon={faSave}
          size="xs"
          color={isDisabled ? undefined : 'white'}
        />
      </button>
      <button
        className={classNames([commonStyles.button, commonStyles.smallButton])}
        title="Cancel"
        onClick={() => onFinished()}
      >
        <FontAwesomeIcon icon={faX} size="xs" />
      </button>
    </div>
  );
};
