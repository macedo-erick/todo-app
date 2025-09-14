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
import { MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  standalone: true,
  imports: [CdkDrag, NgIf, FormsModule, CdkDragHandle, MatIconButton]
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

  toggleChangeName(): void {
    if (this.boardService.isSprintModifiable()) {
      this.inputContainer.nativeElement.classList.add('focused');
      this.evaluateReadOnlyState.update(() => false);
    }
  }

  onNameChange(event: FocusEvent): void {
    const { value } = event.target as HTMLInputElement;

    this.inputContainer.nativeElement.classList.remove('focused');

    this.task.update((task) => ({ ...task, name: value.trim() }));

    this.evaluateReadOnlyState.update(() => true);
  }
}
