import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  LOADING_SPINNER_DIAMETER,
  USER_RESULTS_ID,
} from '../../../bootstrap/configurations/ui/constants';
import { IUserListItem } from '../../../core/domain/interfaces/user-list-item.interface';
import { IUserSearchState } from '../../../core/domain/interfaces/user-search-state.interface';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'onion-user-list',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  readonly users = input.required<readonly IUserListItem[]>();
  readonly status = input.required<IUserSearchState['status']>();

  readonly favoriteToggle = output<number>();
  readonly retry = output<void>();

  protected readonly resultsId = USER_RESULTS_ID;
  protected readonly spinnerDiameter = LOADING_SPINNER_DIAMETER;
}
