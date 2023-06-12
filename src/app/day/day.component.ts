import { Component } from '@angular/core';
import { CalenderService } from '../calender.service';
import { CalendarModel, TaskModel, UserModel } from 'src/calendar.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {

  calendarData: CalendarModel[] = [];
  calendarDay!: CalendarModel;
  dayId: number;

  users: UserModel[]

   constructor(private calendarService: CalenderService) {

    this.users = []
    this.dayId = 0

   }

   getCalandarData(): void {
    this.calendarService.getCalendarData().subscribe(data => this.calendarData = data);
   }

   getUsers(): void {
    this.calendarService.getUsers().subscribe(users => this.users = users )
   }

   ngOnInit(): void {
     this.getCalandarData();
     this.getUsers()
   }

}
