export class MealPlanDay {
    id: number;
    weekDayname: string;
    comment: string;
    meals: Meal[];
}

export class Meal {
    id: number;
    mealName: string;
    comment: string;
    duration: Date;
}