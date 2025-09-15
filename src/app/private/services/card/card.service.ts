import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CreateCardRequestDto } from '../../dtos/card.dto';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  #http = inject(HttpClient);
  #BASE_URL = `${environment.apiBasePath}/cards`;

  save(dto: CreateCardRequestDto) {
    return this.#http.post(this.#BASE_URL, dto);
  }
}
