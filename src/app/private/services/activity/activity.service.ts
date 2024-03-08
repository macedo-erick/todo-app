import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Activity } from '../../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private userService: UserService) {}

  create(description: string): Activity {
    return {
      author: this.userService.getLoggedUser(),
      createdDate: new Date(),
      description: description
    };
  }
}
