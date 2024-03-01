import {
  Component,
  computed,
  EventEmitter,
  model,
  Output,
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

  @Output() deletedCard = new EventEmitter();

  @ViewChild('cardDetail') cardDetail!: TemplateRef<CardDetailComponent>;

  evaluateFooterVisibility = computed(() => {
    const { priority, dueDate, description, checklist } = this.card();

    return [priority, dueDate, description, checklist?.tasks.length].filter(
      (k) => k
    ).length;
  });

  evaluateDueDateStatus = computed(() => {
    const dueDate = new Date(this.card().dueDate);
    const currentDate = new Date();
    const overdue = dueDate < currentDate;
    const withinNextDay = dueDate <= addDays(currentDate, 1);

    if (this.card().finished) {
      return DueDateStatus.FINISHED;
    } else if (withinNextDay) {
      return DueDateStatus.PENDING;
    } else if (overdue) {
      return DueDateStatus.OVERDUE;
    }

    return;
  });

  evaluateCheckListStatus = computed(() => {
    if (this.card().checklist && this.card().checklist.tasks) {
      const tasks = this.card().checklist.tasks;
      const finishedTasks = tasks.filter((c) => c.finished).length;

      return `${finishedTasks}/${tasks.length}`;
    }

    return;
  });

  evaluatePriorityIcon = computed(() => {
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

  onCardChange(card: Card): void {
    this.card.update(() => card);
  }
}
