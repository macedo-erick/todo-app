import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../public/services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { UserInitialsComponent } from '../user-initials/user-initials.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    UserInitialsComponent,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ]
})
export class HeaderComponent {
  #authService = inject(AuthService);
  #userService = inject(UserService);

  initials = signal(this.#userService.getUserInitials());

  signOut(): void {
    this.#authService.signOut();
  }
}
