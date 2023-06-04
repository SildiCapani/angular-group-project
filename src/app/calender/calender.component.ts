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



  ngOnInit(): void {
    this.calendarService.getCalendarData().subscribe(data => this.calendarData = data);
  }

}
