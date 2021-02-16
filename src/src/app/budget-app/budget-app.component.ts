import { Component, OnInit } from '@angular/core';
import { budgetEntry } from '../models/budgetEntry';

@Component({
  selector: 'app-budget-app',
  templateUrl: './budget-app.component.html',
  styleUrls: ['./budget-app.component.css']
})
export class BudgetAppComponent implements OnInit {

  budgetEntriesIncome: budgetEntry[];
  budgetEntriesExpenses: budgetEntry[];

  remainingBudget: number = 0;
  inputAmount: number = 0;
  inputDescription: string = "";

  constructor() { }

  ngOnInit(): void {    
    this.budgetEntriesIncome = [];
    this.budgetEntriesExpenses = [];
  }

  addBudgetEntry() {
    
    if (this.inputAmount > 0)
    {
        this.budgetEntriesIncome.push( {
        description: this.inputDescription,
        amount: this.inputAmount,
        });
        
    } else {
        this.budgetEntriesExpenses.push( {
          description: this.inputDescription,
          amount: this.inputAmount,
        });
    }
    
    this.remainingBudget += this.inputAmount;
    this.inputDescription = "";
    this.inputAmount = 0;
  }

  removeBudgetEntryIncome(id) {
    this.budgetEntriesIncome = this.budgetEntriesIncome.filter((v,i) => i !== id);
  }

  removeBudgetEntryExpense(id) {
    this.budgetEntriesExpenses = this.budgetEntriesExpenses.filter((v,i) => i !== id);
  }
}
