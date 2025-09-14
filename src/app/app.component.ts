import { Component, inject } from '@angular/core';
import { AuthService } from './public/services/auth/auth.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authService = inject(AuthService);

  isAuthenticated = this.authService.isAuthenticated;
}
