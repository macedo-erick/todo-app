import {
  Component,
  computed,
  model,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Card } from '../../models/card.model';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { addDays } from 'date-fns';
import { Priority } from '../../models/priority.model';

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
  card = model.required<Card>();

  @ViewChild('cardDetail') cardDetail!: TemplateRef<CardDetailComponent>;

  hasFooter = computed(() => {
    const { priority, dueDate, description, checklist } = this.card();

    return [priority, dueDate, description, checklist?.tasks.length].filter(
      (k) => k
    ).length;
  });

  dueDateStatus = computed(() => {
    const dueDate = new Date(this.card().dueDate);
    const currentDate = new Date();
    const overdue = dueDate < currentDate;
    const withinNextDay = dueDate <= addDays(currentDate, 1);

    if (overdue) {
      return DueDateStatus.OVERDUE;
    } else if (!this.card().finished && withinNextDay) {
      return DueDateStatus.PENDING;
    } else if (this.card().finished) {
      return DueDateStatus.FINISHED;
    }

    return;
  });

  checkListStatus = computed(() => {
    if (this.card().checklist && this.card().checklist.tasks) {
      const tasks = this.card().checklist.tasks;
      const finishedTasks = tasks.filter((c) => c.finished).length;

      return `${finishedTasks}/${tasks.length}`;
    }

    return;
  });

  priorityIcon = computed(() => {
    switch (this.card().priority) {
      case Priority.LOW:
        return 'fa-circle-chevron-down';
      case Priority.MEDIUM:
        return 'fa-circle-pause fa-rotate-90';
      case Priority.HIGH:
        return 'fa-circle-chevron-up';
    }
  });

  constructor(private dialogService: MatDialog) {}

  showCardDetails(): void {
    this.dialogService.open(this.cardDetail, {
      width: '55rem',
      height: '50rem',
      autoFocus: 'dialog',
      panelClass: 'bg__slate__gray'
    });
  }

  cardChange(card: Card): void {
    this.card.update(() => card);
  }
}
