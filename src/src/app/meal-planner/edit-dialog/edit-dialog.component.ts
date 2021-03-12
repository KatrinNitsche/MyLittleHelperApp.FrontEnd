import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';
import { MealPlanDay } from 'src/app/models/mealPlanDay';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  mealPlanDay: MealPlanDay;

  constructor(private dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.mealPlanDay = data;
    console.log(this.mealPlanDay);
   }

  ngOnInit(): void {
  }

}
