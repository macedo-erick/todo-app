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
  DragDropModule
} from '@angular/cdk/drag-drop';
import { Card } from '../../models/card.model';
import { tap, timer } from 'rxjs';
import { ActivityService } from '../../services/activity/activity.service';
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
import { BoardListResponseDto } from '../../dtos/board-list.dto';
import { BoardListService } from '../../services/board-list/board-list.service';
import { CardService } from '../../services/card/card.service';
import { CardComponent } from '../card/card.component';
import { CardResponseDto } from '../../dtos/card.dto';

type SortDirection = 'asc' | 'desc';

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
    CardComponent
  ]
})
export class BoardListComponent implements OnInit {
  #activityService = inject(ActivityService);
  #dialogService = inject(MatDialog);
  #boardListService = inject(BoardListService);
  #cardService = inject(CardService);
  boardService = inject(BoardService);

  boardId = input.required<number>();
  list = model.required<BoardListResponseDto>();
  cards = signal<CardResponseDto[]>([]);

  removedList = output();
  isEditing = false;

  @ViewChild('listName') listName!: ElementRef<HTMLHeadingElement>;
  @ViewChild('cardsList') cardsList!: ElementRef<HTMLOListElement>;

  ngOnInit(): void {
    this.getCards();
  }

  addCard(): void {
    this.#cardService
      .save({
        boardId: this.boardId(),
        listId: this.list().id,
        name: 'New Card'
      })
      .pipe(tap(() => this.getCards()))
      .subscribe();

    timer(50).subscribe(() => {
      const list = this.cardsList.nativeElement;
      list.scrollTop = list.scrollHeight;
    });
  }

  onDrop(event: CdkDragDrop<CardResponseDto[]>): void {
    //   if (event.previousContainer === event.container) {
    //     moveItemInArray(
    //       event.container.data,
    //       event.previousIndex,
    //       event.currentIndex
    //     );
    //   } else {
    //     transferArrayItem(
    //       event.previousContainer.data,
    //       event.container.data,
    //       event.previousIndex,
    //       event.currentIndex
    //     );
    //
    //     this.generateActivity(event);
    //   }
    //
    //   this.list.update(({ ...list }) => ({
    //     ...list,
    //     cards: this.list().cards
    //   }));
  }

  getCards() {
    return this.#boardListService
      .getCards(this.list().id)
      .pipe(tap((res) => this.cards.set(res)))
      .subscribe();
  }

  onNameChange(): void {
    const { innerText } = this.listName.nativeElement;
    const name = innerText.trim();

    if (name) {
      this.list.update((list) => ({ ...list, name: innerText.trim() }));
      this.#boardListService
        .update({ name: this.list().name, boardId: this.list().id })
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
    //   this.list.update(({ cards, ...list }) => ({
    //     ...list,
    //     cards: cards.filter((c) => c.id !== id)
    //   }));
    // }
    //
    // sortByCreationDate(sortDirection: SortDirection = 'asc'): void {
    //   if (sortDirection == 'asc') {
    //     this.list.update(({ cards, ...list }) => ({
    //       ...list,
    //       cards: cards.sort(
    //         (a, b) =>
    //           new Date(a.createdDate).getTime() -
    //           new Date(b.createdDate).getTime()
    //       )
    //     }));
  }
  //
  //   if (sortDirection == 'desc') {
  //     this.list.update(({ cards, ...list }) => ({
  //       ...list,
  //       cards: cards.sort(
  //         (a, b) =>
  //           new Date(b.createdDate).getTime() -
  //           new Date(a.createdDate).getTime()
  //       )
  //     }));
  //   }
  // }
  //
  // sortByName(sortDirection: SortDirection = 'asc'): void {
  //   if (sortDirection == 'asc') {
  //     this.list.update(({ cards, ...list }) => ({
  //       ...list,
  //       cards: cards.sort((a, b) => a.name.localeCompare(b.name))
  //     }));
  //   }
  //
  //   if (sortDirection == 'desc') {
  //     this.list.update(({ cards, ...list }) => ({
  //       ...list,
  //       cards: cards.sort((a, b) => b.name.localeCompare(a.name))
  //     }));
  //   }
  // }
  //
  // sortByPriority(sortDirection: SortDirection = 'asc'): void {
  //   if (sortDirection == 'asc') {
  //     this.list.update(({ cards, ...list }) => ({
  //       ...list,
  //       cards: cards.sort((a, b) => a.priority - b.priority)
  //     }));
  //   }
  //
  //   if (sortDirection == 'desc') {
  //     this.list.update(({ cards, ...list }) => ({
  //       ...list,
  //       cards: cards.sort((a, b) => b.priority - a.priority)
  //     }));
  //   }
  // }
  //
  // private generateActivity(event: CdkDragDrop<Card[]>): void {
  //   const previousList = document.getElementById(event.previousContainer.id)
  //     ?.parentElement?.parentElement as HTMLElement;
  //
  //   const previousListName = (
  //     previousList.querySelector('h2') as HTMLHeadingElement
  //   ).innerText;
  //
  //   const currentListName = this.list().name;
  //
  //   const card = this.list().cards[event.currentIndex];
  //
  //   card.activities = [
  //     ...card.activities,
  //     this.#activityService.create(
  //       `moved the card from ${previousListName} to ${currentListName}`
  //     )
  //   ];
  // }
  //
  // openCardDetail(card: Card): void {
  //   this.card = card;
  //
  //   this.dialogRef = this.#dialogService.open(this.cardDetail, {
  //     width: '55rem',
  //     height: '50rem',
  //     autoFocus: 'dialog',
  //     panelClass: 'bg__slate__gray'
  //   });
  // }
  //
  // onCardChange(card: Card) {
  //   const cards = this.list().cards;
  //
  //   const index = cards.indexOf(
  //     this.list().cards.find((c) => c.id == card.id) as Card
  //   );
  //
  //   this.list.update(({ cards, ...list }) => {
  //     cards[index] = card;
  //     return { ...list, cards };
  //   });
  // }
}
