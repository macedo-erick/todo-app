import {
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { tap, timer } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { BoardService } from '../../services/board/board.service';
import { ActivatedRoute } from '@angular/router';
import { BoardList } from '../../models/board-list.model';
import { MatButton } from '@angular/material/button';
import { BoardListService } from '../../services/board-list/board-list.service';
import { BoardListResponse } from '../../dtos/board-list.dto';
import { BoardListComponent } from '../../components/list/board-list.component';

@Component({
  selector: 'todo-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  standalone: true,
  imports: [DragDropModule, MatButton, BoardListComponent]
})
export class BoardComponent implements OnDestroy, OnInit {
  #titleService = inject(Title);
  #route = inject(ActivatedRoute);
  #boardListService = inject(BoardListService);
  boardService = inject(BoardService);

  boardId = 0;

  board = signal<Board>({} as Board);
  lists = signal<BoardListResponse[]>([]);

  @ViewChild('boardName') boardName!: ElementRef<HTMLHeadingElement>;
  @ViewChild('boardLists') boardLists!: ElementRef<HTMLOListElement>;

  constructor() {
    effect(() => {
      this.#titleService.setTitle(this.board().name);
    });
  }

  ngOnInit(): void {
    this.boardId = Number(this.#route.snapshot.paramMap.get('boardId'));

    this.#getBoard();
    this.#getLists();
  }

  ngOnDestroy(): void {
    this.#titleService.setTitle('Kivo');
  }

  toggleChangeName(): void {
    if (this.boardService.isSprintModifiable()) {
      this.boardName.nativeElement.contentEditable = 'true';
      this.boardName.nativeElement.focus();
    }
  }

  onNameChange(): void {
    const { innerText } = this.boardName.nativeElement;
    const name = innerText.trim();

    if (name) {
      this.board.update((board) => ({ ...board, name }));
      this.boardService.update(this.board()).subscribe();
    }

    this.boardName.nativeElement.innerText = this.board().name;
  }

  addList(): void {
    this.boardService
      .saveList(this.boardId, { name: 'New List' })
      .pipe(tap(() => this.#getLists()))
      .subscribe();

    timer(100).subscribe(() => {
      const list = this.boardLists.nativeElement;
      list.scrollLeft = list.scrollWidth;
    });
  }
  //
  // onListChange(index: number, list: BoardList): void {
  //   this.board.update(({ lists, ...board }) => {
  //     lists[index] = list;
  //     return { ...board, lists };
  //   });
  // }
  //
  onRemovedList(index: number): void {
    // this.board.update(({ lists, ...board }) => ({
    //   ...board,
    //   lists: lists.filter((_, i) => i !== index)
    // }));
  }
  //
  onDrop(event: CdkDragDrop<BoardList>): void {
    // moveItemInArray(
    //   this.board().lists,
    //   event.previousIndex,
    //   event.currentIndex
    // );
    //
    // this.board.update(({ ...board }) => ({
    //   ...board,
    //   lists: this.board().lists
    // }));
  }

  #getBoard() {
    this.boardService
      .find(this.boardId)
      .pipe(tap((res) => this.board.set(res)))
      .subscribe();
  }

  #getLists() {
    this.boardService
      .findLists(this.boardId)
      .pipe(tap((res) => this.lists.set(res)))
      .subscribe();
  }
}
