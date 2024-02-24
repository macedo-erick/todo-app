import { Component, model } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Card } from '../../models/card.model';
import { BlurEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'todo-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  card = model.required<Card>();

  editor = ClassicEditor;

  config: EditorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'fontfamily',
        'fontsize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'strikethrough',
        'subscript',
        'superscript',
        'code',
        '|',
        'link',
        'blockQuote',
        'codeBlock',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent'
      ],
      shouldNotGroupWhenFull: false
    }
  };

  handleTitleChange(innerText: string): void {
    this.card.update((card) => ({ ...card, name: innerText }));
  }

  handleDescriptionChange({ editor }: BlurEvent<ClassicEditor>): void {
    this.card.update((card) => ({ ...card, description: editor.getData() }));
  }
}
