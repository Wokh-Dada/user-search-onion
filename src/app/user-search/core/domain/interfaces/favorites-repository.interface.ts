import { Observable } from 'rxjs';

/** Доступ к сохранённым идентификаторам избранных пользователей. */
export interface IFavoritesRepository {
    getFavoriteIds(): Observable<readonly number[]>;
    saveFavoriteIds(favoriteIds: readonly number[]): Observable<void>;
}
