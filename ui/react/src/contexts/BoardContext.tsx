import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import { useBoardQuery } from '../queries/useBoardQuery';
import { useBoardsContext } from './BoardsContext';

interface BoardContextProperties {
  boardUniqueId?: string;
  selectedBoard?: BoardLike;
  board?: Board;
}

const defaultValue: BoardContextProperties = {};

const BoardContext = createContext<BoardContextProperties>(defaultValue);

type BoardParams = 'boardUniqueId';

export const BoardContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { boards } = useBoardsContext();
  const { boardUniqueId } = useParams<BoardParams>();
  const selectedBoard = useMemo(
    () => boards.find((board: Board) => board.uniqueId === boardUniqueId),
    [boardUniqueId, boards],
  );
  const { data: board } = useBoardQuery({ board: selectedBoard });

  return (
    <BoardContext.Provider value={{ boardUniqueId, selectedBoard, board }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
