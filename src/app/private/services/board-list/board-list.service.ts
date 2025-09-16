import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { BoardList } from '../../models/board-list.model';
import { BoardListCreateRequest } from '../../dtos/board-list.dto';
import { CardCreateRequest, CardResponse } from '../../dtos/card.dto';

@Injectable({
  providedIn: 'root'
})
export class BoardListService {
  #http = inject(HttpClient);
  #BASE_URL = `${environment.apiBasePath}/board-lists`;

  save(boardList: BoardListCreateRequest): Observable<BoardList> {
    return this.#http.post<BoardList>(this.#BASE_URL, boardList);
  }

  update(id: number, boardList: BoardListCreateRequest): Observable<BoardList> {
    return this.#http.patch<BoardList>(`${this.#BASE_URL}/${id}`, boardList);
  }

  saveCard(boardListId: number, request: CardCreateRequest) {
    return this.#http.post(`${this.#BASE_URL}/${boardListId}/cards`, request);
  }

  getCards(id: number): Observable<CardResponse[]> {
    let params = new HttpParams();

    params = params.set('sort', 'position,asc');

    return this.#http.get<CardResponse[]>(`${this.#BASE_URL}/${id}/cards`, {
      params
    });
  }
}
