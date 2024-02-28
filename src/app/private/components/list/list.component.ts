import {
  Component,
  ElementRef,
  EventEmitter,
  model,
  Output,
  ViewChild
} from '@angular/core';
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
  @ViewChild('listName') listName!: ElementRef<HTMLHeadingElement>;

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
    }

    this.list.update(({ ...list }) => ({ ...list, cards: this.list().cards }));
  }

  onNameChange(): void {
    const { innerText } = this.listName.nativeElement;
    this.list.update((list) => ({ ...list, name: innerText.trim() }));
    this.listName.nativeElement.contentEditable = 'false';
  }

  addCard(): void {
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

  onCardChange(index: number, card: Card): void {
    this.list.update(({ cards, ...list }) => {
      cards[index] = card;
      return { ...list, cards };
    });
  }

  toggleEditHeader() {
    this.listName.nativeElement.contentEditable = 'true';
    this.listName.nativeElement.focus();
  }
}
