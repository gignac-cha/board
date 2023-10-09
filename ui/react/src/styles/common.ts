import { css } from '@emotion/css';
import { CSSProperties } from 'react';

export const commonStyles = {
  button: css({
    margin: 0,
    padding: '.5rem 1rem',
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: 4,
    outline: 'none',
    cursor: 'pointer',
    transition: 'background-color .2s',

    '&:hover': {
      backgroundColor: '#ddd',
    },
    '&:active': {
      backgroundColor: '#ccc',
    },
  }),
  smallButton: css({
    padding: '.5rem',
  }),
  emptyButton: css({
    backgroundColor: 'transparent !important',
    cursor: 'auto',

    '&:hover': {
      backgroundColor: 'transparent !important',
    },
    '&:active': {
      backgroundColor: 'transparent !important',
    },
  }),
  inputText: css({
    margin: 0,
    padding: '1rem',
    background: 'none',
    border: '1px solid #eee',
    borderRadius: 4,
    outline: 'none',
    transition: 'border-color .2s',

    '&:hover': {
      borderColor: '#ddd',
    },
    '&:focus': {
      borderColor: '#bbb !important',
    },
    '&:not(:placeholder-shown)': {
      borderColor: '#ccc',
    },
  }),
  smallInputText: css({
    padding: '.5rem !important',
  }),
  dirtyInputText: css({
    '&:required:invalid': {
      borderColor: 'red !important',
    },
  }),
  ellipsis: (maxWidth?: number | string): CSSProperties => ({
    maxWidth,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  emptyLink: css({
    color: 'inherit',
    textDecoration: 'inherit',
  }),
  separator: css({
    margin: '1rem',
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    border: 'none',
  }),
};
