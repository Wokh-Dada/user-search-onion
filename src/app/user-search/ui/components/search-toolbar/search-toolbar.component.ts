import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { USER_RESULTS_ID } from '../../../bootstrap/configurations/ui/constants';

@Component({
  selector: 'onion-search-toolbar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './search-toolbar.component.html',
  styleUrl: './search-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchToolbarComponent {
  readonly isFavoritesOnly = input.required<boolean>();
  readonly favoritesCount = input.required<number>();

  readonly queryChange = output<string>();
  readonly favoritesOnlyChange = output<boolean>();

  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly resultsId = USER_RESULTS_ID;

  constructor() {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((query) => this.queryChange.emit(query));
  }

  protected onClearSearch(): void {
    this.searchControl.setValue('');
  }
}
