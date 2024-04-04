import { Component, model, output } from '@angular/core';
import { Attachment } from '../../models/attachment.model';

@Component({
  selector: 'todo-attachment',
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.scss'
})
export class AttachmentComponent {
  attachment = model.required<Attachment>();

  deletedAttachment = output();
  downloadAttachment = output();
}
