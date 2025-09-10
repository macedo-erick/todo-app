import {
  Component,
  ElementRef,
  inject,
  model,
  output,
  ViewChild
} from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card } from '../../models/card.model';
import { Checklist } from '../../models/checklist.model';
import { editorConfig } from '../../../util/util';
import { Comment } from '../../models/comment.model';
import { ActivityService } from '../../services/activity/activity.service';
import { BoardService } from '../../services/board/board.service';
import { Attachment } from '../../models/attachment.model';
import { MatSelectChange } from '@angular/material/select';
import { toDate } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { Sprint } from '../../models/sprint.model';
import { BlurEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'todo-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  #activityService = inject(ActivityService);
  boardService = inject(BoardService);

  card = model.required<Card>();

  deletedCard = output();
  closeModal = output();

  types = [
    { value: 1, label: 'Story' },
    { value: 2, label: 'Task' },
    { value: 3, label: 'Bug' }
  ];

  priorities = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' }
  ];

  @ViewChild('cardName') cardName!: ElementRef<HTMLHeadingElement>;

  editor = ClassicEditor;
  config = editorConfig;

  toggleChangeName(): void {
    if (this.boardService.isSprintModifiable()) {
      this.cardName.nativeElement.contentEditable = 'true';
      this.cardName.nativeElement.focus();
    }
  }

  onNameChange(): void {
    const { innerText } = this.cardName.nativeElement;

    if (innerText.trim() !== this.card().name) {
      this.card.update(({ activities, ...card }) => ({
        ...card,
        name: innerText.trim(),
        activities: [
          ...activities,
          this.#activityService.create(`changed the name of the card`)
        ]
      }));
    }
  }

  onSprintChange(event: MatSelectChange): void {
    const { value: sprintId } = event;

    const sprint = this.boardService
      .sprints()
      .find((sprint) => sprint.id === sprintId) as Sprint;

    const index = this.boardService.sprints().indexOf(sprint);

    const sprintStartDate = formatInTimeZone(
      toDate(sprint.startDate),
      'America/Sao_Paulo',
      'MM/dd/yyyy'
    );

    const sprintEndDate = formatInTimeZone(
      toDate(sprint.endDate),
      'America/Sao_Paulo',
      'MM/dd/yyyy'
    );

    this.card.update(({ activities, ...card }) => ({
      ...card,
      sprintId,
      activities: [
        ...activities,
        this.#activityService.create(
          `moved card to sprint [Sprint ${index + 1}] - ${sprintStartDate} - ${sprintEndDate}`
        )
      ]
    }));

    this.closeModal.emit();
  }

  onTypeChange(event: MatSelectChange): void {
    const { value: type } = event;

    this.card.update(({ activities, type: oldType, ...card }) => ({
      ...card,
      type,
      activities: [
        ...activities,
        this.#activityService.create(
          oldType
            ? `changed the type from ${this.types[oldType - 1]?.label} to ${this.types[type - 1]?.label}`
            : `changed the type to ${this.types[type - 1]?.label}`
        )
      ]
    }));
  }

  onPriorityChange(event: MatSelectChange): void {
    const { value: priority } = event;

    this.card.update(({ activities, priority: oldPriority, ...card }) => ({
      ...card,
      priority,
      activities: [
        ...activities,
        this.#activityService.create(
          oldPriority
            ? `changed the priority from ${this.priorities[oldPriority - 1]?.label} to ${this.priorities[priority - 1]?.label}`
            : `changed the priority to ${this.priorities[priority - 1]?.label}`
        )
      ]
    }));
  }

  onStoryPointsChange(event: Event): void {
    const { value } = event.target as HTMLInputElement;

    this.card.update(({ activities, ...card }) => ({
      ...card,
      storyPoints: Number(value),
      activities: [
        ...activities,
        this.#activityService.create(`changed the story points to ${value}d`)
      ]
    }));
  }

  onTimeSpentChange(event: Event): void {
    const { value } = event.target as HTMLInputElement;

    this.card.update(({ activities, ...card }) => ({
      ...card,
      timeSpent: Number(value),
      activities: [
        ...activities,
        this.#activityService.create(`changed the time spent to ${value}h`)
      ]
    }));
  }

  onDescriptionChange({ editor }: BlurEvent<ClassicEditor>): void {
    this.card.update(({ activities, ...card }) => ({
      ...card,
      description: editor.getData(),
      activities: [
        ...activities,
        this.#activityService.create(`changed the card description`)
      ]
    }));
  }

  addChecklist(): void {
    if (!this.card().checklist) {
      this.card.update(({ activities, ...card }) => ({
        ...card,
        checklist: { name: 'Checklist', tasks: [] },
        activities: [
          ...activities,
          this.#activityService.create('added checklist to the card')
        ]
      }));
    }
  }

  onChecklistChange(checklist: Checklist): void {
    this.card.update((card) => ({ ...card, checklist }));
  }

  addAttachments(): void {
    if (!this.card().attachments) {
      this.card.update(({ activities, ...card }) => ({
        ...card,
        attachments: [],
        activities: [
          ...activities,
          this.#activityService.create('added attachment to the card')
        ]
      }));
    }
  }

  onAttachmentsChange(attachments: Attachment[]): void {
    this.card.update((card) => ({ ...card, attachments }));
  }

  onCommentsChange(comments: Comment[]): void {
    this.card.update((card) => ({ ...card, comments }));
  }
}
