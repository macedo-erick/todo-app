import { Component, computed, model } from '@angular/core';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'todo-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
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
