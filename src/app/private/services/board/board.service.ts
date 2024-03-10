import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Config } from '../../sockets/socket';
import { Observable } from 'rxjs';
import { Board } from '../../models/board.model';
import { BoardsResponseDto } from '../../dtos/board.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends Socket {
  constructor() {
    super(Config(environment.wsUrl, environment.wsBasePath, 'boards'));
  }

  create(board: Board) {
    this.emit('create', board);
  }

  update(board: Board) {
    this.emit('update', board);
  }

  findAll() {
    this.emit('findAll');
  }

  findOne(_id: string) {
    this.emit('findOne', { _id });
  }

  findByName(name: string) {
    this.emit('findByName', { name });
  }

  onFindAll(): Observable<BoardsResponseDto[]> {
    return this.fromEvent('onFindAll');
  }

  onFindOne(): Observable<Board> {
    return this.fromEvent('onFindOne');
  }
}
