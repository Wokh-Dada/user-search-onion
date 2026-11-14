import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { USER_SEARCH_PROVIDERS } from '../../../bootstrap/providers/user-search.providers';
import { USER_SEARCH_FACADE } from '../../../core/domain/tokens/user-search-facade.token';
import { SearchToolbarComponent } from '../../components/search-toolbar/search-toolbar.component';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'onion-user-search-page',
  standalone: true,
  imports: [MatCardModule, SearchToolbarComponent, UserListComponent],
  providers: USER_SEARCH_PROVIDERS,
  templateUrl: './user-search-page.component.html',
  styleUrl: './user-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchPageComponent {
  private readonly facade = inject(USER_SEARCH_FACADE);

  protected readonly vm = toSignal(this.facade.vm$, { requireSync: true });

  protected onSearch(query: string): void {
    this.facade.search(query);
  }

  protected onFavoritesOnlyChange(isFavoritesOnly: boolean): void {
    this.facade.setFavoritesOnly(isFavoritesOnly);
  }

  protected onToggleFavorite(userId: number): void {
    this.facade.toggleFavorite(userId);
  }

  protected onRetry(): void {
    this.facade.retry();
  }
}
