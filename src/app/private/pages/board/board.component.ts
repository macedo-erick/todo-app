import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  model,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { BoardList } from '../../models/board-list.model';
import { Board } from '../../models/board.model';
import { Title } from '@angular/platform-browser';
import { BoardService } from '../../services/board/board.service';
import { MatButton } from '@angular/material/button';
import { DatePipe, NgClass } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'todo-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  standalone: true,
  imports: [NgClass, DragDropModule, MatButton, DatePipe, ListComponent]
})
export class BoardComponent implements OnDestroy {
  titleService = inject(Title);
  boardService = inject(BoardService);

  board = model.required<Board>();
  loaded = computed(() => !!this.board());

  // @ViewChild('boardName') boardName!: ElementRef<HTMLHeadingElement>;
  // @ViewChild('boardLists') boardLists!: ElementRef<HTMLOListElement>;
  //
  // constructor() {
  //   effect(() => {
  //     this.titleService.setTitle(this.board().name);
  //   });
  // }
  //
  ngOnDestroy(): void {
    this.titleService.setTitle('Kivo');
  }
  //
  // toggleChangeName(): void {
  //   if (this.boardService.isSprintModifiable()) {
  //     this.boardName.nativeElement.contentEditable = 'true';
  //     this.boardName.nativeElement.focus();
  //   }
  // }
  //
  // onNameChange(): void {
  //   const { innerText } = this.boardName.nativeElement;
  //   const name = innerText.trim();
  //
  //   if (name) {
  //     this.board.update((board) => ({ ...board, name }));
  //   }
  //
  //   this.boardName.nativeElement.innerText = this.board().name;
  // }
  //
  // onEnter(event: Event) {
  //   event.preventDefault();
  // }
  //
  // addList(): void {
  //   this.board.update(({ lists, ...board }) => ({
  //     ...board,
  //     lists: lists.concat({ name: 'New list', cards: [] })
  //   }));
  //
  //   timer(100).subscribe(() => {
  //     const list = this.boardLists.nativeElement;
  //     list.scrollLeft = list.scrollWidth;
  //   });
  // }
  //
  // onListChange(index: number, list: BoardList): void {
  //   this.board.update(({ lists, ...board }) => {
  //     lists[index] = list;
  //     return { ...board, lists };
  //   });
  // }
  //
  // onRemovedList(index: number): void {
  //   this.board.update(({ lists, ...board }) => ({
  //     ...board,
  //     lists: lists.filter((_, i) => i !== index)
  //   }));
  // }
  //
  // onDrop(event: CdkDragDrop<BoardList>): void {
  //   moveItemInArray(
  //     this.board().lists,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  //
  //   this.board.update(({ ...board }) => ({
  //     ...board,
  //     lists: this.board().lists
  //   }));
  // }
}
