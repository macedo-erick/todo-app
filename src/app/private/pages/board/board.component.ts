import { Component, computed, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board/board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { List } from '../../models/list.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Board } from '../../models/board.model';

@Component({
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board$ = this.boardService.onFindOne();

  board = toSignal(this.board$, { initialValue: {} as Board });
  loaded: Signal<boolean> = computed(() => !!this.board().name);

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.boardService.findOne(id);
    });
  }

  drop(event: CdkDragDrop<List>) {
    moveItemInArray(
      this.board().lists,
      event.previousIndex,
      event.currentIndex
    );
    this.updateBoard();
  }

  removedList(index: number) {
    this.board().lists = this.board().lists.filter((_, i) => i !== index);
    this.updateBoard();
  }

  updateBoard() {
    this.boardService.update(this.board());
  }

  handleTitleChange(innerText: string) {
    this.board().name = innerText;
    this.updateBoard();
  }

  addList() {
    this.board().lists.push({ name: 'New list', cards: [] });
    this.updateBoard();
  }

  log() {
    console.log(this.board());
  }
}
