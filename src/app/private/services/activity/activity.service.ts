import { inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  userService = inject(UserService);

  // create(description: string): Activity {
  //   return {
  //     author: this.userService.getLoggedUser(),
  //     createdDate: new Date(),
  //     description: description
  //   };
  // }
}
