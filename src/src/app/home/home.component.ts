import { Component } from '@angular/core';
import { zip } from 'rxjs';
import { ToDo } from '../models/Todo';
import { ToDoService } from '../services/to-do-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  todos: ToDo[];
  errorMessage: string = "";

  constructor(private todoService: ToDoService) { }

  ngOnInit(): void {
    this.todos = [];

    this.todoService.getToDos().subscribe({
      next: todos => {      
        var today = new Date();
        var todayString = today.getFullYear() + "-" + (today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDay() < 10 ? "0" + today.getDay() : today.getDay());      
        this.todos = todos.filter(x => !x.completed && x.dueDate.toString().substr(0, 10) == todayString).sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);;
      },
      error: err => this.errorMessage = err
    });
  }
}
