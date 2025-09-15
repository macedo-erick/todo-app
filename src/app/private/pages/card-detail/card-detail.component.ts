import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailComponent as CardDetailDialogComponent } from '../../components/card-detail/card-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  template: '',
  standalone: true
})
export class CardDetailComponent implements OnInit {
  #dialogService = inject(MatDialog);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  ngOnInit(): void {
    const cardId = Number(this.#route.snapshot.paramMap.get('cardId'));

    const dialogRef = this.#dialogService.open(CardDetailDialogComponent, {
      data: { cardId },
      width: '55rem',
      height: '50rem',
      autoFocus: 'dialog',
      panelClass: 'bg__slate__gray'
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap(() => {
          void this.#router.navigate(['../'], {
            relativeTo: this.#route,
            replaceUrl: true
          });
        })
      )
      .subscribe();
  }
}
