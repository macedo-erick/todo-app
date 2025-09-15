import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';

export const privateRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'board/:boardId',
    component: BoardComponent,
    children: [{ path: 'card/:cardId', component: CardDetailComponent }]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
