import { Component, inject, OnInit, signal } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, EMPTY, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewBoardComponent } from '../../components/new-board/new-board.component';
import { MatButton } from '@angular/material/button';
import { BoardCardComponent } from '../../components/board-card/board-card.component';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { UserService } from '../../services/user/user.service';
import { Page } from '../../dtos/page.dto';
import { BoardResponseDto, CreateBoardRequestDto } from '../../dtos/board.dto';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    BoardCardComponent,
    MatButton
  ]
})
export class HomeComponent implements OnInit {
  #boardService = inject(BoardService);
  #userService = inject(UserService);

  searchInput = new FormControl('');

  loaded = signal(() => this.boards());

  boards = toSignal(this.#userService.findAllBoards(), {
    initialValue: new Page<BoardResponseDto>()
  });
  #dialogService = inject(MatDialog);

  ngOnInit(): void {
    this.handleInputChange();
  }

  handleInputChange(): void {
    this.searchInput.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(200))
      .subscribe((q) => {
        this.#boardService.findByName(String(q));
      });
  }

  saveBoard(): void {
    const dialog = this.#dialogService.open(NewBoardComponent, {
      disableClose: true
    });

    dialog
      .afterClosed()
      .pipe(
        switchMap(({ prefix, ...req }: CreateBoardRequestDto) => {
          if (req) {
            return this.#boardService.save({
              ...req,
              prefix: prefix.toUpperCase()
            });
          }

          return EMPTY;
        })
      )
      .subscribe();
  }
}
