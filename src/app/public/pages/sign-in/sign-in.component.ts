import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { SnackBarComponent } from '../../../private/components/snack-bar/snack-bar.component';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatInput, MatSuffix } from '@angular/material/input';
import { MatCard } from '@angular/material/card';

@Component({
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
    standalone: true,
    imports: [MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatIconButton, MatSuffix, NgClass, RouterLink, MatButton, MatDivider]
})
export class SignInComponent {
  #authService = inject(AuthService);
  #snackBarService = inject(MatSnackBar);

  showPassword = signal(false);

  evaluateInputType = computed(() => {
    if (this.showPassword()) {
      return 'text';
    }

    return 'password';
  });

  evaluateInputSuffixIcon = computed(() => {
    if (this.showPassword()) {
      return 'fa-eye-slash';
    }

    return 'fa-eye';
  });

  signInFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  signIn(): void {
    const { email, password } = this.signInFormGroup.value;

    this.#authService
      .signIn({
        email: email.replace(/\s+/, ''),
        password: password.replace(/\s+/, '')
      })
      .pipe(
        tap({
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
}
