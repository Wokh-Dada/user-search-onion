import { Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';

import { FAVORITES_STORAGE_KEY } from '../bootstrap/configurations/data/constants';
import { IFavoritesRepository } from '../core/domain/interfaces/favorites-repository.interface';

@Injectable()
export class FavoritesRepository implements IFavoritesRepository {
    public getFavoriteIds(): Observable<readonly number[]> {
        return defer(() => {
            const storedValue = localStorage.getItem(FAVORITES_STORAGE_KEY);

            if (storedValue === null) {
                return of([]);
            }

            const storedIds: unknown = JSON.parse(storedValue);

            if (!Array.isArray(storedIds)) {
                throw new Error('Некорректный формат избранных пользователей.');
            }

            const favoriteIds = storedIds.filter(
                (id: unknown): id is number => typeof id === 'number' && Number.isSafeInteger(id) && id > 0,
            );

            if (favoriteIds.length !== storedIds.length) {
                throw new Error('Некорректные идентификаторы избранных пользователей.');
            }

            return of([...new Set(favoriteIds)]);
        });
    }

    public saveFavoriteIds(favoriteIds: readonly number[]): Observable<void> {
        return defer(() => {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));

            return of(undefined);
        });
    }
}
