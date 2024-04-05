import {
  Component,
  computed,
  effect,
  ElementRef,
  model,
  OnDestroy,
  Signal,
  ViewChild
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { List } from '../../models/list.model';
import { Board } from '../../models/board.model';
import { timer } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { BoardService } from '../../services/board/board.service';

@Component({
  selector: 'todo-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnDestroy {
  board = model.required<Board>();
  loaded: Signal<boolean> = computed(() => !!this.board());

  @ViewChild('boardName') boardName!: ElementRef<HTMLHeadingElement>;
  @ViewChild('boardLists') boardLists!: ElementRef<HTMLOListElement>;

  constructor(
    private titleService: Title,
    public boardService: BoardService
  ) {
    effect(() => {
      this.titleService.setTitle(this.board().name);
    });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle('Todo');

    // this.board.update(({ lists, ...board }) => ({
    //   ...board,
    //   lists: lists.map(({ cards, ...list }) => ({
    //     ...list,
    //     cards: cards.map(({ ...card }) => ({
    //       ...card,
    //       type: CardType.TASK,
    //       sprintId: '89f381f2-a005-4e20-b381-f2a005ce20b7'
    //     }))
    //   }))
    // }));
  }

  addList(): void {
    this.board.update(({ lists, ...board }) => ({
      ...board,
      lists: lists.concat({ name: 'New list', cards: [] })
    }));

    timer(100).subscribe(() => {
      const list = this.boardLists.nativeElement;
      list.scrollLeft = list.scrollWidth;
    });
  }

  onDrop(event: CdkDragDrop<List>): void {
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

  onRemovedList(index: number): void {
    this.board.update(({ lists, ...board }) => ({
      ...board,
      lists: lists.filter((_, i) => i !== index)
    }));
  }

  toggleChangeBoardName(): void {
    if (this.boardService.isSprintModifiable()) {
      this.boardName.nativeElement.contentEditable = 'true';
      this.boardName.nativeElement.focus();
    }
  }

  onNameChange(): void {
    const { innerText } = this.boardName.nativeElement;
    this.board.update((board) => ({ ...board, name: innerText.trim() }));
  }

  onListChange(index: number, list: List): void {
    this.board.update(({ lists, ...board }) => {
      lists[index] = list;
      return { ...board, lists };
    });
  }
}
