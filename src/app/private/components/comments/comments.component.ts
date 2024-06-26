import { Component, computed, inject, model, signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from '../../../util/util';
import { FormControl, Validators } from '@angular/forms';
import { Comment } from '../../models/comment.model';
import { BoardService } from '../../services/board/board.service';

@Component({
  selector: 'todo-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  #userService = inject(UserService);
  boardService = inject(BoardService);

  initials = signal(this.#userService.getUserInitials());
  isEditing = signal(false);

  comments = model.required<Comment[]>();

  sortedComments = computed(() =>
    this.comments().sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    )
  );

  editor = ClassicEditor;
  config = editorConfig;

  description = new FormControl('', Validators.required);

  onWriteCommentClick(): void {
    this.isEditing.update(() => true);
  }

  onCancelClick(): void {
    this.isEditing.update(() => false);
    this.description.patchValue('');
  }

  onSaveClick(): void {
    this.isEditing.update(() => false);

    if (String(this.description.value)) {
      this.comments.update((comments) => [
        {
          author: this.#userService.getLoggedUser(),
          createdDate: new Date(),
          description: String(this.description.value)
        },
        ...comments
      ]);

      this.description.patchValue('');
    }
  }

  onDeletedComment(index: number): void {
    this.comments.update((comments) => comments.filter((_, i) => i !== index));
  }
}
