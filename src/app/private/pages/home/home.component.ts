import { Component, signal } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  boards = toSignal(this.boardService.onFindAll(), { initialValue: [] });
  loaded = signal(() => this.boards());

  searchInput = new FormControl('');

  constructor(private boardService: BoardService) {
    this.boardService.findAll();

    this.searchInput.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(200))
      .subscribe((q) => {
        this.boardService.findByName(String(q));
      });
  }

  newBoard(): void {
    this.boardService.create({
      name: 'New Board',
      lists: []
    });
  }
}
