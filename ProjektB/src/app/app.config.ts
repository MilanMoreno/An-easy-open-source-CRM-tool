import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ErrorHandler, NgZone } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './core/routing/routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslationLoader } from './core/i18n/translation.loader';
import { CustomErrorHandler } from './core/error-handling/custom-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslationLoader,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
