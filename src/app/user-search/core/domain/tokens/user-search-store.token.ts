import { InjectionToken } from '@angular/core';
import { IUserSearchStore } from '../interfaces/user-search-store.interface';

export const USER_SEARCH_STORE = new InjectionToken<IUserSearchStore>(
  '[USER_SEARCH_STORE]: Состояние поиска и избранного',
);
