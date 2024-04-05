import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../public/services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  #authService = inject(AuthService);
  #userService = inject(UserService);

  initials = signal(this.#userService.getUserInitials());

  signOut(): void {
    this.#authService.signOut();
  }
}
