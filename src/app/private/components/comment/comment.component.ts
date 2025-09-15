import { Component, inject } from '@angular/core';
import { BoardService } from '../../services/board/board.service';

@Component({
  selector: 'todo-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  standalone: true,
  imports: []
})
export class CommentComponent {
  boardService = inject(BoardService);

  // comment = model.required<CardComment>();

  // initials = computed(() => {
  //   const user = this.comment().author;
  //   const [firstName, lastName] = user.split(/\s+/);
  //
  //   return firstName.charAt(0).concat(lastName.charAt(0));
  // });

  // deletedComment = output();
}
