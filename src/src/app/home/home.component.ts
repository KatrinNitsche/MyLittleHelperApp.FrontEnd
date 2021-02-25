import { Component } from '@angular/core';
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
        
        todos.forEach(function(todo) {
          console.log(todo.dueDate.toDateString);
        });

        this.todos = todos.filter(x => x.dueDate.getDate == new Date().getDate);          
      },
      error: err => this.errorMessage = err
    });
  }
}
