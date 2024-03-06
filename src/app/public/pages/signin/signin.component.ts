import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { SnackBarComponent } from '../../../private/components/snack-bar/snack-bar.component';

@Component({
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signInFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl({ value: false, disabled: true }, [
      Validators.required
    ])
  });

  showPassword = false;

  constructor(
    private authService: AuthService,
    private snackBarService: MatSnackBar
  ) {}

  signIn(): void {
    const { email, password } = this.signInFormGroup.value;

    this.authService
      .signIn({ email, password })
      .pipe(
        tap({
          error: ({ error: { error } }) => {
            this.snackBarService.openFromComponent(SnackBarComponent, {
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
}
