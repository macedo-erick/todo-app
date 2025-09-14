import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { PrivateModule } from './app/private/private.module';
import { JwtModule } from '@auth0/angular-jwt';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export function tokenGetter() {
  return localStorage.getItem('SESSION');
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8080']
        }
      }),

      PrivateModule
    ),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch((err) => console.error(err));
