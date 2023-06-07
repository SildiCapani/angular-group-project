import { Component, EventEmitter, Output } from '@angular/core';
import { CalendarModel, TaskModel, UserModel } from 'src/calendar.model';
import { CalenderService } from '../calender.service';
import { tap } from 'rxjs';

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

  addMode: boolean;

  @Output() taskAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private calendarService: CalenderService) {
   this.users = [];
   this.task = [];
   this.selectedNameTask ='';
   this.selectedTimeTask = '';
   this.selectedUser = 0;
   this.addMode = false
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

   onAdd(): void {
    this.addMode = true
   }

   onClose(): void {
    this.addMode = false
   }

   onSubmit(): void {
    const newTask: TaskModel = {
      actionName: this.selectedNameTask,
      time: this.selectedTimeTask,
      userId: Number(this.selectedUser)
    };
  
    if (!this.selectedDay.task) {
      this.selectedDay.task = []; // Initialize tasks array if it doesn't exist
    }
    this.selectedDay.task?.push(newTask); // Add the new task to the tasks array
  
    this.calendarService.createTask(this.selectedDay).pipe(tap( () => {
      this.calendarData = []
      this.selectedNameTask ='';
      this.selectedTimeTask = '';
      this.selectedUser = 0;
    }
    )).subscribe((task) => {
      this.task.push(task)
    });

}

}
