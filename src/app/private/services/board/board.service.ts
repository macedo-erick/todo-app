import { environment } from '../../../../environments/environment.development';
import { Injectable, signal } from '@angular/core';
import { Sprint } from '../../models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  #BASE_URL = `${environment.apiBasePath}/boards`;

  isSprintModifiable = signal(true);
  activeSprint = signal({} as Sprint);

  findAll() {}
}
