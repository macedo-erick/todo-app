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
import { CdkDragDrop, moveItemInArray, CdkDropListGroup, CdkDropList } from '@angular/cdk/drag-drop';
import { List } from '../../models/list.model';
import { Board } from '../../models/board.model';
import { timer } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { BoardService } from '../../services/board/board.service';
import { MatButton } from '@angular/material/button';
import { ListComponent } from '../list/list.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'todo-board',
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
    standalone: true,
    imports: [NgClass, CdkDropListGroup, CdkDropList, ListComponent, MatButton]
})
export class BoardComponent implements OnDestroy {
  titleService = inject(Title);
  boardService = inject(BoardService);

  board = model.required<Board>();
  loaded = computed(() => !!this.board());

  @ViewChild('boardName') boardName!: ElementRef<HTMLHeadingElement>;
  @ViewChild('boardLists') boardLists!: ElementRef<HTMLOListElement>;

  constructor() {
    effect(() => {
      this.titleService.setTitle(this.board().name);
    });
  }

  ngOnDestroy(): void {
    this.titleService.setTitle('Kivo');
  }

  toggleChangeName(): void {
    if (this.boardService.isSprintModifiable()) {
      this.boardName.nativeElement.contentEditable = 'true';
      this.boardName.nativeElement.focus();
    }
  }

  onNameChange(): void {
    const { innerText } = this.boardName.nativeElement;
    this.board.update((board) => ({ ...board, name: innerText.trim() }));
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

  onListChange(index: number, list: List): void {
    this.board.update(({ lists, ...board }) => {
      lists[index] = list;
      return { ...board, lists };
    });
  }

  onRemovedList(index: number): void {
    this.board.update(({ lists, ...board }) => ({
      ...board,
      lists: lists.filter((_, i) => i !== index)
    }));
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
}
