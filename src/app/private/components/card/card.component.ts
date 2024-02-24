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

  constructor(private dialogService: MatDialog) {}

  showCardDetails(): void {
    this.dialogService.open(this.cardDetail, {
      width: '45rem',
      height: '50rem',
      autoFocus: 'dialog',
      panelClass: 'overlay__bg'
    });
  }

  cardChange(card: Card): void {
    this.card.update(() => card);
  }
}
