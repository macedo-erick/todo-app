import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Config } from '../../sockets/socket';
import { Observable } from 'rxjs';
import { Board } from '../../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends Socket {
  constructor() {
    super(Config('boards'));
  }

  findAll() {
    this.emit('findAll');
  }

  update(board: Board) {
    this.emit('update', board);
  }

  onFindAll(): Observable<Board[]> {
    return this.fromEvent('onFindAll');
  }

  findOne(_id: string) {
    this.emit('findOne', { _id });
  }

  onFindOne(): Observable<Board> {
    return this.fromEvent('onFindOne');
  }
}
