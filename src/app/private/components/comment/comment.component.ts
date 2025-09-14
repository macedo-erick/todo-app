import { Component, computed, inject, model, output } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { BoardService } from '../../services/board/board.service';
import { MatButton } from '@angular/material/button';
import { NgIf, DatePipe } from '@angular/common';
import { UserInitialsComponent } from '../user-initials/user-initials.component';

@Component({
    selector: 'todo-comment',
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    standalone: true,
    imports: [UserInitialsComponent, NgIf, MatButton, DatePipe]
})
export class CommentComponent {
  boardService = inject(BoardService);

  comment = model.required<Comment>();

  initials = computed(() => {
    const user = this.comment().author;
    const [firstName, lastName] = user.split(/\s+/);

    return firstName.charAt(0).concat(lastName.charAt(0));
  });

  deletedComment = output();
}
