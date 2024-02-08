import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BoardComponent } from './pages/board/board.component';


@NgModule({
  declarations: [
    HomeComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ],
  providers: []
})
export class PrivateModule { }
