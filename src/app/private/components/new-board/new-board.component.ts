import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'todo-new-board',
  templateUrl: './new-board.component.html',
  styleUrl: './new-board.component.scss',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ]
})
export class NewBoardComponent {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    prefix: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  #dialogRef = inject(MatDialogRef<NewBoardComponent>);

  saveBoard() {
    this.#dialogRef.close(this.formGroup.value);
  }
}
