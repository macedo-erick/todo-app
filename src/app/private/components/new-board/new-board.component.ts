import { Component, computed, inject, ViewChild } from '@angular/core';
import {
  FormArray,
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
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix
} from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { addDays } from 'date-fns';
import { SprintStatus } from '../../enums/sprint-status';
import { v4 as uuidv4 } from 'uuid';

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
    MatDialogClose,
    NgxMaskDirective,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix
  ],
  providers: [provideNgxMask(), provideNativeDateAdapter()]
})
export class NewBoardComponent {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    prefix: new FormControl('', [Validators.required, Validators.minLength(4)]),
    sprints: new FormArray([
      new FormGroup({
        id: new FormControl(uuidv4()),
        startDate: new FormControl(new Date(), [Validators.required]),
        endDate: new FormControl(addDays(new Date(), 15), [
          Validators.required
        ]),
        status: new FormControl(SprintStatus.ACTIVE)
      })
    ])
  });
  displayedColumns = ['startDate', 'endDate', 'actions'];
  sprints = computed(
    () => this.formGroup.get('sprints') as FormArray<FormGroup>
  );
  #dialogRef = inject(MatDialogRef<NewBoardComponent>);
  @ViewChild(MatTable) private table?: MatTable<FormGroup>;

  removeSprint(index: number): void {
    this.sprints().removeAt(index);
    this.table?.renderRows();
  }

  saveBoard() {
    this.#dialogRef.close(this.formGroup.value);
  }

  addSprint(): void {
    const sprints = this.sprints().value;
    const lastSprint = sprints[sprints.length - 1];

    this.sprints().push(
      this.createSprint(
        addDays(lastSprint.endDate, 1),
        addDays(lastSprint.endDate, 15)
      )
    );

    this.table?.renderRows();
  }

  private createSprint(startDate: Date, endDate: Date): FormGroup {
    return new FormGroup({
      id: new FormControl(uuidv4()),
      startDate: new FormControl(startDate, [Validators.required]),
      endDate: new FormControl(endDate, [Validators.required]),
      status: new FormControl(SprintStatus.PENDING)
    });
  }
}
