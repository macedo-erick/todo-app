import { Component, computed, model } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'todo-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
  standalone: true,
  imports: [ActivityComponent]
})
export class ActivitiesComponent {
  activities = model.required<Activity[]>();

  sortedActivities = computed(() => {
    return this.activities().sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  });
}
