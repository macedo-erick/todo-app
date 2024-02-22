import { Component, signal } from '@angular/core';
import { AuthService } from './public/services/auth/auth.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSignedIn = signal(this.authService.isSignedIn());

  constructor(private authService: AuthService) {}
}
