import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BoardComponent } from './pages/board/board.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { ListComponent } from './components/list/list.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    BoardComponent,
    BoardCardComponent,
    ListComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatCard,
    MatCardTitle,
    MatRipple,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatIcon,
    MatButton,
  ],
  providers: [],
})
export class PrivateModule {}
