import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BoardComponent } from './components/board/board.component';

export const privateRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'board/:id', component: BoardComponent },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
