import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatCheckbox,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatDivider
  ]
})
export class PublicModule {}
