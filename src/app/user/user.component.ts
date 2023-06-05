import { Component } from '@angular/core';
import { UserModel } from 'src/calendar.model';
import { CalenderService } from '../calender.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent {

  private id?: number;
  firstName: string;
  lastName: string;
  tel: string;

  addMode: boolean;
  users: UserModel[];

  
  constructor(private userService: CalenderService) {
    this.firstName = '';
    this.lastName = '';
    this.tel = '';
    this.users = [];

    this.addMode = false;
  }

  onClose(): void {
    this.addMode = false;
  }

  onAdd(): void {
    this.addMode = true;
  }

  onSave(event: SubmitEvent): void {
    event.preventDefault();

    if (this.id) {
      // this.userService.editUser({
      //   id: this.id,
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   age: this.age,
      //   active: true
      // })
      //   .pipe(
      //     tap((user) => {
      //       const editedUserIndex: number = this.users.findIndex(user => user.id === this.id);
      //       this.users[editedUserIndex] = user;
      //     }),
      //     tap(() => {
      //       this.id = undefined;
      //       this.firstName = '';
      //       this.lastName = '';
      //       this.age = 0;
      //     })
      //   )
      //   .subscribe();
    } else {
      this.userService
        .createUser({
          firstName: this.firstName,
          lastName: this.lastName,
          tel: this.tel
        })
        .pipe(
          tap(() => {
            this.firstName = '';
            this.lastName = '';
            this.tel = '';
          })
          // 3: use switchMap to change observable 
          // switchMap(() => {
          //   return this.userService.getUsers(this.search);
          // })
        )
        .subscribe((user) => this.users.push(user)); // 4: optimal solution
    }
  }


}
