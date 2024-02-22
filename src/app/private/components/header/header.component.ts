import { Component } from '@angular/core';
import { AuthService } from '../../../public/services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userInitials$ = this.userService.getUserInitials();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  signOut() {
    this.authService.signOut();
  }
}
