export class ToDo {
    id: number;
    content: string;
    completed: boolean;
    important: boolean;
    dueDate: Date;
    repetitionType: number;
    created: Date;
    updated: Date;    

    isEditShow: boolean;
}

export class MonthPicker {
    year: number;
    month: number;
    monthName: string;
}