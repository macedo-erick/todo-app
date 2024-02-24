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

  drop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.list().cards,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        this.list().cards,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.list.update(({ ...list }) => ({ ...list, cards: this.list().cards }));
  }

  handleTitleChange(list: List, innerText: string): void {
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
      cards: cards.concat(card)
    }));
  }

  cardChange(index: number, card: Card): void {
    this.list.update(({ cards, ...list }) => {
      cards[index] = card;
      return { ...list, cards };
    });
  }
}
