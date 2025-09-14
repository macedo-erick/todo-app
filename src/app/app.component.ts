import { Component, inject } from '@angular/core';
import { AuthService } from './public/services/auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './private/components/header/header.component';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  authService = inject(AuthService);

  isAuthenticated = this.authService.isAuthenticated;
}
