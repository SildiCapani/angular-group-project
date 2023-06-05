export interface CalendarModel {
    id: number
    year: number,
    month: string,
    day_number: number,
    day_name: string,
    task?: TaskModel[]
}

export interface TaskModel {
    actionName: string;
    time: string;
    userId: number;
  }

export interface UserModel {
    id: number,
    firstName: string,
    lastName: string,
    tel: string
}