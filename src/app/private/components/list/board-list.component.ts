import {
  Component,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
  ViewChild
} from '@angular/core';
import {
  CdkDragDrop,
  CdkDragHandle,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { distinctUntilChanged, filter, map, tap, timer } from 'rxjs';
import { BoardService } from '../../services/board/board.service';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle
} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { BoardListResponse } from '../../dtos/board-list.dto';
import { CardComponent } from '../card/card.component';
import { CardResponse } from '../../dtos/card.dto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { BoardListService } from '../../services/board-list/board-list.service';

@Component({
  selector: 'todo-list',
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss',
  standalone: true,
  imports: [
    DragDropModule,
    MatCard,
    MatCardTitle,
    CdkDragHandle,
    NgIf,
    MatCardContent,
    MatCardActions,
    MatButton,
    CardComponent,
    RouterLink
  ]
})
export class BoardListComponent implements OnInit {
  #dialogService = inject(MatDialog);
  #boardListService = inject(BoardListService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  boardService = inject(BoardService);

  boardId = input.required<number>();
  list = model.required<BoardListResponse>();
  cards = signal<CardResponse[]>([]);

  removedList = output();
  isEditing = false;

  @ViewChild('listName') listName!: ElementRef<HTMLHeadingElement>;
  @ViewChild('cardsList') cardsList!: ElementRef<HTMLOListElement>;

  addCard(): void {
    this.#boardListService
      .saveCard(this.list().id, {
        name: 'New Card'
      })
      .pipe(tap(() => this.getCards()))
      .subscribe();

    timer(50).subscribe(() => {
      const list = this.cardsList.nativeElement;
      list.scrollTop = list.scrollHeight;
    });
  }

  onDrop(
    event: CdkDragDrop<CardResponse[]>,
    targetList: BoardListResponse
  ): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log(targetList);

    // const newPos = computePosition(targetList.cards, event.currentIndex);
    // const movedCard = targetList.cards[event.currentIndex];
    // console.log(movedCard, targetList, newPos);
  }

  getCards() {
    return this.#boardListService
      .getCards(this.list().id)
      .pipe(tap(this.cards.set))
      .subscribe();
  }

  onNameChange(): void {
    const { innerText } = this.listName.nativeElement;
    const name = innerText.trim();

    if (name) {
      this.list.update((list) => ({ ...list, name: innerText.trim() }));
      this.#boardListService
        .update(this.list().id, { name: this.list().name })
        .subscribe();
    }

    this.isEditing = false;

    this.listName.nativeElement.contentEditable = 'false';
    this.listName.nativeElement.innerText = this.list().name;
  }

  toggleChangeListName(): void {
    if (this.boardService.isSprintModifiable()) {
      this.listName.nativeElement.contentEditable = 'true';
      this.listName.nativeElement.focus();
      this.isEditing = true;
    }
  }

  onDeletedCard(id: number): void {
    console.log(id);
  }

  #openCard(card: number): void {
    if (this.#dialogService.openDialogs.length) return;

    const dialogRef = this.#dialogService.open(CardDetailComponent, {
      data: { cardId: card },
      width: '55rem',
      height: '50rem',
      autoFocus: 'dialog',
      panelClass: 'bg__slate__gray'
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap(() => {
          void this.#router.navigate([], {
            queryParams: { card: null }
          });
        })
      )
      .subscribe();
  }

  #openCardDetailsFromQueryParams(): void {
    this.#route.queryParams
      .pipe(
        map(({ card }) => card),
        distinctUntilChanged(),
        filter(Boolean),
        tap((card) => this.#openCard(card))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.#openCardDetailsFromQueryParams();
    this.getCards();
  }
}
