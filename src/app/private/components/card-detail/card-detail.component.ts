import {
  Component,
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

  editor = ClassicEditor;
  config = editorConfig;

  @ViewChild('cardName') cardName!: ElementRef<HTMLHeadingElement>;
  @Output() deletedCard = new EventEmitter();

  priorities = ['low', 'medium', 'high'];

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

  onNameChange(): void {
    const { innerText } = this.cardName.nativeElement;

    this.card.update((card) => ({ ...card, name: innerText.trim() }));
  }

  onDescriptionChange({ editor }: BlurEvent<ClassicEditor>): void {
    this.card.update((card) => ({ ...card, description: editor.getData() }));
  }

  onChecklistChange(checklist: Checklist): void {
    const finished =
      checklist.tasks.length ==
      checklist.tasks.filter((task) => task.finished).length;

    this.card.update((card) => ({ ...card, checklist, finished }));
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
}
