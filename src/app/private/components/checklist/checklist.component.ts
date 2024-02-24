import { Component, computed, model } from '@angular/core';
import { Checklist } from '../../models/checklist.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'todo-checklist',
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss'
})
export class ChecklistComponent {
  checklist = model.required<Checklist>();
  progress = computed(() => {
    const tasks = this.checklist().tasks;
    const finishedTasks = tasks.filter((c) => c.finished).length;
    return Math.floor((finishedTasks / tasks.length) * 100);
  });

  taskChange(index: number, task: Task) {
    this.checklist.update(({ tasks, ...checklist }) => {
      tasks[index] = task;

      return {
        ...checklist,
        tasks
      };
    });
  }
}
