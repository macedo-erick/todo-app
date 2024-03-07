import {
  Component,
  computed,
  EventEmitter,
  model,
  Output
} from '@angular/core';
import { Comment } from '../../../../comment.model';

@Component({
  selector: 'todo-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = model.required<Comment>();

  initials = computed(() => {
    const user = this.comment().user;

    const [firstname, lastname] = user.split(/\s+/);

    return firstname.charAt(0).concat(lastname.charAt(0));
  });

  @Output() deletedComment = new EventEmitter();
}
