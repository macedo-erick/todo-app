import { Component, input } from '@angular/core';
import { List } from '../../models/list.model';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  list = input<List>();
}
