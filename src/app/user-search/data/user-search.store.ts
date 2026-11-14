import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map, shareReplay } from 'rxjs';
import { INITIAL_USER_SEARCH_STATE } from '../bootstrap/configurations/data/constants';
import { IUserSearchState } from '../core/domain/interfaces/user-search-state.interface';
import {
  IUserSearchStore,
  IUserSearchViewModel,
} from '../core/domain/interfaces/user-search-store.interface';

@Injectable()
export class UserSearchStore implements IUserSearchStore {
  private readonly stateChanges$ = new BehaviorSubject<IUserSearchState>(INITIAL_USER_SEARCH_STATE);

  readonly vm$ = this.select((state) => this.createViewModel(state)).pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  getState(): IUserSearchState {
    return this.stateChanges$.value;
  }

  select<T>(projector: (state: IUserSearchState) => T): Observable<T> {
    return this.stateChanges$.pipe(map(projector), distinctUntilChanged());
  }

  setState(changes: Partial<IUserSearchState>): void {
    const state = this.getState();
    const hasChanges = (Object.keys(changes) as (keyof IUserSearchState)[]).some(
      (key) => changes[key] !== state[key],
    );

    if (hasChanges) {
      this.stateChanges$.next({ ...state, ...changes });
    }
  }

  private createViewModel(state: IUserSearchState): IUserSearchViewModel {
    const favoriteIds = new Set(state.favoriteIds);
    const users = state.users
      .filter((user) => !state.isFavoritesOnly || favoriteIds.has(user.id))
      .map((user) => ({ ...user, isFavorite: favoriteIds.has(user.id) }));

    return {
      users,
      status: state.status,
      isFavoritesOnly: state.isFavoritesOnly,
      favoritesCount: favoriteIds.size,
      hasFavoritesError: state.hasFavoritesError,
    };
  }
}
