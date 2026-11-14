import { Observable } from 'rxjs';
import { IUser } from './user.interface';

export interface IUsersRepository {
  searchUsers(query: string): Observable<readonly IUser[]>;
}
