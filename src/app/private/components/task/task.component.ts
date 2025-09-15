import {
  Component,
  ElementRef,
  inject,
  model,
  output,
  signal,
  ViewChild
} from '@angular/core';
import { CardChecklistItem } from '../../models/card-checklist-item.model';
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

  task = model.required<CardChecklistItem>();
  evaluateReadOnlyState = signal(true);
  isEditing = false;

  taskDeleted = output();

  @ViewChild('taskName') taskName!: ElementRef<HTMLParagraphElement>;
  @ViewChild('inputContainer') inputContainer!: ElementRef<HTMLDivElement>;

  onFinishedChange(finished: boolean): void {
    this.task.update((task) => ({ ...task, finished }));
  }

  toggleChangeName(): void {
    if (this.boardService.isSprintModifiable()) {
      this.taskName.nativeElement.contentEditable = 'true';
      this.taskName.nativeElement.focus();
      this.isEditing = true;
    }
  }

  onNameChange(): void {
    const { innerText } = this.taskName.nativeElement;
    const name = innerText.trim();

    if (name) {
      this.task.update((task) => ({ ...task, name }));
    }

    this.isEditing = false;

    this.taskName.nativeElement.innerText = this.task().name;
    this.taskName.nativeElement.contentEditable = 'false';
  }
}
