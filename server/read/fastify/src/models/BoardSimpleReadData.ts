import { Board } from '../entities/Board';

export class BoardSimpleReadData {
  uuid: string;
  uniqueId: string;
  name: string;
  description: string;

  constructor(board: Board) {
    this.uuid = board.uuid;
    this.uniqueId = board.uniqueId;
    this.name = board.name;
    this.description = board.description;
  }
}
