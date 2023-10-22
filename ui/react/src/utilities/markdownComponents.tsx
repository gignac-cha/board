import { css } from '@emotion/css';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { MouseEvent, Suspense } from 'react';
import { Components } from 'react-markdown';
import { NavigateFunction } from 'react-router-dom';
import { PrismAsyncLight } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Loading } from '../components/common/Loading';
import { Separator } from '../components/common/Separator';

const styles = {
  imageContainer: css({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '.1rem',
    alignItems: 'center',
  }),
  image: css({
    maxWidth: 800,
  }),
  imageAlt: css({
    color: '#777',
  }),
  blockQuoteContainer: css({
    padding: '1 0',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderLeft: '1px solid black',
  }),
  tableContainer: css({
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',

    '& table': {
      '& thead': {
        '& tr': {
          '& th': {
            padding: '.5rem 1rem',
            backgroundColor: 'rgba(0, 0, 0, .2)',
            outline: '1px solid rgba(0, 0, 0, .2)',
          },
        },
      },
      '& tbody': {
        '& tr': {
          '& td': {
            padding: '.1rem 1rem',
          },
        },
        '& tr:nth-child(even) td': {
          backgroundColor: 'rgba(0, 0, 0, .1)',
          outline: '1px solid rgba(0, 0, 0, .1)',
        },
      },
    },
  }),
  inlineCode: css({
    padding: '.25rem .5rem',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 4,
  }),
};

const resolveTable = (value: string) => {
  let hasHeader = false;
  const rows = [];
  for (const line of value.split('\n')) {
    const columns = line
      .split('|')
      .map((value: string) => value.trim())
      .filter((value: string) => value.length > 0);
    if (columns.every((value: string) => value === '-')) {
      hasHeader = true;
    } else {
      rows.push(columns);
    }
  }
  let headers = null;
  if (hasHeader) {
    headers = rows.shift();
  }
  return (
    <table>
      {headers && (
        <thead>
          <tr>
            {headers.map((value: string, index: number) => (
              <th key={index}>{value}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((columns: string[], index: number) => (
          <tr key={index}>
            {columns.map((value: string, index: number) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const resolveStrikethrough = (value: string) => {
  const children = [];
  let lastIndex = 0;
  for (const match of value.matchAll(/~~([^~]+)~~/g)) {
    children.push(value.slice(lastIndex, match.index ?? lastIndex));
    children.push(<s key={crypto.randomUUID()}>{match[1]}</s>);
    lastIndex = (match.index ?? 0) + match[0].length;
  }
  children.push(value.slice(lastIndex));
  return children;
};

interface GetComponentsProperties {
  navigate: NavigateFunction;
}

export const getComponents = ({
  navigate,
}: GetComponentsProperties): Components => ({
  p({ children }) {
    if (typeof children === 'string') {
      if (/~~[^~]+~~/.test(children)) {
        return <p>{resolveStrikethrough(children)}</p>;
      } else if (/\|[^\n]+\|/.test(children)) {
        return (
          <div className={styles.tableContainer}>{resolveTable(children)}</div>
        );
      }
    }
    return <p>{children}</p>;
  },
  a({ href = '', children }) {
    const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (!event.metaKey) {
        event.preventDefault();
        event.stopPropagation();
        const href = event.currentTarget.getAttribute('href');
        if (href && window.location.pathname !== href) {
          navigate(
            href.startsWith('/')
              ? href
              : `${window.location.pathname}/../${href}`,
          );
        }
      }
    };
    try {
      const url = new URL(href);
      if (url.origin === window.location.origin) {
        const newURL = `${url.pathname}${url.search}${url.hash}`;
        return (
          <a href={newURL} onClick={onClick}>
            {children}
          </a>
        );
      }
      return (
        <a href={href} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" /> {children}
        </a>
      );
    } catch (e) {
      // do nothing
    }
    return (
      <a href={href} onClick={onClick}>
        {children}
      </a>
    );
  },
  blockquote({ children }) {
    return (
      <div className={styles.blockQuoteContainer}>
        <blockquote>{children}</blockquote>
      </div>
    );
  },
  hr() {
    return <Separator />;
  },
  code({ children, className, ...restArguments }) {
    const match = className?.match(/language-(\w+)/);
    return match && match.length > 1 ? (
      <Suspense fallback={<Loading />}>
        <PrismAsyncLight language={match[1]} style={vscDarkPlus}>
          {`${children}`}
        </PrismAsyncLight>
      </Suspense>
    ) : (
      <code
        className={classNames([className, styles.inlineCode])}
        {...restArguments}
      >
        {children}
      </code>
    );
  },
  img({ src, alt }) {
    return (
      <span className={styles.imageContainer}>
        <img src={src} alt={alt} className={styles.image} />
        {alt && <small className={styles.imageAlt}>{alt}</small>}
      </span>
    );
  },
});
