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
  currency: string;

  remainingBudget: number = 0;
  sumIncome: number = 0;
  sumExpenses: number = 0;
  inputAmount: number = 0;
  inputDescription: string = "";
  inputBudgetDate: Date;
  inputRepetitionType: number = 0;
  filterYear: number;
  filterMonth: string;
  showInputForm: boolean = false;

  constructor(private budgetService: BudgetService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.InitBudgetSelector();
    this.LoadBudget()

    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    this.currency = rs.getPropertyValue('--currency');
  }

  InitBudgetSelector() {
    this.filterYear = new Date().getFullYear();
    this.filterMonth = new Date().getMonth().toString();
  }

  LoadBudget() {
    this.budgetEntriesIncome = [];
    this.budgetEntriesExpenses = [];
    this.remainingBudget = 0;
    this.sumExpenses = 0;
    this.sumIncome = 0;

    this.budgetService.getBudget(false).subscribe({
      next: budget => {
        this.budgetList = budget.filter(b => new Date(b.budgetDate).getFullYear() == this.filterYear && new Date(b.budgetDate).getMonth().toString() == this.filterMonth);
        this.budgetEntriesIncome = this.budgetList.filter(b => b.amount > 0).sort((a, b) => (a.amount > b.amount) ? 1 : -1);
        this.budgetEntriesExpenses = this.budgetList.filter(b => b.amount < 0).sort((a, b) => (a.amount > b.amount) ? 1 : -1);

        var saldo = 0;
        var expenses = 0;
        var income = 0;
        this.budgetList.forEach(function (bugetEntry) {
          saldo += bugetEntry.amount;
          if (bugetEntry.amount < 0) {
            expenses += bugetEntry.amount * -1;
          } else {
            income += bugetEntry.amount;
          }
        });

        this.remainingBudget = saldo;
        this.sumExpenses = expenses;
        this.sumIncome = income;
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  toggleshowInputForm() {
    this.showInputForm = !this.showInputForm;
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
      repetitionType: this.inputRepetitionType,
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
