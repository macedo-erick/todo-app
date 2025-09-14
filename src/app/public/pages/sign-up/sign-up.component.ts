/* eslint-disable @typescript-eslint/no-unused-vars */
import {Component, computed, inject, signal} from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs';
import {SnackBarComponent} from '../../../private/components/snack-bar/snack-bar.component';
import passwordMatchValidator, {PasswordMatchState} from '../../validators/password-match.validator';
import { RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { NgClass } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { NgxMatInputTelComponent } from 'ngx-mat-input-tel';
import { MatFormField, MatLabel, MatInput, MatSuffix } from '@angular/material/input';
import { MatCard } from '@angular/material/card';

@Component({
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    standalone: true,
    imports: [MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgxMatInputTelComponent, MatIconButton, MatSuffix, NgClass, MatButton, MatDivider, RouterLink]
})
export class SignUpComponent {
  #authService = inject(AuthService);
  #snackBarService = inject(MatSnackBar);

  showPassword = signal(false);

  evaluateType = computed(() => {
    if (this.showPassword()) {
      return 'text';
    }

    return 'password';
  });

  evaluateSuffixIcon = computed(() => {
    if (this.showPassword()) {
      return 'fa-eye-slash';
    }

    return 'fa-eye';
  });

  strongPasswordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;

  formGroup: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.strongPasswordRegex)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: passwordMatchValidator }
  );

  passwordMatcher = new PasswordMatchState();

  signUp(): void {
    const { confirmPassword, ...rest } = this.formGroup.value;

    this.#authService
      .signUp({ ...rest })
      .pipe(
        tap({
          next: () => {
            this.#snackBarService.openFromComponent(SnackBarComponent, {
              duration: 3000,
              data: 'User registered sucessfully',
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          error: ({ error: { error } }) => {
            this.#snackBarService.openFromComponent(SnackBarComponent, {
              duration: 3000,
              data: error,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        })
      )
      .subscribe();
  }

  onShowPasswordChange(): void {
    this.showPassword.update((showPassword) => !showPassword);
  }

  protected readonly Array = Array;
}
