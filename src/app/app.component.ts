import { Component } from '@angular/core';
import { AuthService } from './public/services/auth/auth.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isAuthenticated = this.authService.isAuthenticated;

  constructor(private authService: AuthService) {}
}
