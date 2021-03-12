import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit {

  editMode: boolean = false;
  week: any[];

  constructor() { }

  ngOnInit(): void {
    this.week = [];
    this.week.push({
      weekDayName: "Monday",
      comment: "comment of the day...",
      meals: [{
        mealName: "Meal 1",
        comment: "comment for meal 1",
        hours: 0,
        minutes: 20
      },
      {
        mealName: "Meal 2",
        comment: "comment for meal 2",
        hours: 1,
        minutes: 15
      },
      {
        mealName: "Meal 3",
        comment: "comment for meal 3",
        hours: 0,
        minutes: 45
      }]
    });
    this.week.push({
      weekDayName: "Tuesday",
      comment: "comment of the day...",
      meals: [{
        mealName: "Meal 1",
        comment: "comment for meal 1",
        hours: 0,
        minutes: 20
      },
      {
        mealName: "Meal 2",
        comment: "comment for meal 2",
        hours: 1,
        minutes: 15
      },
      {
        mealName: "Meal 3",
        comment: "comment for meal 3",
        hours: 0,
        minutes: 45
      }]
    });
    this.week.push({
      weekDayName: "Wednesday",
      comment: "comment of the day...",
      meals: [{
        mealName: "Meal 1",
        comment: "comment for meal 1",
        hours: 0,
        minutes: 20
      },
      {
        mealName: "Meal 2",
        comment: "comment for meal 2",
        hours: 1,
        minutes: 15
      },
      {
        mealName: "Meal 3",
        comment: "comment for meal 3",
        hours: 0,
        minutes: 45
      }]
    });
    this.week.push({
      weekDayName: "Thursday",
      comment: "comment of the day...",
      meals: [{
        mealName: "Meal 1",
        comment: "comment for meal 1",
        hours: 0,
        minutes: 20
      },
      {
        mealName: "Meal 2",
        comment: "comment for meal 2",
        hours: 1,
        minutes: 15
      },
      {
        mealName: "Meal 3",
        comment: "comment for meal 3",
        hours: 0,
        minutes: 45
      }]
    });
    this.week.push({
      weekDayName: "Friday",
      comment: "comment of the day...",
      meals: [{
        mealName: "Meal 1",
        comment: "comment for meal 1",
        hours: 0,
        minutes: 20
      },
      {
        mealName: "Meal 2",
        comment: "comment for meal 2",
        hours: 1,
        minutes: 15
      },
      {
        mealName: "Meal 3",
        comment: "comment for meal 3",
        hours: 0,
        minutes: 45
      }]
    });
    this.week.push({
      weekDayName: "Saturday",
      comment: "comment of the day...",
      meals: [{
        mealName: "Meal 1",
        comment: "comment for meal 1",
        hours: 0,
        minutes: 20
      },
      {
        mealName: "Meal 2",
        comment: "comment for meal 2",
        hours: 1,
        minutes: 15
      },
      {
        mealName: "Meal 3",
        comment: "comment for meal 3",
        hours: 0,
        minutes: 45
      }]
    });
    this.week.push({
      weekDayName: "Sunday",
      comment: "comment of the day...",
      meals: [{
        mealName: "Meal 1",
        comment: "comment for meal 1",
        hours: 0,
        minutes: 20
      },
      {
        mealName: "Meal 2",
        comment: "comment for meal 2",
        hours: 1,
        minutes: 15
      },
      {
        mealName: "Meal 3",
        comment: "comment for meal 3",
        hours: 0,
        minutes: 45
      }]
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

}
