import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MealPlanDay } from 'src/app/models/mealPlanDay';
import { MealPlanService } from 'src/app/services/meal-plan-service.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  mealPlanDay: MealPlanDay;

  constructor(private mealPlanSercvice: MealPlanService, private toastr: ToastrService,  private dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.mealPlanDay = data;    
   }

  ngOnInit(): void {
  }

  saveMealPlanDay(mealPlanDay: MealPlanDay) {
    this.mealPlanSercvice.updatePlan(mealPlanDay).subscribe({ 
      next: data => {
        this.mealPlanDay = data;
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }
}
