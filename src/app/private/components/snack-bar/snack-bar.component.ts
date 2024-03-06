/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef
} from '@angular/material/snack-bar';

@Component({
  selector: 'todo-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<any>,
    @Inject(MAT_SNACK_BAR_DATA) public message: string
  ) {}
}
