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
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { ListComponent } from './components/list/list.component';
import {
  MatButton,
  MatIconButton,
  MatMiniFabButton
} from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { MatIcon } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChip } from '@angular/material/chips';
import { HeaderComponent } from './components/header/header.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@NgModule({
  declarations: [
    HomeComponent,
    BoardComponent,
    BoardCardComponent,
    ListComponent,
    CardComponent,
    HeaderComponent
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
    DragDropModule,
    MatCardFooter,
    MatChip,
    MatMiniFabButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatCardSubtitle
  ],
  exports: [HeaderComponent],
  providers: []
})
export class PrivateModule {}
