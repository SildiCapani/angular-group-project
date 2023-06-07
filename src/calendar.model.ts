export interface CalendarModel {
    id: number
    date: string
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