import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Config } from '../../sockets/socket';
import { Observable } from 'rxjs';
import { Board } from '../../models/board.model';
import { BoardsResponseDto } from '../../dtos/board.dto';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends Socket {
  constructor() {
    super(Config('boards'));
  }

  create(board: Board) {
    this.emit('create', board);
  }

  findAll() {
    this.emit('findAll');
  }

  update(board: Board) {
    this.emit('update', board);
  }

  onFindAll(): Observable<BoardsResponseDto[]> {
    return this.fromEvent('onFindAll');
  }

  findOne(_id: string) {
    this.emit('findOne', { _id });
  }

  onFindOne(): Observable<Board> {
    return this.fromEvent('onFindOne');
  }

  findByName(name: string) {
    this.emit('findByName', { name });
  }
}
