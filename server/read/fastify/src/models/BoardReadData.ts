import { Board } from '../entities/Board';

export class BoardReadData {
  uuid: string;
  uniqueId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(board: Board) {
    this.uuid = board.uuid;
    this.uniqueId = board.uniqueId;
    this.name = board.name;
    this.description = board.description;
    this.createdAt = board.createdAt;
    this.updatedAt = board.updatedAt;
  }
}
