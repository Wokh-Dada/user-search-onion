import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, catchError, map, of, startWith, switchMap, timer } from 'rxjs';
import { SEARCH_DEBOUNCE_MS } from '../bootstrap/configurations/core/constants';
import { IUserSearchFacade } from './domain/interfaces/user-search-facade.interface';
import { IUserSearchRequest } from './domain/interfaces/user-search-request.interface';
import { IUserSearchState } from './domain/interfaces/user-search-state.interface';
import { FAVORITES_REPOSITORY } from './domain/tokens/favorites-repository.token';
import { USER_SEARCH_STORE } from './domain/tokens/user-search-store.token';
import { USERS_REPOSITORY } from './domain/tokens/users-repository.token';

@Injectable()
export class UserSearchFacade implements IUserSearchFacade {
  private readonly store = inject(USER_SEARCH_STORE);
  private readonly usersRepository = inject(USERS_REPOSITORY);
  private readonly favoritesRepository = inject(FAVORITES_REPOSITORY);
  private readonly searchRequests$ = new Subject<IUserSearchRequest>();

  readonly vm$ = this.store.vm$;

  constructor() {
    this.restoreFavorites();

    this.searchRequests$
      .pipe(
        switchMap(({ query, delayMs }) =>
          timer(delayMs).pipe(
            switchMap(() => this.usersRepository.searchUsers(query)),
            map((users): Partial<IUserSearchState> => ({ users, status: 'ready' })),
            startWith<Partial<IUserSearchState>>({ query, users: [], status: 'loading' }),
            catchError(() => of<Partial<IUserSearchState>>({ users: [], status: 'error' })),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((changes) => this.store.setState(changes));

    this.retry();
  }

  search(query: string): void {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === this.store.getState().query) {
      return;
    }

    this.searchRequests$.next({ query: normalizedQuery, delayMs: SEARCH_DEBOUNCE_MS });
  }

  setFavoritesOnly(isFavoritesOnly: boolean): void {
    this.store.setState({ isFavoritesOnly });
  }

  toggleFavorite(userId: number): void {
    const state = this.store.getState();

    if (!state.users.some((user) => user.id === userId)) {
      return;
    }

    const favoriteIds = state.favoriteIds.includes(userId)
      ? state.favoriteIds.filter((favoriteId) => favoriteId !== userId)
      : [...state.favoriteIds, userId];

    this.favoritesRepository
      .saveFavoriteIds(favoriteIds)
      .pipe(
        map(() => ({ favoriteIds, hasFavoritesError: false })),
        catchError(() => of({ favoriteIds, hasFavoritesError: true })),
      )
      .subscribe((changes) => this.store.setState(changes));
  }

  retry(): void {
    this.searchRequests$.next({ query: this.store.getState().query, delayMs: 0 });
  }

  private restoreFavorites(): void {
    this.favoritesRepository
      .getFavoriteIds()
      .pipe(
        map((favoriteIds): Partial<IUserSearchState> => ({ favoriteIds })),
        catchError(() => of<Partial<IUserSearchState>>({ hasFavoritesError: true })),
      )
      .subscribe((changes) => this.store.setState(changes));
  }
}
