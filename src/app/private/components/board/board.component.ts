import { Component, computed, model, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board/board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { List } from '../../models/list.model';
import { Board } from '../../models/board.model';

@Component({
  selector: 'todo-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board = model.required<Board>();
  loaded: Signal<boolean> = computed(() => !!this.board());

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.boardService.findOne(id);
    });
  }

  drop(event: CdkDragDrop<List>): void {
    moveItemInArray(
      this.board().lists,
      event.previousIndex,
      event.currentIndex
    );

    this.board.update(({ ...board }) => ({
      ...board,
      lists: this.board().lists
    }));
  }

  removedList(index: number): void {
    this.board.update(({ lists, ...board }) => ({
      ...board,
      lists: lists.filter((_, i) => i !== index)
    }));
  }

  handleTitleChange(innerText: string): void {
    this.board.update((board) => ({ ...board, name: innerText }));
  }

  addList(): void {
    this.board.update(({ lists, ...board }) => ({
      ...board,
      lists: lists.concat({ name: 'New list', cards: [] })
    }));
  }

  listChange(index: number, list: List): void {
    this.board.update(({ lists, ...board }) => {
      lists[index] = list;
      return { ...board, lists };
    });
  }
}
