export class ToDo {
    id: number;
    content: string;
    completed: boolean;
    important: boolean;
    categoryId: number;
    dueDate: Date;
    repetitionType: number;
    created: Date;
    updated: Date;    

    isEditShow: boolean;
    categoryColour: string;
}

export class MonthPicker {
    year: number;
    month: number;
    monthName: string;
}