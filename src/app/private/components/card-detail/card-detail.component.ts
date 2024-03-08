import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  model,
  Output,
  ViewChild
} from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card } from '../../models/card.model';
import { BlurEvent } from '@ckeditor/ckeditor5-angular';
import { Checklist } from '../../models/checklist.model';
import { editorConfig } from '../../../util/util';
import { addDays } from 'date-fns';
import { Priority } from '../../models/priority.model';
import { MatSelectChange } from '@angular/material/select';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Comment } from '../../models/comment.model';
import { ActivityService } from '../../services/activity/activity.service';

@Component({
  selector: 'todo-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  card = model.required<Card>();

  evaluateTimeSpentVisibility = computed(() =>
    Object.hasOwn(this.card(), 'timeSpent')
  );

  editor = ClassicEditor;
  config = editorConfig;

  priorities = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' }
  ];

  @Output() deletedCard = new EventEmitter();
  @ViewChild('cardName') cardName!: ElementRef<HTMLHeadingElement>;

  constructor(private activityService: ActivityService) {}

  addDueDate(): void {
    if (!this.card().dueDate) {
      this.card.update(({ activities, ...card }) => ({
        ...card,
        dueDate: addDays(new Date(), 1),
        activities: [
          ...activities,
          this.activityService.create('added due date to the card')
        ]
      }));
    }
  }

  addChecklist(): void {
    if (!this.card().checklist) {
      this.card.update(({ activities, ...card }) => ({
        ...card,
        checklist: { name: 'Checklist', tasks: [] },
        activities: [
          ...activities,
          this.activityService.create('added checklist to the card')
        ]
      }));
    }
  }

  addPriority(): void {
    if (!this.card().priority) {
      this.card.update(({ activities, ...card }) => ({
        ...card,
        priority: Priority.MEDIUM,
        activities: [
          ...activities,
          this.activityService.create('added priority to the card')
        ]
      }));
    }
  }

  addTimeSpent(): void {
    if (!this.evaluateTimeSpentVisibility()) {
      this.card.update(({ activities, ...card }) => ({
        ...card,
        activities: [
          ...activities,
          this.activityService.create('added time spent to the card')
        ],
        timeSpent: 0
      }));
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
          this.activityService.create(`changed the name of the card`)
        ]
      }));
    }
  }

  onDescriptionChange({ editor }: BlurEvent<ClassicEditor>): void {
    this.card.update(({ activities, ...card }) => ({
      ...card,
      description: editor.getData(),
      activities: [
        ...activities,
        this.activityService.create(`changed the card description`)
      ]
    }));
  }

  onChecklistChange(checklist: Checklist): void {
    this.card.update((card) => ({ ...card, checklist }));
  }

  onDueDateChange(event: MatDatepickerInputEvent<Date, Date>): void {
    const { value: dueDate } = event;

    const formattedDueDate = new Date(String(dueDate)).toLocaleDateString('en');

    const description = dueDate
      ? `changed the due date to ${formattedDueDate}`
      : 'removed the due date';

    this.card.update(({ activities, ...card }) => ({
      ...card,
      dueDate: dueDate as Date,
      activities: [...activities, this.activityService.create(description)]
    }));
  }

  onPriorityChange(event: MatSelectChange) {
    const { value: priority } = event;

    this.card.update(({ activities, priority: oldPriority, ...card }) => ({
      ...card,
      priority,
      activities: [
        ...activities,
        this.activityService.create(
          `changed the priority from ${this.priorities[oldPriority - 1]?.label} to ${this.priorities[priority - 1]?.label}`
        )
      ]
    }));
  }

  onFinishedChange(finished: boolean): void {
    const description = finished
      ? 'changed the due date to finished'
      : 'changed the due date to unfinished';

    this.card.update(({ activities, ...card }) => ({
      ...card,
      finished,
      activities: [...activities, this.activityService.create(description)]
    }));
  }

  onTimeSpentChange(event: Event): void {
    const { value } = event.target as HTMLInputElement;

    this.card.update(({ activities, ...card }) => ({
      ...card,
      timeSpent: Number(value),
      activities: [
        ...activities,
        this.activityService.create(`changed the time spent to ${value}h`)
      ]
    }));
  }

  onCommentsChange(comments: Comment[]) {
    this.card.update((card) => ({ ...card, comments }));
  }
}
