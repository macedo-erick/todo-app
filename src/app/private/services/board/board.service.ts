import { environment } from '../../../../environments/environment.development';
import { inject, Injectable, signal } from '@angular/core';
import { Sprint } from '../../models/sprint.model';
import { Board } from '../../models/board.model';
import { CreateBoardRequestDto } from '../../dtos/board.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardListResponseDto } from '../../dtos/board-list.dto';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  #http = inject(HttpClient);
  #BASE_URL = `${environment.apiBasePath}/boards`;

  isSprintModifiable = signal(true);
  activeSprint = signal({} as Sprint);

  save(dto: CreateBoardRequestDto): Observable<Board> {
    return this.#http.post<Board>(this.#BASE_URL, dto);
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

  getLists(boardId: number): Observable<BoardListResponseDto[]> {
    return this.#http.get<BoardListResponseDto[]>(
      `${this.#BASE_URL}/${boardId}/lists`
    );
  }
}
