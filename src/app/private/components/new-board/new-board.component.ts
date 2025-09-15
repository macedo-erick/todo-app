import { Component, computed, inject, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
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
import { SprintStatus } from '../../models/sprint.model';

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
  #dialogRef = inject(MatDialogRef<NewBoardComponent>);

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    prefix: new FormControl('', [Validators.required, Validators.minLength(4)]),
    sprints: new FormArray(
      [
        new FormGroup({
          name: new FormControl('Test'),
          startDate: new FormControl(new Date(), [Validators.required]),
          endDate: new FormControl(addDays(new Date(), 15), [
            Validators.required
          ]),
          status: new FormControl(SprintStatus.ACTIVE)
        })
      ],
      this.#minLengthArray(1)
    )
  });

  displayedColumns = ['startDate', 'endDate', 'actions'];

  sprints = computed(
    () => this.formGroup.get('sprints') as FormArray<FormGroup>
  );

  @ViewChild(MatTable) table!: MatTable<FormGroup>;

  removeSprint(index: number): void {
    this.sprints().removeAt(index);
    this.table.renderRows();
  }

  saveBoard() {
    this.#dialogRef.close(this.formGroup.value);
  }

  addSprint(): void {
    const sprints = this.sprints().value;
    const lastSprint = sprints[sprints.length - 1];

    const endDate = lastSprint?.endDate || new Date();

    this.sprints().push(
      this.#createSprint(addDays(endDate, 1), addDays(endDate, 15))
    );

    this.table?.renderRows();
  }

  #createSprint(startDate: Date, endDate: Date): FormGroup {
    return new FormGroup({
      startDate: new FormControl(startDate, [Validators.required]),
      endDate: new FormControl(endDate, [Validators.required]),
      status: new FormControl(SprintStatus.PLANNED)
    });
  }

  #minLengthArray(min: number) {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c instanceof FormArray) {
        return c.length >= min
          ? null
          : { minLengthArray: { required: min, actual: c.length } };
      }
      return null;
    };
  }
}
