import { Component, signal } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { tap } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  boards$ = this.boardService
    .onFindAll()
    .pipe(tap(() => this.loaded.set(true)));

  loaded = signal(false);

  constructor(private boardService: BoardService) {
    this.boardService.findAll();
  }

  newBoard(): void {
    this.boardService.create({
      name: 'New Board',
      lists: []
    });
  }
}
