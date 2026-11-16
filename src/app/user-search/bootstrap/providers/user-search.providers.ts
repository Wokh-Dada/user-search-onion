import { Provider } from '@angular/core';

import { FAVORITES_REPOSITORY } from '../../core/domain/tokens/favorites-repository.token';
import { USER_SEARCH_FACADE } from '../../core/domain/tokens/user-search-facade.token';
import { USER_SEARCH_STORE } from '../../core/domain/tokens/user-search-store.token';
import { USERS_REPOSITORY } from '../../core/domain/tokens/users-repository.token';
import { UserSearchFacade } from '../../core/user-search.facade';
import { FavoritesRepository } from '../../data/favorites.repository';
import { UserSearchStore } from '../../data/user-search.store';
import { UsersRepository } from '../../data/users.repository';

export const USER_SEARCH_PROVIDERS: Provider[] = [
    { provide: USER_SEARCH_FACADE, useClass: UserSearchFacade },
    { provide: USER_SEARCH_STORE, useClass: UserSearchStore },
    { provide: USERS_REPOSITORY, useClass: UsersRepository },
    { provide: FAVORITES_REPOSITORY, useClass: FavoritesRepository },
];
