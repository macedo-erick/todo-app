import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { JwtModule } from '@auth0/angular-jwt';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tokenGetter } from './app/util/util';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8080']
        }
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch((err) => console.error(err));
