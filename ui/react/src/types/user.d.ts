declare interface User {
  uuid: string;
  name: string;
  uniqueId: string;
  createdAt: string;
  updatedAt: string;
  lastSignedAt: string;
}

declare type UserLike = Pick<User, 'uuid'>;
