import { environment } from '../../../../environments/environment.development';
import { inject, Injectable, signal } from '@angular/core';
import { Sprint } from '../../models/sprint.model';
import { Board } from '../../models/board.model';
import { BoardCreateRequest } from '../../dtos/board.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BoardListCreateRequest,
  BoardListResponse
} from '../../dtos/board-list.dto';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  #http = inject(HttpClient);
  #BASE_URL = `${environment.apiBasePath}/boards`;

  isSprintModifiable = signal(true);
  activeSprint = signal({} as Sprint);

  save(request: BoardCreateRequest): Observable<Board> {
    return this.#http.post<Board>(this.#BASE_URL, request);
  }

  findByName(name: string) {
    return this.#http.get(this.#BASE_URL, { params: { name } });
  }

  find(id: number): Observable<Board> {
    return this.#http.get<Board>(`${this.#BASE_URL}/${id}`);
  }

  update(board: Board) {
    return this.#http.patch<Board>(`${this.#BASE_URL}`, board);
  }

  saveList(boardId: number, request: BoardListCreateRequest) {
    return this.#http.post<BoardListResponse>(
      `${this.#BASE_URL}/${boardId}/lists`,
      request
    );
  }

  findLists(boardId: number): Observable<BoardListResponse[]> {
    return this.#http.get<BoardListResponse[]>(
      `${this.#BASE_URL}/${boardId}/lists`
    );
  }
}
