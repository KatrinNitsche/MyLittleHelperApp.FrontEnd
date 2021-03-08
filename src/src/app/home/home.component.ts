import { Component } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ToDo } from '../models/Todo';
import { BudgetEntry } from '../models/budgetEntry';
import { BudgetService } from '../services/budget-service.service';
import { ToDoService } from '../services/to-do-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  budget: BudgetEntry[];
  remainingBudget: number = 0;
  todos: ToDo[];
  errorMessage: string = "";

  constructor(private todoService: ToDoService, private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.LoadTotos();
    this.LoadBudgetChart();
  }

  LoadTotos() {
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
        this.CreateCart();
        var saldo = 0;
        budget.forEach(function (bugetEntry) {
          saldo += bugetEntry.amount;
        });

        this.remainingBudget = saldo;
      },
      error: err => this.errorMessage = err
    });
  }

  CreateCart() {
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

    var ctx = new Chart('myChart', {
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
    }
    );
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
}
