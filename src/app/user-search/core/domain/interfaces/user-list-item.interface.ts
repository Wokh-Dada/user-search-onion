import { IUser } from './user.interface';

export interface IUserListItem extends IUser {
  readonly isFavorite: boolean;
}
