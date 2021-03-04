import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BudgetEntry } from '../models/budgetEntry';
import { BudgetService } from '../services/budget-service.service';

@Component({
  selector: 'app-budget-app',
  templateUrl: './budget-app.component.html',
  styleUrls: ['./budget-app.component.css']
})
export class BudgetAppComponent implements OnInit {

  budgetEntriesIncome: BudgetEntry[];
  budgetEntriesExpenses: BudgetEntry[];

  remainingBudget: number = 0;
  inputAmount: number = 0;
  inputDescription: string = "";
  inputBudgetDate: Date;

  constructor(private budgetService: BudgetService, private toastr: ToastrService) { }

  ngOnInit(): void {    
   this.LoadBudget();
  }

  LoadBudget() {
    this.budgetEntriesIncome = [];
    this.budgetEntriesExpenses = [];
    this.remainingBudget = 0;

    this.budgetService.getBudget().subscribe({
      next: budget => {
        this.budgetEntriesIncome = budget.filter(b => b.amount > 0);
        this.budgetEntriesExpenses = budget.filter(b => b.amount < 0);

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

  addBudgetEntry() {
    
    var newBudgetEntry = {
      id: 0,
      description: this.inputDescription,
      amount: this.inputAmount,
      budgetDate: this.inputBudgetDate,   
      created: new Date(),
      updated: new Date() 
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
