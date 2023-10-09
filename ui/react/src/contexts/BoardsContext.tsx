import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { useBoardsQuery } from '../queries/useBoardQuery';

interface BoardsContextProperties {
  boards: Board[];
}

const defaultValue: BoardsContextProperties = {
  boards: [],
};

const BoardsContext = createContext<BoardsContextProperties>(defaultValue);

export const BoardsContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { data: boards = [] } = useBoardsQuery();

  return (
    <BoardsContext.Provider value={{ boards }}>
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoardsContext = () => useContext(BoardsContext);
