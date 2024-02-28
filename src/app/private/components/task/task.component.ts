import {
  Component,
  ElementRef,
  EventEmitter,
  model,
  Output,
  ViewChild
} from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task = model.required<Task>();
  @Output() taskDeleted = new EventEmitter();

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('inputContainer') inputContainer!: ElementRef<HTMLDivElement>;

  onFinishedChange(finished: boolean): void {
    this.task.update((task) => ({ ...task, finished }));
  }

  onNameChange(event: FocusEvent): void {
    const { value } = event.target as HTMLInputElement;

    this.inputContainer.nativeElement.classList.remove('focused');

    this.task.update((task) => ({ ...task, name: value.trim() }));
  }
}
