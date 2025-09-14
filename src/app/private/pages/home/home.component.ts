import { Component, inject, OnInit, signal } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardComponent } from '../../components/new-board/new-board.component';
import { Board } from '../../models/board.model';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchInput = new FormControl('');
  loaded = signal(() => this.boards());
  #boardService = inject(BoardService);
  boards = toSignal(this.#boardService.onFindAll(), { initialValue: [] });
  #dialogService = inject(MatDialog);

  ngOnInit(): void {
    this.#boardService.findAll();
    this.handleInputChange();

    this.newBoard();
  }

  handleInputChange(): void {
    this.searchInput.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(200))
      .subscribe((q) => {
        this.#boardService.findByName(String(q));
      });
  }

  newBoard(): void {
    /**
     * Todo: Remove automatic sprint creation after board management
     */

    const dialog = this.#dialogService.open(NewBoardComponent, {
      disableClose: true
    });

    dialog
      .afterClosed()
      .pipe(tap((res: Board) => console.log(res)))
      .subscribe();

    /*    this.boardService.create({
      name: 'New Board',
      lists: [],
      sprints: [
        {
          status: SprintStatus.ACTIVE,
          id: uuidv4(),
          startDate: new Date(),
          endDate: addDays(new Date(), 15)
        }
      ]
    });*/
  }
}
