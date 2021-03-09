import { Component } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ToDo } from '../models/Todo';
import { BudgetEntry } from '../models/budgetEntry';
import { BudgetService } from '../services/budget-service.service';
import { ToDoService } from '../services/to-do-service.service';
import { HelperService } from '../services/helper-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  budget: BudgetEntry[];
  remainingBudget: number = 0;
  sumIncome: number = 0;
  sumExpenses: number = 0;

  todos: ToDo[];
  quoteText: string = "no quote API yet used to load random quotes from the internet ... :-(";
  errorMessage: string = "";

  showExpensesChart = false;

  constructor(private todoService: ToDoService, private budgetService: BudgetService, private helperService: HelperService) { }

  ngOnInit(): void {
    this.LoadToDos();
    this.LoadBudgetChart();
    this.LoadQuote();
  }

  LoadToDos() {
    this.todos = [];

    this.todoService.getToDos(true).subscribe({
      next: todos => {
        this.todos = todos.filter(x => !x.completed);
      },
      error: err => this.errorMessage = err
    });
  }

  LoadBudgetChart() {
    this.budgetService.getBudget().subscribe({
      next: budget => {
        this.budget = budget;
        var saldo = 0;
        var expenses = 0;
        var income = 0;
        this.budget.forEach(function (bugetEntry) {
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

        this.CreateCarts();
      },
      error: err => this.errorMessage = err
    });
  }

  CreateCarts() {
    var expenses = this.budget.filter(b => b.amount < 0).sort((a, b) => (a.amount > b.amount) ? 1 : -1);
    var expenseNames = [];
    var expenseValues = [];
    var backgroundColour = [];
    expenses.forEach(function (expens) {
      expenseNames.push(expens.description);
      expenseValues.push(expens.amount * -1);
      let color = '#';
      for (let i = 0; i < 6; i++) {
        const random = Math.random();
        const bit = (random * 16) | 0;
        color += (bit).toString(16);
      };
      backgroundColour.push(color);
    })

    if (this.showExpensesChart) {
      var chartExpenses = new Chart('expensesChart', {
        type: 'pie',
        data: {
          labels: expenseNames,
          datasets: [{
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: backgroundColour,
            data: expenseValues
          }]
        },
        options: {
          legend: {
            position: 'bottom',
            align: 'start'
          }
        }
      });
    }

    var chartSummery = new Chart('sumChart', {
      type: 'bar',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
          backgroundColor: ['#0B2545', '#8DA9C4'],
          data: [this.sumIncome, this.sumExpenses]
        }]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  GetRandomColour() {
    const randomColor = () => {
      let color = '#';
      for (let i = 0; i < 6; i++) {
        const random = Math.random();
        const bit = (random * 16) | 0;
        color += (bit).toString(16);
      };
      return color;
    };
  }

  LoadQuote() {
    this.helperService.getQuote().subscribe({
      next: quotes => {

      },
      error: err => this.errorMessage = err
    });
  }
}
