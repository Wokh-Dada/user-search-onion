import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { UserSearchPageComponent } from './app/user-search/ui/containers/user-search-page/user-search-page.component';

bootstrapApplication(UserSearchPageComponent, appConfig).catch((error: unknown) => console.error(error));
