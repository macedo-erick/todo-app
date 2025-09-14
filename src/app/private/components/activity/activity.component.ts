import { Component, computed, model } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { DatePipe } from '@angular/common';
import { UserInitialsComponent } from '../user-initials/user-initials.component';

@Component({
  selector: 'todo-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
  standalone: true,
  imports: [UserInitialsComponent, DatePipe]
})
export class ActivityComponent {
  activity = model.required<Activity>();

  evaluateAuthorInitials = computed(() => {
    const author = this.activity().author;
    const [firstName, lastName] = author.split(/\s+/g);

    return firstName.charAt(0).concat(lastName.charAt(0)).toUpperCase();
  });
}
