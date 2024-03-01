import { EditorConfig } from '@ckeditor/ckeditor5-core';

const editorConfig: EditorConfig = {
  typing: {
    transformations: {
      include: [
        'oneHalf',
        'oneForth',
        'notEqual',
        'arrowLeft',
        'arrowRight',
        'lessThanOrEqual',
        'greaterThanOrEqual'
      ]
    }
  },
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent',
      'insertTable'
    ]
  }
};

export { editorConfig };
