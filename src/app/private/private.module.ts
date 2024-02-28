import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatNativeDateModule,
  MatOption,
  MatRipple
} from '@angular/material/core';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { ListComponent } from './components/list/list.component';
import {
  MatButton,
  MatIconButton,
  MatMiniFabButton
} from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { MatIcon } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChip } from '@angular/material/chips';
import { HeaderComponent } from './components/header/header.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatPrefix,
  MatSuffix
} from '@angular/material/input';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { MatDialogContent } from '@angular/material/dialog';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { BoardComponent as BoardPage } from './pages/board/board.component';
import { BoardComponent as BoardComponent } from './components/board/board.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TaskComponent } from './components/task/task.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDatepickerToggleIcon
} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    HomeComponent,
    BoardComponent,
    BoardPage,
    BoardCardComponent,
    ListComponent,
    CardComponent,
    HeaderComponent,
    CardDetailComponent,
    ChecklistComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatCard,
    MatCardTitle,
    MatRipple,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatIcon,
    MatButton,
    DragDropModule,
    MatCardFooter,
    MatChip,
    MatMiniFabButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatCardSubtitle,
    MatInput,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatDialogContent,
    CKEditorModule,
    FormsModule,
    MatProgressBar,
    MatCheckbox,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepickerToggleIcon,
    MatDatepicker,
    MatDatepickerInput
  ],
  exports: [HeaderComponent],
  providers: [MatDatepickerModule]
})
export class PrivateModule {}
