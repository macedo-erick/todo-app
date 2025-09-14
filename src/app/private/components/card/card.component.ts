import {
  Component,
  computed,
  inject,
  model,
  output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Card } from '../../models/card.model';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { Priority } from '../../enums/priority.enum';
import { CardType } from '../../enums/card-type.enum';
import { BoardService } from '../../services/board/board.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { MatCard, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'todo-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [
    CdkDrag,
    MatCard,
    MatCardTitle,
    MatCardFooter,
    NgClass,
    CardDetailComponent
  ]
})
export class CardComponent {
  boardService = inject(BoardService);
  #dialogService = inject(MatDialog);

  card = model.required<Card>();

  deletedCard = output();

  dialogRef!: MatDialogRef<CardDetailComponent>;

  @ViewChild('cardDetail') cardDetail!: TemplateRef<CardDetailComponent>;

  evaluateFooterVisibility = computed(() => {
    const { priority, description, checklist, attachments, type } = this.card();

    return [
      priority,
      description,
      checklist?.tasks.length,
      attachments?.length,
      type
    ].filter((k) => k).length;
  });

  evaluateType = computed(() => {
    switch (this.card().type) {
      case CardType.STORY:
        return 'story';
      case CardType.TASK:
        return 'task';
      case CardType.BUG:
        return 'bug';
    }
  });

  evaluateTypeIcon = computed(() => {
    switch (this.card().type) {
      case CardType.STORY:
        return 'fa-square-ellipsis';
      case CardType.TASK:
        return 'fa-square-check';
      case CardType.BUG:
        return 'fa-square-exclamation';
    }
  });

  evaluatePriority = computed(() => {
    switch (this.card().priority) {
      case Priority.LOW:
        return 'low';
      case Priority.MEDIUM:
        return 'medium';
      case Priority.HIGH:
        return 'high';
    }
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

  evaluateCheckListStatus = computed(() => {
    if (this.card().checklist && this.card().checklist.tasks) {
      const tasks = this.card().checklist.tasks;
      const finishedTasks = tasks.filter((c) => c.finished).length;

      return `${finishedTasks}/${tasks.length}`;
    }

    return;
  });

  showCardDetails(): void {
    this.dialogRef = this.#dialogService.open(this.cardDetail, {
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
