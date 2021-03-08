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

    this.todoService.getToDos(true).subscribe({
      next: todos => {  
        this.todos = todos.filter(x => !x.completed);
      },
      error: err => this.errorMessage = err
    });
  }
}
