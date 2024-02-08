import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Config} from '../../sockets/socket';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends Socket {

  constructor() {
    super(Config('boards'))
  }

  findAll() {
    this.emit('findAll')
  }

  onFindAll(): Observable<any[]> {
    return this.fromEvent('onFindAll');
  }

  findOne(id: string) {
    this.emit('findOne', { id })
  }

  onFindOne() {
    return this.fromEvent('onFindOne')
  }
}
