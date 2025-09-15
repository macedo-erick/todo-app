import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CardAttachment } from '../../models/card-attachment.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  #http = inject(HttpClient);
  #BASE_URL = environment.apiBasePath.concat('/attachments');

  uploadFile(formData: FormData): Observable<CardAttachment> {
    return this.#http.post<CardAttachment>(this.#BASE_URL, formData);
  }

  downloadFile(
    key: string,
    fileName: string,
    preview: boolean = false
  ): Observable<Blob> {
    return this.#http
      .get(this.#BASE_URL.concat(`/${key}`), {
        responseType: 'blob'
      })
      .pipe(
        tap((blob) => {
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;

          if (preview) {
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
          } else {
            anchor.download = fileName;
          }

          anchor.click();

          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            anchor.remove();
          }, 100);
        })
      );
  }

  deleteFile(key: string): Observable<unknown> {
    return this.#http.delete(this.#BASE_URL.concat(`/${key}`));
  }
}
