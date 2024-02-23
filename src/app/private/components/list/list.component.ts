import { Component, EventEmitter, input, Output } from '@angular/core';
import { List } from '../../models/list.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Card } from '../../models/card.model';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailComponent } from '../card-detail/card-detail.component';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  list = input.required<List>();

  @Output() modifiedList = new EventEmitter();
  @Output() removedList = new EventEmitter();

  constructor(private dialogService: MatDialog) {}

  drop(event: CdkDragDrop<Card[]>) {
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

    this.modifiedList.emit();
  }

  handleTitleChange(list: List, innerText: string) {
    list.name = innerText.trim();
    this.modifiedList.emit();
  }

  addCard() {
    this.list().cards.push({ name: 'New Card' } as Card);
    this.modifiedList.emit();
  }

  showCardDetails(card: Card) {
    this.dialogService.open(CardDetailComponent, {
      data: card,
      width: '45rem',
      height: '50rem',
      autoFocus: 'dialog'
    });
  }
}
