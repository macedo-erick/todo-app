import { Component, computed, model } from '@angular/core';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'todo-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
  standalone: true,
  imports: []
})
export class ActivityComponent {
  activity = model.required<Activity>();

  evaluateAuthorInitials = computed(() => {
    return '';
    // const author = this.activity().author;
    // const [firstName, lastName] = author.split(/\s+/g);
    //
    // return firstName.charAt(0).concat(lastName.charAt(0)).toUpperCase();
  });
}
