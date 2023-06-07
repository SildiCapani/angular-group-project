import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
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


  addDays(startingDate: Date, numberOfDays: number): Observable<CalendarModel[]> {

    return this.getCalendarData().pipe(
      tap((calendarData: CalendarModel[]) => {
        const lastDay = calendarData[calendarData.length - 1];
        let lastId = lastDay ? lastDay.id : 0;
    
        for (let i = 0; i < numberOfDays; i++) {
          const currentDate: Date = new Date(startingDate);
          currentDate.setDate(currentDate.getDate() + i);
      
          const newDay: CalendarModel = {
            id: lastId + i + 1,
            date: currentDate.toISOString().slice(0, 24),
            task: []
          };
      
          this.httpClient.post<CalendarModel>(this.url, newDay).subscribe();
        }
      }),
      switchMap(() => this.getCalendarData())
    );
    
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