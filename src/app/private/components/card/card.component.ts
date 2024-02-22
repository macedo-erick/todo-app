import { Component, effect, input, signal } from '@angular/core';
import { Card } from '../../models/card.model';
import { addDays } from 'date-fns';

enum DueDateStatus {
  OVERDUE = 'overdue',
  PENDING = 'pending',
  FINISHED = 'finished'
}

@Component({
  selector: 'todo-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  card = input<Card>();
  dueDateStatus = signal('');
  checkListStatus = signal('');

  constructor() {
    effect(
      () => {
        this.changeDueDateStatus();
        this.changeCheckListStatus();
      },
      { allowSignalWrites: true }
    );
  }

  private changeDueDateStatus() {
    const card = this.card() as Card;
    const dueDate = new Date(card.dueDate);
    const currentDate = new Date();
    const overdue = dueDate < currentDate;
    const withinNextDay = dueDate <= addDays(currentDate, 1);

    if (overdue) {
      this.dueDateStatus.set(DueDateStatus.OVERDUE);
    } else if (!card.finished && withinNextDay) {
      this.dueDateStatus.set(DueDateStatus.PENDING);
    } else if (card.finished) {
      this.dueDateStatus.set(DueDateStatus.FINISHED);
    } else {
      this.dueDateStatus.set('');
    }
  }

  private changeCheckListStatus() {
    const card = this.card() as Card;

    if (card.checklist && card.checklist.tasks) {
      const tasks = card.checklist.tasks;
      const finishedTasks = tasks.filter((c) => c.finished).length;

      this.checkListStatus.set(`${finishedTasks}/${tasks.length}`);
    }
  }
}
