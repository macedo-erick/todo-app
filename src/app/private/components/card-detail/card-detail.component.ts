import { AfterViewInit, Component, model, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card } from '../../models/card.model';
import { Checklist } from '../../models/checklist.model';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { editorConfig } from '../../../util/util';

@Component({
  selector: 'todo-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent implements AfterViewInit {
  card = model.required<Card>();

  @ViewChild('cardForm', { static: false }) cardForm!: NgForm;

  editor = ClassicEditor;
  config = editorConfig;

  ngAfterViewInit(): void {
    this.cardForm.valueChanges
      ?.pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(({ name, description }: Card) =>
        this.card.update((current) => ({ ...current, name, description }))
      );
  }

  checklistChange(checklist: Checklist) {
    this.card.update((card) => ({ ...card, checklist }));
  }

  teste(event: Event) {
    console.log(event);
  }
}
