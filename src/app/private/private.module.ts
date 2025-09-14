import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

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
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatDivider } from '@angular/material/divider';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserInitialsComponent } from './components/user-initials/user-initials.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ActivityComponent } from './components/activity/activity.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { NewBoardComponent } from './components/new-board/new-board.component';

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
    TaskComponent,
    SnackBarComponent,
    UserInitialsComponent,
    CommentsComponent,
    CommentComponent,
    ActivitiesComponent,
    ActivityComponent,
    AttachmentsComponent,
    AttachmentComponent,
    NewBoardComponent
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
    MatDatepickerInput,
    MatSlideToggle,
    MatDivider,
    MatDialogClose,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContainer
  ],
  exports: [HeaderComponent],
  providers: [MatDatepickerModule]
})
export class PrivateModule {}
