import {
  Component,
  ElementRef,
  inject,
  model,
  output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { List } from '../../models/list.model';
import {
  CdkDragDrop,
  CdkDragHandle,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Card } from '../../models/card.model';
import { timer } from 'rxjs';
import { ActivityService } from '../../services/activity/activity.service';
import { Comment } from '../../models/comment.model';
import { Activity } from '../../models/activity.model';
import { BoardService } from '../../services/board/board.service';
import { CardComponent } from '../card/card.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle
} from '@angular/material/card';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [
    DragDropModule,
    MatCard,
    MatCardTitle,
    CdkDragHandle,
    NgIf,
    MatIconButton,
    MatMenuTrigger,
    MatCardContent,
    CardComponent,
    MatCardActions,
    MatButton,
    MatMenu,
    MatMenuItem,
    CardDetailComponent
  ]
})
export class ListComponent {
  #activityService = inject(ActivityService);
  boardService = inject(BoardService);
  #dialogService = inject(MatDialog);

  list = model.required<List>();

  removedList = output();

  isEditing = false;

  @ViewChild('listName') listName!: ElementRef<HTMLHeadingElement>;
  @ViewChild('cardsList') cardsList!: ElementRef<HTMLOListElement>;

  card!: Card;
  dialogRef!: MatDialogRef<CardDetailComponent>;
  @ViewChild('cardDetail') cardDetail!: TemplateRef<CardDetailComponent>;

  addCard(): void {
    const card = {
      id: this.boardService.maxId() + 1,
      name: 'New Card',
      description: '',
      createdDate: new Date(),
      sprintId: this.boardService.activeSprint()?.id,
      comments: [] as Comment[],
      activities: [] as Activity[]
    } as Card;

    this.list.update(({ cards, ...list }) => ({
      ...list,
      cards: cards.concat(card)
    }));

    timer(50).subscribe(() => {
      const list = this.cardsList.nativeElement;
      list.scrollTop = list.scrollHeight;
    });

    this.openCardDetail(card);
  }

  onDrop(event: CdkDragDrop<Card[]>): void {
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

      this.generateActivity(event);
    }

    this.list.update(({ ...list }) => ({
      ...list,
      cards: this.list().cards
    }));
  }

  onNameChange(): void {
    const { innerText } = this.listName.nativeElement;
    const name = innerText.trim();

    if (name) {
      this.list.update((list) => ({ ...list, name: innerText.trim() }));
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
    this.list.update(({ cards, ...list }) => ({
      ...list,
      cards: cards.filter((c) => c.id !== id)
    }));
  }

  sortByCreationDate(sortDirection: SortDirection = 'asc'): void {
    if (sortDirection == 'asc') {
      this.list.update(({ cards, ...list }) => ({
        ...list,
        cards: cards.sort(
          (a, b) =>
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
        )
      }));
    }

    if (sortDirection == 'desc') {
      this.list.update(({ cards, ...list }) => ({
        ...list,
        cards: cards.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        )
      }));
    }
  }

  sortByName(sortDirection: SortDirection = 'asc'): void {
    if (sortDirection == 'asc') {
      this.list.update(({ cards, ...list }) => ({
        ...list,
        cards: cards.sort((a, b) => a.name.localeCompare(b.name))
      }));
    }

    if (sortDirection == 'desc') {
      this.list.update(({ cards, ...list }) => ({
        ...list,
        cards: cards.sort((a, b) => b.name.localeCompare(a.name))
      }));
    }
  }

  sortByPriority(sortDirection: SortDirection = 'asc'): void {
    if (sortDirection == 'asc') {
      this.list.update(({ cards, ...list }) => ({
        ...list,
        cards: cards.sort((a, b) => a.priority - b.priority)
      }));
    }

    if (sortDirection == 'desc') {
      this.list.update(({ cards, ...list }) => ({
        ...list,
        cards: cards.sort((a, b) => b.priority - a.priority)
      }));
    }
  }

  private generateActivity(event: CdkDragDrop<Card[]>): void {
    const previousList = document.getElementById(event.previousContainer.id)
      ?.parentElement?.parentElement as HTMLElement;

    const previousListName = (
      previousList.querySelector('h2') as HTMLHeadingElement
    ).innerText;

    const currentListName = this.list().name;

    const card = this.list().cards[event.currentIndex];

    card.activities = [
      ...card.activities,
      this.#activityService.create(
        `moved the card from ${previousListName} to ${currentListName}`
      )
    ];
  }

  openCardDetail(card: Card): void {
    this.card = card;

    this.dialogRef = this.#dialogService.open(this.cardDetail, {
      width: '55rem',
      height: '50rem',
      autoFocus: 'dialog',
      panelClass: 'bg__slate__gray'
    });
  }

  onCardChange(card: Card) {
    const cards = this.list().cards;

    const index = cards.indexOf(
      this.list().cards.find((c) => c.id == card.id) as Card
    );

    this.list.update(({ cards, ...list }) => {
      cards[index] = card;
      return { ...list, cards };
    });
  }
}
