import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loggedInGuard } from './guards/logged-in.guard';

export const routes: Routes = [
  {
    path: 's',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./private/private.routes').then((m) => m.privateRoutes)
  },
  {
    path: 'p',
    canActivate: [loggedInGuard],
    loadChildren: () =>
      import('./public/public.routes').then((m) => m.publicRoutes)
  },
  {
    path: '**',
    redirectTo: 'p',
    pathMatch: 'full'
  }
];
