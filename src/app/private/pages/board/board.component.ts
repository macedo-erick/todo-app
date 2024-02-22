import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board/board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { List } from '../../models/list.model';
import { Board } from '../../models/board.model';

@Component({
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  board!: Board;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.boardService.findOne(id);
      this.boardService.onFindOne().subscribe(board => {
        this.board = board;
      });
    });
  }

  drop(event: CdkDragDrop<List>) {
    moveItemInArray(this.board.lists, event.previousIndex, event.currentIndex);
    this.updateBoard();
  }

  updateBoard() {
    this.boardService.update(this.board);
  }
}
