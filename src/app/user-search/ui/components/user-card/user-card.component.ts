import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IUserListItem } from '../../../core/domain/interfaces/user-list-item.interface';

@Component({
  selector: 'onion-user-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  readonly user = input.required<IUserListItem>();

  readonly favoriteToggle = output<number>();
}
