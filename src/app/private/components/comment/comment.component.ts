import {
  Component,
  computed,
  EventEmitter,
  model,
  Output
} from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'todo-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = model.required<Comment>();

  initials = computed(() => {
    const user = this.comment().author;
    const [firstName, lastName] = user.split(/\s+/);

    return firstName.charAt(0).concat(lastName.charAt(0));
  });

  @Output() deletedComment = new EventEmitter();
}
