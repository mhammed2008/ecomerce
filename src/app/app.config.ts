import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withHashLocation, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {environment} from './environments/environment';
import {API_BASE_URL} from './core/token/api.token';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {provideToastr} from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration: 'top'}),withHashLocation()),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
    provideToastr(),
    {
      provide: API_BASE_URL,
      useValue: environment.baseUrl
    }
  ]
};

