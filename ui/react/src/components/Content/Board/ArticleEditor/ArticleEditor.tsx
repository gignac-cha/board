import { css } from '@emotion/css';
import {
  faMagnifyingGlass,
  faSave,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@monaco-editor/react';
import classNames from 'classnames';
import { editor } from 'monaco-editor';
import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useArticleAddMutation,
  useArticleEditMutation,
  useArticleQuery,
  useArticlesQuery,
} from '../../../../queries/useArticleQuery';
import { commonStyles } from '../../../../styles/common';
import {
  getArticleEditorCachedContentKey,
  getArticleEditorCachedTitleKey,
} from '../../../../utilities/constants';
import { IconButton } from '../../../common/IconButton';
import { PreviewModal } from './PreviewModal';

interface ArticleEditorProperties {
  board: Board;
  article?: Article;
}

const styles = {
  container: css({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
  }),
  headerContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: '1rem',
  }),
  title: css({
    flexGrow: 1,
  }),
  editor: css({
    padding: '1rem',
    minHeight: 600,
    borderRadius: 4,
    border: '1px solid #eee',
    transition: 'border-color .2s',

    ':hover': {
      borderColor: '#ddd',
    },
    ':focus-within': {
      borderColor: '#bbb !important',
    },
    '&:not(:placeholder-shown)': {
      borderColor: '#ccc',
    },
  }),
  dirtyEditor: css({
    '&:required:invalid': {
      borderColor: 'red !important',
    },
  }),
};

export const ArticleEditor: FunctionComponent<ArticleEditorProperties> = ({
  board,
  article,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const cachedTitleKey = getArticleEditorCachedTitleKey(board, article);
  const cachedContentKey = getArticleEditorCachedContentKey(board, article);

  const { refetch: refetchArticles } = useArticlesQuery({ board });
  const { refetch: refetchArticle } = useArticleQuery({ board, article });
  const { mutateAsync: addArticle } = useArticleAddMutation({
    board,
  });
  const { mutateAsync: editArticle } = useArticleEditMutation({
    board,
    article,
  });

  const navigate = useNavigate();

  const onClickArticlePreview = useCallback(() => {
    setShowPreview((previousValue: boolean) => !previousValue);
  }, []);
  const onClickArticleSave = useCallback(async () => {
    const title = localStorage.getItem(cachedTitleKey) ?? article?.title ?? '';
    const content =
      localStorage.getItem(cachedContentKey) ?? article?.content ?? '';
    if (title && content) {
      if (article) {
        await editArticle({ title, content });
        await refetchArticle();
        localStorage.removeItem(cachedTitleKey);
        localStorage.removeItem(cachedContentKey);
        navigate(`/${board.uniqueId}/${article.titleHash}`);
      } else {
        await addArticle({ title, content });
        await refetchArticles();
        localStorage.removeItem(cachedTitleKey);
        localStorage.removeItem(cachedContentKey);
        navigate(`/${board.uniqueId}`);
      }
    }
  }, [
    addArticle,
    article,
    board.uniqueId,
    cachedContentKey,
    cachedTitleKey,
    editArticle,
    navigate,
    refetchArticle,
    refetchArticles,
  ]);
  const onClickArticleCancel = useCallback(() => {
    navigate(`/${board.uniqueId}/${article?.titleHash}`);
  }, [article, board.uniqueId, navigate]);

  const defaultTitle = useMemo(
    () => localStorage.getItem(cachedTitleKey) ?? article?.title ?? '',
    [article?.title, cachedTitleKey],
  );
  const defaultContent = useMemo(
    () => localStorage.getItem(cachedContentKey) ?? article?.content ?? '',
    [article?.content, cachedContentKey],
  );

  const [isTitleDirty, setTitleDirty] = useState(false);
  const [isContentDirty, setContentDirty] = useState(false);

  const onMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
    editor.onDidFocusEditorText(() => setContentDirty(true));
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.headerContainer}>
        <h2 className={styles.title}>{article ? 'Edit' : 'New'} Article</h2>
        <IconButton
          onClick={onClickArticlePreview}
          text="Preview"
          icon={faMagnifyingGlass}
        />
        <IconButton onClick={onClickArticleSave} text="Save" icon={faSave} />
        {article && (
          <IconButton onClick={onClickArticleCancel} text="Cancel" icon={faX} />
        )}
      </header>
      <input
        className={classNames([
          commonStyles.inputText,
          isTitleDirty && commonStyles.dirtyInputText,
        ])}
        placeholder="Write title..."
        maxLength={200}
        defaultValue={defaultTitle}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          localStorage.setItem(cachedTitleKey, event.currentTarget.value.trim())
        }
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
          localStorage.setItem(cachedTitleKey, event.currentTarget.value.trim())
        }
        onFocus={() => setTitleDirty(true)}
        required
      />
      <Editor
        className={classNames([
          styles.editor,
          isContentDirty && styles.dirtyEditor,
        ])}
        height={'100%'}
        defaultLanguage="markdown"
        defaultValue={defaultContent}
        onChange={(value?: string) =>
          localStorage.setItem(cachedContentKey, value ?? '')
        }
        onMount={onMount}
      />
      <PreviewModal
        show={showPreview}
        title={defaultTitle}
        markdown={defaultContent}
        close={() => setShowPreview(false)}
      />
    </section>
  );
};
