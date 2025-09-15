import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { BoardList } from '../../models/board-list.model';
import { CreateBoardListRequestDto } from '../../dtos/board-list.dto';
import { CardResponseDto } from '../../dtos/card.dto';

@Injectable({
  providedIn: 'root'
})
export class BoardListService {
  #http = inject(HttpClient);
  #BASE_URL = `${environment.apiBasePath}/board-lists`;

  save(boardList: CreateBoardListRequestDto): Observable<BoardList> {
    return this.#http.post<BoardList>(this.#BASE_URL, boardList);
  }

  update(boardList: CreateBoardListRequestDto): Observable<BoardList> {
    return this.#http.patch<BoardList>(this.#BASE_URL, boardList);
  }

  getCards(id: number): Observable<CardResponseDto[]> {
    return this.#http.get<CardResponseDto[]>(`${this.#BASE_URL}/${id}/cards`);
  }
}
