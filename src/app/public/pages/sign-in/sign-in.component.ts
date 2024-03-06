import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { SnackBarComponent } from '../../../private/components/snack-bar/snack-bar.component';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
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
