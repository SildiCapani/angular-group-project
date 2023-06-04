import { Component } from '@angular/core';
import { CalenderService } from '../calender.service';
import { CalendarModel, UserModel } from 'src/calendar.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {

  calendarData!: CalendarModel[];

  users: UserModel[]

   constructor(private calendarService: CalenderService) {

    this.users = []

   }

   getCalandarData(): void {
    this.calendarService.getCalendarData().subscribe(data => this.calendarData = data);
   }

   getUsers(): void {
    this.calendarService.getUsers().subscribe(users => this.users = users )
   }
   
   fetchActionData(): void {
    this.calendarData.forEach(calendarEntry => {
      calendarEntry.task = calendarEntry.task;
    });
  }

   ngOnInit(): void {
     this.getCalandarData();
     this.getUsers()
   }

}
