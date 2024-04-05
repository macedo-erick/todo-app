import { computed, Injectable, signal } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Config } from '../../sockets/socket';
import { Observable, tap } from 'rxjs';
import { Board } from '../../models/board.model';
import { BoardsResponseDto } from '../../dtos/board.dto';
import { environment } from '../../../../environments/environment';
import { SprintStatus } from '../../enums/sprint-status';
import { Sprint } from '../../models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends Socket {
  activeSprint = signal<Sprint>({} as Sprint);
  sprints = signal<Sprint[]>([]);
  isSprintModifiable = computed(() => {
    return [SprintStatus.ACTIVE, SprintStatus.PENDING].includes(
      this.activeSprint().status
    );
  });

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
    return this.fromEvent<Board>('onFindOne').pipe(
      tap((res) => {
        this.sprints.update(() => res.sprints);
        this.activeSprint.update(
          () =>
            res.sprints.find(
              (sprint) => sprint.status === SprintStatus.ACTIVE
            ) as Sprint
        );
      })
    );
  }
}
