import { useQuery } from '@tanstack/react-query';
import { getBoard, getBoards } from '../utilities/request';

export const useBoardsQuery = () =>
  useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: () => getBoards(),
    suspense: true,
  });

interface UseBoardQueryProperties {
  board?: BoardLike;
}

export const useBoardQuery = ({ board }: UseBoardQueryProperties) =>
  useQuery<Board | undefined>({
    queryKey: ['board', board?.uuid],
    queryFn: () => board && getBoard({ board }),
    enabled: !!board && !!board.uuid,
    suspense: true,
  });
