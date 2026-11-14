import { InjectionToken } from '@angular/core';
import { IFavoritesRepository } from '../interfaces/favorites-repository.interface';

export const FAVORITES_REPOSITORY = new InjectionToken<IFavoritesRepository>(
  '[FAVORITES_REPOSITORY]: Хранение избранных пользователей',
);
