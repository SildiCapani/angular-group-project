import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { CalendarModel, TaskModel, UserModel } from 'src/calendar.model';

@Injectable({
  providedIn: 'root'
})


export class CalenderService {
   private readonly url: string;
   private readonly userUrl: string;

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.baseUrl}/calendar`;
    this.userUrl = `${environment.baseUrl}/users`;
   }

  
  
   getCalendarData(): Observable<CalendarModel[]> {
     return this.httpClient.get<CalendarModel[]>(
       this.url
     );
   }

   getUsers() : Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(
      this.userUrl
    );
   }

   createTask(newTask: CalendarModel ): Observable<CalendarModel> {

    const task: CalendarModel  = {
      ...newTask
    }
    return this.httpClient.put<CalendarModel>(`${this.url}/${newTask.id}`, newTask)
   }

   createUser(
    newUser: Omit<UserModel, 'id'>
  ): Observable<UserModel> {

    const user: Omit<UserModel, 'id'> = {
      ...newUser,
    };
    
    return this.httpClient.post<UserModel>(this.userUrl, user);
  }


}