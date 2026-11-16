import { InjectionToken } from '@angular/core';

import { IUsersRepository } from '../interfaces/users-repository.interface';

export const USERS_REPOSITORY = new InjectionToken<IUsersRepository>('[USERS_REPOSITORY]: Поиск пользователей');
