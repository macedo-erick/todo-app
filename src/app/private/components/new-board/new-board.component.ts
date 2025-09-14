import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'todo-new-board',
  templateUrl: './new-board.component.html',
  styleUrl: './new-board.component.scss'
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
