import { Component, model } from '@angular/core';
import { Attachment } from '../../models/attachment.model';

@Component({
  selector: 'todo-attachments',
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent {
  attachments = model.required<Attachment[]>();

  onDeletedAttachment(key: string) {}
}
