import { Component, ElementRef, model, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card } from '../../models/card.model';
import { BlurEvent } from '@ckeditor/ckeditor5-angular';
import { Checklist } from '../../models/checklist.model';
import { editorConfig } from '../../../util/util';

@Component({
  selector: 'todo-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  card = model.required<Card>();

  editor = ClassicEditor;
  config = editorConfig;

  @ViewChild('cardName') cardName!: ElementRef<HTMLHeadingElement>;

  onNameChange(): void {
    const { innerText } = this.cardName.nativeElement;

    this.card.update((card) => ({ ...card, name: innerText.trim() }));
  }

  onDescriptionChange({ editor }: BlurEvent<ClassicEditor>): void {
    this.card.update((card) => ({ ...card, description: editor.getData() }));
  }

  onChecklistChange(checklist: Checklist) {
    this.card.update((card) => ({ ...card, checklist }));
  }
}
