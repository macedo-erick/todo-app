import { Component, EventEmitter, model, Output } from '@angular/core';
import { List } from '../../models/list.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Card } from '../../models/card.model';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  list = model.required<List>();

  @Output() removedList = new EventEmitter();

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
  }

  handleTitleChange(list: List, innerText: string) {
    list.name = innerText.trim();
  }

  addCard() {
    const card = {
      name: 'New Card',
      description: '',
      finished: false
    } as Card;

    this.list.update(({ cards, ...list }) => ({
      ...list,
      cards: [...cards, card]
    }));
  }
}
