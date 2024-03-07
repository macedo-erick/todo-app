import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl<string, string> | null): boolean {
    if (!control) return false;

    if (control.invalid && control.touched) return true;

    return control.parent?.errors?.['mismatch'] && control.touched;
  }
}

const passwordMatch: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (
    password &&
    confirmPassword &&
    password?.value != confirmPassword?.value
  ) {
    return {
      mismatch: true
    };
  }
  return null;
};

export default passwordMatch;
