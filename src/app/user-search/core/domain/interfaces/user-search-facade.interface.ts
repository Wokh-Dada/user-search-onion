import { Observable } from 'rxjs';

import { IUserSearchViewModel } from './user-search-store.interface';

export interface IUserSearchFacade {
    readonly vm$: Observable<IUserSearchViewModel>;
    search(query: string): void;
    setFavoritesOnly(isFavoritesOnly: boolean): void;
    toggleFavorite(userId: number): void;
    retry(): void;
}
