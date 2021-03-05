import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BudgetEntry } from '../models/budgetEntry';
import { MonthPicker } from '../models/Todo';
import { BudgetService } from '../services/budget-service.service';

@Component({
  selector: 'app-budget-app',
  templateUrl: './budget-app.component.html',
  styleUrls: ['./budget-app.component.css']
})
export class BudgetAppComponent implements OnInit {

  budgetList: BudgetEntry[];
  budgetEntriesIncome: BudgetEntry[];
  budgetEntriesExpenses: BudgetEntry[];
  monthPickerList: MonthPicker[];
 
  remainingBudget: number = 0;
  inputAmount: number = 0;
  inputDescription: string = "";
  inputBudgetDate: Date;

  constructor(private budgetService: BudgetService, private toastr: ToastrService) { }

  ngOnInit(): void {    
   this.LoadBudget();
  }

  InitMonthPickerList() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    this.monthPickerList = [];

    var list =[];
    this.budgetList.forEach(function(budget) {
      var date = new Date( budget.budgetDate);
      var newEntry = new MonthPicker();
      newEntry.month = date.getMonth() + 1;
      newEntry.year = date.getFullYear();
      newEntry.monthName = monthNames[newEntry.month];

      var check = list.filter(mp => mp.month == newEntry.month && mp.year == newEntry.year);     
      if (check.length == 0) {      
        list.push(newEntry);
      }

    });
   
    this.monthPickerList = list;

    console.log(this.monthPickerList);
  }

  LoadBudget() {
    this.budgetEntriesIncome = [];
    this.budgetEntriesExpenses = [];
    this.remainingBudget = 0;

    this.budgetService.getBudget().subscribe({
      next: budget => {
        this.budgetList = budget;
        this.budgetEntriesIncome = budget.filter(b => b.amount > 0).sort((a, b) => (a.amount > b.amount) ? 1 : -1);;
        this.budgetEntriesExpenses = budget.filter(b => b.amount < 0).sort((a, b) => (a.amount > b.amount) ? 1 : -1);;

        var saldo = 0;
        budget.forEach(function(bugetEntry) {
          saldo += bugetEntry.amount;
        });

        this.remainingBudget = saldo;
        this.InitMonthPickerList();
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  toggleEditDisplay(budgetEntry: BudgetEntry) {  
    budgetEntry.isEditShow = !budgetEntry.isEditShow;

    if (!budgetEntry.isEditShow && budgetEntry != undefined) {     
      this.budgetService.updateBudget(budgetEntry).subscribe();
    }
  }

  addBudgetEntry() {
    
    var newBudgetEntry = {
      id: 0,
      description: this.inputDescription,
      amount: this.inputAmount,
      budgetDate: this.inputBudgetDate,   
      created: new Date(),
      updated: new Date(),
      isEditShow: false
    }

    this.budgetService.addBudget(newBudgetEntry).subscribe({
      next: budgetEntry => {
        this.LoadBudget();
        this.inputDescription = "";
        this.inputAmount = 0;
        this.toastr.info(budgetEntry.description + " was added.");
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  removeBudgetEntry(id) {
    this.budgetService.removeBudget(id).subscribe({
      next: budgetEntry => {
        this.LoadBudget();
        this.toastr.info(budgetEntry.description + " was removed");
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }
}
