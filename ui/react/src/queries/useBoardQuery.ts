import { useQuery } from '@tanstack/react-query';
import { getBoard, getBoards } from '../utilities/request';

export const useBoardsQuery = () =>
  useQuery<Board[]>(['boards'], () => getBoards(), { suspense: true });

interface UseBoardQueryProperties {
  board?: BoardLike;
}

export const useBoardQuery = ({ board }: UseBoardQueryProperties) =>
  useQuery<Board | undefined>(
    ['board', board?.uuid],
    () => board && getBoard({ board }),
    {
      enabled: !!board && !!board.uuid,
      suspense: true,
    },
  );
