import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { CardResponseDto } from '../private/dtos/card.dto';

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

export function tokenGetter() {
  return localStorage.getItem('SESSION');
}

function round6(n: number) {
  return Math.round(n * 1e6) / 1e6;
}

function computePosition(arr: CardResponseDto[], index: number): number {
  const GAP = 100;
  const prev = index > 0 ? arr[index - 1].position : undefined;
  const next = index < arr.length - 1 ? arr[index + 1].position : undefined;

  if (prev != null && next != null && prev !== next)
    return round6((prev + next) / 2);
  if (prev == null && next != null) return round6(next - GAP);
  if (prev != null && next == null) return round6(prev + GAP);
  return GAP;
}

export { editorConfig, computePosition };
