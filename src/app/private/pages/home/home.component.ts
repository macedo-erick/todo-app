import { Component, inject, OnInit, signal } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SprintStatus } from '../../enums/sprint-status';
import { v4 as uuidv4 } from 'uuid';
import { addDays } from 'date-fns';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  boardService = inject(BoardService);

  boards = toSignal(this.boardService.onFindAll(), { initialValue: [] });
  loaded = signal(() => this.boards());

  searchInput = new FormControl('');

  ngOnInit(): void {
    this.boardService.findAll();
    this.handleInputChange();
  }

  handleInputChange(): void {
    this.searchInput.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(200))
      .subscribe((q) => {
        this.boardService.findByName(String(q));
      });
  }

  newBoard(): void {
    /**
     * Todo: Remove automatic sprint creation after board management
     */

    this.boardService.create({
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
    });
  }
}
