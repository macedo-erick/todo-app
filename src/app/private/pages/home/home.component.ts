import { Component, signal } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  boards = toSignal(this.boardService.onFindAll());
  loaded = signal(() => this.boards());

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
