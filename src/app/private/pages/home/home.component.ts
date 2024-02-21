import { Component } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { UserService } from '../../services/user/user.service';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  boards$ = this.boardService.onFindAll();
  user$ = this.userService.find();
  board$ = this.boardService.onFindOne();

  constructor(
    private boardService: BoardService,
    private userService: UserService
  ) {
    this.boardService.findAll();
    this.boardService.findOne('65c51af6588efa0a14f45942');
  }
}
