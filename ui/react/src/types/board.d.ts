declare interface Board {
  uuid: string;
  uniqueId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

declare type BoardLike = Pick<Board, 'uuid'>;
