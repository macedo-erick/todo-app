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

  addDueDate(): void {
    this.card.update((card) => ({ ...card, dueDate: addDays(new Date(), 1) }));
  }

  addChecklist(): void {
    this.card.update((card) => ({
      ...card,
      checklist: { name: 'Checklist', tasks: [] }
    }));
  }

  addPriority(): void {
    this.card.update((card) => ({ ...card, priority: Priority.MEDIUM }));
  }

  addTimeSpent(): void {
    this.card.update((card) => ({ ...card, timeSpent: 0 }));
  }

  onNameChange(): void {
    const { innerText } = this.cardName.nativeElement;

    this.card.update((card) => ({ ...card, name: innerText.trim() }));
  }

  onDescriptionChange({ editor }: BlurEvent<ClassicEditor>): void {
    this.card.update((card) => ({ ...card, description: editor.getData() }));
  }

  onChecklistChange(checklist: Checklist): void {
    this.card.update((card) => ({ ...card, checklist }));
  }

  onDueDateChange(event: MatDatepickerInputEvent<Date, Date>): void {
    const { value: dueDate } = event;

    this.card.update((card) => ({ ...card, dueDate: dueDate as Date }));
  }

  onPriorityChange(event: MatSelectChange) {
    const { value: priority } = event;

    this.card.update((card) => ({ ...card, priority }));
  }

  onFinishedChange(finished: boolean): void {
    this.card.update((card) => ({ ...card, finished }));
  }

  onTimeSpentChange(event: Event): void {
    const { value: timeSpent } = event.target as HTMLInputElement;

    this.card.update((card) => ({ ...card, timeSpent: Number(timeSpent) }));
  }
}
