import { Component, inject, model, output } from '@angular/core';
import { Attachment } from '../../models/attachment.model';
import { BoardService } from '../../services/board/board.service';

@Component({
  selector: 'todo-attachment',
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.scss'
})
export class AttachmentComponent {
  boardService = inject(BoardService);

  attachment = model.required<Attachment>();

  deletedAttachment = output();
  downloadAttachment = output();
}
