import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender.service';
import { CalendarModel } from 'src/calendar.model';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  
  calendarData!: CalendarModel[];

  
  constructor(private calendarService: CalenderService) {

  }

  addDays(): void {
    const startingDate = new Date(); // Set the starting date
    const numberOfDays = 10; // Set the number of days to add

    this.calendarService.addDays(startingDate, numberOfDays).subscribe((addedDays) => {
     console.log('Days added:', addedDays);
});
  }


  ngOnInit(): void {
    this.calendarService.getCalendarData().subscribe(data => this.calendarData = data);
  }

}
