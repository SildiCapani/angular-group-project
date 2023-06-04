import { Component, EventEmitter, Output } from '@angular/core';
import { CalendarModel, TaskModel, UserModel } from 'src/calendar.model';
import { CalenderService } from '../calender.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})


export class TaskFormComponent {

  selectedNameTask: string;
  selectedTimeTask: string;
  selectedUser: number;
  selectedDay!: CalendarModel;

  users: UserModel[];
  task: CalendarModel[];
  calendarData!: CalendarModel[];

  @Output() taskAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private calendarService: CalenderService) {
   this.users = [];
   this.task = [];
   this.selectedNameTask ='';
   this.selectedTimeTask = '';
   this.selectedUser = 0;
  }

  ngOnInit(): void {
    this.getUsers();
    this.getCalandarData();
  }
   
  getUsers(): void {
    this.calendarService.getUsers().subscribe(users => {
      this.users = users;
      this.selectedUser = this.users[0].id;
    });
   }

   getCalandarData(): void {
    this.calendarService.getCalendarData().subscribe(data => {
      this.calendarData = data
    
    });
   }


   onSubmit(): void {

    const taskData = {
      day: this.selectedDay,
      actionName: this.selectedNameTask,
      time: this.selectedTimeTask,
      userId: this.selectedUser
    };

     this.calendarService.createTask({
      id: this.selectedDay.id, // Assuming the selected day has an 'id' property
      year: this.selectedDay.year,
      month: this.selectedDay.month,
      day_number: this.selectedDay.day_number,
      day_name: this.selectedDay.day_name,
      task: {
        actionName: this.selectedNameTask,
        time: this.selectedTimeTask,
        userId: this.selectedUser
      }
      
 }).subscribe((task) => this.task.push(task))
    
  }


}
