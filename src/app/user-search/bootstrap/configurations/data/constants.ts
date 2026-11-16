import { IUser } from '../../../core/domain/interfaces/user.interface';
import { IUserSearchState } from '../../../core/domain/interfaces/user-search-state.interface';

export const API_DELAY_MS = 500;
export const FAVORITES_STORAGE_KEY = 'user-search-onion.favorite-ids';

export const INITIAL_USER_SEARCH_STATE: IUserSearchState = {
    users: [],
    query: '',
    favoriteIds: [],
    isFavoritesOnly: false,
    status: 'loading',
    hasFavoritesError: false,
};

export const MOCK_USERS: readonly IUser[] = [
    { id: 1, name: 'Александр Иванов', email: 'alex.ivanov@example.com' },
    { id: 2, name: 'Мария Петрова', email: 'maria.petrova@example.com' },
    { id: 3, name: 'Дмитрий Смирнов', email: 'dmitry.smirnov@example.com' },
    { id: 4, name: 'Анна Соколова', email: 'anna.sokolova@example.com' },
    { id: 5, name: 'Михаил Волков', email: 'mikhail.volkov@example.com' },
    { id: 6, name: 'Елена Кузнецова', email: 'elena.kuznetsova@example.com' },
    { id: 7, name: 'Артём Попов', email: 'artem.popov@example.com' },
    { id: 8, name: 'Ольга Морозова', email: 'olga.morozova@example.com' },
    { id: 9, name: 'Иван Новиков', email: 'ivan.novikov@example.com' },
    { id: 10, name: 'София Орлова', email: 'sofia.orlova@example.com' },
    { id: 11, name: 'Максим Лебедев', email: 'maxim.lebedev@example.com' },
    { id: 12, name: 'Дарья Васильева', email: 'daria.vasileva@example.com' },
];
