import { Component } from '@angular/core';
import { AuthService } from './public/services/auth/auth.service';
import { UserService } from './private/services/user/user.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSignedIn = this.authService.isSignedIn();
  userInitials$ = this.userService.getUserInitials();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  signOut() {
    this.authService.signOut();
  }
}
