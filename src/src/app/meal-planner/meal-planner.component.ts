import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Meal, MealPlanDay } from '../models/mealPlanDay';
import { MealPlanService } from '../services/meal-plan-service.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit {

  week: any[];
  toCopyMeal: Meal = null;

  constructor(private mealPlanSercvice: MealPlanService, private toastr: ToastrService, private editDialog: MatDialog) { }

  ngOnInit(): void {
   this.LoadMealPlan();
  }

  LoadMealPlan() {
     this.week = [];   
     this.mealPlanSercvice.getPlan().subscribe({
       next: mealPlan => {
         this.week = mealPlan;
       },
       error: err => {
         this.toastr.error(err);
       }
     });
  }

  editMealPlanDay(mealPlanDay: MealPlanDay) {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = mealPlanDay;
    
    this.editDialog.open(EditDialogComponent, dialogConfig);
  }

  copyMeal(meal: Meal) {
    this.toCopyMeal = meal;
  }

  addMeal(targetMeal: Meal, targetDay: MealPlanDay) {

    targetMeal.comment = this.toCopyMeal.comment;
    targetMeal.duration = this.toCopyMeal.duration;
    targetMeal.mealName = this.toCopyMeal.mealName;   

    this.mealPlanSercvice.updatePlan(targetDay).subscribe({
      next: day => {
      },
      error: err => {
        this.toastr.error(err);
      }
    });

    this.toCopyMeal = null;
  }

}
