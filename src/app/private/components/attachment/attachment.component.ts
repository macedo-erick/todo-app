import { Component, inject, model, output } from '@angular/core';
import { CardAttachment } from '../../models/card-attachment.model';
import { BoardService } from '../../services/board/board.service';

@Component({
  selector: 'todo-attachment',
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.scss',
  standalone: true,
  imports: []
})
export class AttachmentComponent {
  boardService = inject(BoardService);

  attachment = model.required<CardAttachment>();

  deletedAttachment = output();
  downloadAttachment = output();
}
