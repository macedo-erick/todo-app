import { Component, inject, model } from '@angular/core';
import { Attachment } from '../../models/attachment.model';
import { AttachmentService } from '../../services/attachment/attachment.service';
import { tap } from 'rxjs';
import { BoardService } from '../../services/board/board.service';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { AttachmentComponent } from '../attachment/attachment.component';

@Component({
  selector: 'todo-attachments',
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss',
  standalone: true,
  imports: [AttachmentComponent, NgIf, MatButton]
})
export class AttachmentsComponent {
  #attachmentService = inject(AttachmentService);
  boardService = inject(BoardService);

  attachments = model.required<Attachment[]>();

  onFileInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const { files } = inputElement;

    if (files) {
      const formData = new FormData();
      formData.append('file', files[0]);

      this.#attachmentService
        .uploadFile(formData)
        .pipe(
          tap((res): void => {
            this.attachments.update((attachments) => [...attachments, res]);
            inputElement.value = '';
          })
        )
        .subscribe();
    }
  }

  onDownloadAttachment(key: string, fileName: string): void {
    this.#attachmentService.downloadFile(key, fileName).subscribe();
  }

  onDeletedAttachment(key: string): void {
    this.#attachmentService
      .deleteFile(key)
      .pipe(
        tap(() =>
          this.attachments.update((attachments) =>
            attachments.filter((attachment) => attachment.key !== key)
          )
        )
      )
      .subscribe();
  }
}
