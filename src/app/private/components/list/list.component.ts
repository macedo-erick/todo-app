import { Component, EventEmitter, input, Output } from '@angular/core';
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
  list = input.required<List>();

  @Output() modifiedList = new EventEmitter();
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

    this.modifiedList.emit();
  }

  handleTitleChange(list: List, innerText: string) {
    list.name = innerText.trim();
    this.modifiedList.emit();
  }

  addCard() {
    this.list().cards.push({
      name: 'New Card',
      description: '',
      finished: false
    } as Card);

    this.modifiedList.emit();
  }
}
