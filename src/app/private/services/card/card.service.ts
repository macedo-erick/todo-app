import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CardCreateRequest, CardResponse } from '../../dtos/card.dto';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  #http = inject(HttpClient);
  #BASE_URL = `${environment.apiBasePath}/cards`;

  save(dto: CardCreateRequest) {
    return this.#http.post(this.#BASE_URL, dto);
  }

  findById(id: number) {
    return this.#http.get<CardResponse>(`${this.#BASE_URL}/${id}`);
  }
}
