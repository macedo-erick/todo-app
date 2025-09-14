/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'todo-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrl: './snack-bar.component.scss',
    standalone: true,
    imports: [MatSnackBarLabel, MatSnackBarActions, MatButton, MatSnackBarAction]
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef<any>);
  message = inject(MAT_SNACK_BAR_DATA);
}
