import { Component, model } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task = model.required<Task>();
}
