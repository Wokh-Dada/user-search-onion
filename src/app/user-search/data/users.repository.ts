import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';

import { API_DELAY_MS, MOCK_USERS } from '../bootstrap/configurations/data/constants';
import { IUser } from '../core/domain/interfaces/user.interface';
import { IUsersRepository } from '../core/domain/interfaces/users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
    public searchUsers(query: string): Observable<readonly IUser[]> {
        return timer(API_DELAY_MS).pipe(
            map(() =>
                MOCK_USERS.filter(
                    user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
                ),
            ),
        );
    }
}
