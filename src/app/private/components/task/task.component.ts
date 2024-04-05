import {
  Component,
  ElementRef,
  inject,
  model,
  output,
  signal,
  ViewChild
} from '@angular/core';
import { Task } from '../../models/task.model';
import { BoardService } from '../../services/board/board.service';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  boardService = inject(BoardService);

  task = model.required<Task>();
  evaluateReadOnlyState = signal(true);

  taskDeleted = output();

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('inputContainer') inputContainer!: ElementRef<HTMLDivElement>;

  onFinishedChange(finished: boolean): void {
    this.task.update((task) => ({ ...task, finished }));
  }

  onNameChange(event: FocusEvent): void {
    const { value } = event.target as HTMLInputElement;

    this.inputContainer.nativeElement.classList.remove('focused');

    this.task.update((task) => ({ ...task, name: value.trim() }));

    this.evaluateReadOnlyState.update(() => true);
  }

  toggleChangeName(): void {
    if (this.boardService.isSprintModifiable()) {
      this.inputContainer.nativeElement.classList.add('focused');
      this.evaluateReadOnlyState.update(() => false);
    }
  }
}
