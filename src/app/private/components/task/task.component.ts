import {
  AfterViewInit,
  Component,
  EventEmitter,
  model,
  Output,
  ViewChild
} from '@angular/core';
import { Task } from '../../models/task.model';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements AfterViewInit {
  task = model.required<Task>();

  @ViewChild('taskForm', { static: false }) taskForm!: NgForm;
  @Output() taskDeleted = new EventEmitter();

  ngAfterViewInit(): void {
    this.handleFormChange();
  }

  private handleFormChange(): void {
    this.taskForm.valueChanges
      ?.pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((task: Task) => {
        this.task.update(() => task);
      });
  }
}
