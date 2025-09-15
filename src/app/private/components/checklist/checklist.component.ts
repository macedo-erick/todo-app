import { Component, inject, model } from '@angular/core';
import { CardChecklist } from '../../models/card-checklist.model';
import { BoardService } from '../../services/board/board.service';

@Component({
  selector: 'todo-checklist',
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
  standalone: true,
  imports: []
})
export class ChecklistComponent {
  boardService = inject(BoardService);

  checklist = model.required<CardChecklist>();

  // progress = computed(() => {
  //   const tasks = this.checklist().tasks;
  //   const finishedTasks = tasks.filter((c) => c.finished).length;
  //   return Math.floor((finishedTasks / tasks.length) * 100) || 0;
  // });

  // addTask(): void {
  //   this.checklist.update(({ tasks, ...checklist }) => ({
  //     ...checklist,
  //     tasks: tasks.concat({ name: 'New Task', finished: false })
  //   }));
  // }

  // onTaskChange(index: number, task: CardChecklistItem): void {
  //   this.checklist.update(({ tasks, ...checklist }) => {
  //     tasks[index] = task;
  //
  //     return {
  //       ...checklist,
  //       tasks
  //     };
  //   });
  // }

  // onTaskDeleted(index: number): void {
  //   this.checklist.update(({ tasks, ...checklist }) => ({
  //     ...checklist,
  //     tasks: tasks.filter((_, i) => index !== i)
  //   }));
  // }

  // drop(event: CdkDragDrop<BoardList>): void {
  //   moveItemInArray(
  //     this.checklist().tasks,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  //
  //   this.checklist.update(({ ...checklist }) => ({
  //     ...checklist,
  //     tasks: this.checklist().tasks
  //   }));
  // }
}
