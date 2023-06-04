import { Component, OnInit  } from '@angular/core';
import { CalenderService } from './calender.service';

interface CalendarDay {
  day: number | null;
  dayOfWeek: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
}
