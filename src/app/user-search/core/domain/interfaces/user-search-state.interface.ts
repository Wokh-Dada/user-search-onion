import { IUser } from './user.interface';

export interface IUserSearchState {
  readonly users: readonly IUser[];
  readonly query: string;
  readonly favoriteIds: readonly number[];
  readonly isFavoritesOnly: boolean;
  readonly status: 'loading' | 'ready' | 'error';
  readonly hasFavoritesError: boolean;
}
