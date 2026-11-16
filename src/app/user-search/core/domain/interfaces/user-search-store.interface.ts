import { Observable } from 'rxjs';

import { IUserListItem } from './user-list-item.interface';
import { IUserSearchState } from './user-search-state.interface';

export interface IUserSearchViewModel {
    readonly users: readonly IUserListItem[];
    readonly status: IUserSearchState['status'];
    readonly isFavoritesOnly: boolean;
    readonly favoritesCount: number;
    readonly hasFavoritesError: boolean;
}

export interface IUserSearchStore {
    readonly vm$: Observable<IUserSearchViewModel>;
    getState(): IUserSearchState;
    select<T>(projector: (state: IUserSearchState) => T): Observable<T>;
    setState(changes: Partial<IUserSearchState>): void;
}
