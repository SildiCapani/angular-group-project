export interface CalendarModel {
    userId(userId: any): unknown;
    year: number,
    month: string,
    day_number: number,
    day_name: string,
    task?: {
        actionName: string,
        time: string,
        userId: number,
    }
}

export interface UserModel {
    id: number,
    firstName: string,
    lastName: string,
    tel: string
}