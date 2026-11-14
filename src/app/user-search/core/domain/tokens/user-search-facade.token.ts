import { InjectionToken } from '@angular/core';
import { IUserSearchFacade } from '../interfaces/user-search-facade.interface';

export const USER_SEARCH_FACADE = new InjectionToken<IUserSearchFacade>(
  '[USER_SEARCH_FACADE]: Сценарии поиска и избранного',
);
