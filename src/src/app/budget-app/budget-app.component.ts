import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
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
  filterYear: number;
  filterMonth: string;  

  constructor(private budgetService: BudgetService, private toastr: ToastrService) { }

  ngOnInit(): void {      
   this.InitBudgetSelector();
   this.LoadBudget()
  }

  InitBudgetSelector() {
    this.filterYear = new Date().getFullYear();
    this.filterMonth = new Date().getMonth().toString();  
  }

  LoadBudget() {
    this.budgetEntriesIncome = [];
    this.budgetEntriesExpenses = [];
    this.remainingBudget = 0;

    this.budgetService.getBudget().subscribe({
      next: budget => {
        this.budgetList = budget.filter(b => new Date(b.budgetDate).getFullYear() == this.filterYear &&  new Date(b.budgetDate).getMonth().toString() == this.filterMonth);
        this.budgetEntriesIncome =  this.budgetList.filter(b => b.amount > 0).sort((a, b) => (a.amount > b.amount) ? 1 : -1);
        this.budgetEntriesExpenses =  this.budgetList.filter(b => b.amount < 0).sort((a, b) => (a.amount > b.amount) ? 1 : -1);

        var saldo = 0;
        budget.forEach(function(bugetEntry) {
          saldo += bugetEntry.amount;
        });

        this.remainingBudget = saldo;
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  toggleEditDisplay(budgetEntry: BudgetEntry) {  
    budgetEntry.isEditShow = !budgetEntry.isEditShow;

    if (!budgetEntry.isEditShow && budgetEntry != undefined) {  
      console.log(budgetEntry);
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
