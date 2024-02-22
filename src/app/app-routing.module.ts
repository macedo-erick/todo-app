import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: 's',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./private/private.module').then((m) => m.PrivateModule)
  },
  {
    path: 'p',
    canActivate: [loggedInGuard],
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule)
  },
  {
    path: '**',
    redirectTo: 'p',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
