export class MealPlanDay {
    id: number;
    weekDayName: string;
    comment: string;
    meals: Meal[];
}

export class Meal {
    id: number;
    mealName: string;
    comment: string;
    duration: Date;
}