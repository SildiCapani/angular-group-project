import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CalendarModel, UserModel } from 'src/calendar.model';

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

   createTask(newTask: Pick<CalendarModel, 'task'> ): Observable<CalendarModel> {

    const task: Pick<CalendarModel, 'task'> = {
      ...newTask
    }

    return this.httpClient.post<CalendarModel>(this.url, task)
   }

}