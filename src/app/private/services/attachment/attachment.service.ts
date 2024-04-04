import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Attachment } from '../../models/attachment.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private readonly BASE_URL = environment.apiBasePath.concat('/attachments');

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<Attachment> {
    return this.http.post<Attachment>(this.BASE_URL, formData);
  }

  downloadFile(key: string, fileName: string): Observable<Blob> {
    return this.http
      .get(this.BASE_URL.concat(`/${key}`), {
        responseType: 'blob'
      })
      .pipe(
        tap((blob) => {
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.download = fileName;
          anchor.href = url;
          anchor.click();

          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            anchor.remove();
          }, 100);
        })
      );
  }

  deleteFile(key: string): Observable<unknown> {
    return this.http.delete(this.BASE_URL.concat(`/${key}`));
  }
}
