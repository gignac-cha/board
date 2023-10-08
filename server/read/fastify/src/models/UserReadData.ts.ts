import { User } from '../entities/User';

export class UserReadData {
  uuid: string;
  uniqueId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  lastSignedAt: Date;

  constructor(user: User) {
    this.uuid = user.uuid;
    this.name = user.name;
    this.uniqueId = user.uniqueId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.lastSignedAt = user.lastSignedAt;
  }
}
