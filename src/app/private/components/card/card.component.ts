import {
  Component,
  computed,
  inject,
  model,
  output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Card, CardPriority, CardType } from '../../models/card.model';
import { CardDetailComponent } from '../card-detail/card-detail.component';
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

  card = model.required<Card>();

  deletedCard = output();

  dialogRef!: MatDialogRef<CardDetailComponent>;

  @ViewChild('cardDetail') cardDetail!: TemplateRef<CardDetailComponent>;

  evaluateFooterVisibility = computed(() => {
    return 0;
    // const { priority, description, checklist, attachments, type } = this.card();
    //
    // return [
    //   priority,
    //   description,
    //   checklist?.tasks.length,
    //   attachments?.length,
    //   type
    // ].filter((k) => k).length;
  });

  // evaluateType = computed(() => {
  //   switch (this.card().cardType) {
  //     case CardType.STORY:
  //       return 'story';
  //     case CardType.TASK:
  //       return 'task';
  //     case CardType.BUG:
  //       return 'bug';
  //   }
  // });

  // evaluateTypeIcon = computed(() => {
  //   switch (this.card().cardType) {
  //     case CardType.STORY:
  //       return 'fa-square-ellipsis';
  //     case CardType.TASK:
  //       return 'fa-square-check';
  //     case CardType.BUG:
  //       return 'fa-square-exclamation';
  //   }
  // });

  // evaluatePriority = computed(() => {
  //   switch (this.card().priority) {
  //     case CardPriority.LOW:
  //       return 'low';
  //     case CardPriority.MEDIUM:
  //       return 'medium';
  //     case CardPriority.HIGH:
  //       return 'high';
  //   }
  // });

  // evaluatePriorityIcon = computed(() => {
  //   switch (this.card().priority) {
  //     case CardPriority.LOW:
  //       return 'fa-circle-chevron-down';
  //     case CardPriority.MEDIUM:
  //       return 'fa-circle-pause fa-rotate-90';
  //     case CardPriority.HIGH:
  //       return 'fa-circle-chevron-up';
  //   }
  // });

  // evaluateCheckListStatus = computed(() => {
  //   const card = this.card();
  //
  //   if (card.checklist && card.checklist.tasks) {
  //     const tasks = card.checklist.tasks;
  //     const finishedTasks = tasks.filter((c) => c.finished).length;
  //
  //     return `${finishedTasks}/${tasks.length}`;
  //   }
  //
  //   return;
  // });

  onCardChange(card: Card): void {
    this.card.update(() => card);
  }
}
