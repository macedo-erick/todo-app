import { Component, computed, model, output } from '@angular/core';
import { CardPriority, CardType } from '../../models/card.model';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { MatCard, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { CardResponseDto } from '../../dtos/card.dto';

@Component({
  selector: 'todo-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [CdkDrag, MatCard, MatCardTitle, MatCardFooter, NgClass]
})
export class CardComponent {
  card = model.required<CardResponseDto>();

  deletedCard = output();

  dialogRef!: MatDialogRef<CardDetailComponent>;

  evaluateFooterVisibility = computed(() => {
    const { priority, description, checklists, attachments, cardType } =
      this.card();

    return [
      priority,
      description,
      checklists.length,
      attachments.length,
      cardType
    ].filter((k) => k).length;
  });

  evaluateTypeIcon = computed(() => {
    switch (this.card().cardType) {
      case CardType.STORY:
        return 'fa-bookmark';
      case CardType.TASK:
        return 'fa-file';
      case CardType.BUG:
        return 'fa-bug';
      case CardType.SPIKE:
        return 'fa-square-exclamation';
    }
  });

  evaluatePriorityIcon = computed(() => {
    switch (this.card().priority) {
      case CardPriority.LOW:
        return 'fa-circle-chevron-down';
      case CardPriority.MEDIUM:
        return 'fa-circle-pause fa-rotate-90';
      case CardPriority.HIGH:
        return 'fa-circle-chevron-up';
    }
  });

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

  onCardChange(card: CardResponseDto): void {
    this.card.update(() => card);
  }
}
