import { Component, OnInit } from '@angular/core';
import { ToDo } from '../models/Todo';
import { ToDoService} from '../services/to-do-service.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: ToDo[];
  errorMessage: string = "";
  inputToDo: string = "";
  inputImportant: boolean = false;

  constructor(private todoService: ToDoService) { }

  ngOnInit(): void {
    this.todos = [];

    this.todoService.getToDos().subscribe({
      next: todos => {
        this.todos = todos;       
      },
      error: err => this.errorMessage = err
    });
  }

  toggleDone(id:number) {
    this.todos.map((v,i) => {  
      if (i == id) v.completed = !v.completed;
      return v;      
    })
  }

  removeToDo(id:number) {
    this.todos = this.todos.filter((v,i) => i !== id);
  }

  addToDo() {

    var newToDo = {
      content: this.inputToDo,
      completed: false,
      important: this.inputImportant
    }

    this.todoService.addToDo(newToDo).subscribe({ 
      next: todo => {
        this.todos.push( newToDo);       
      },
      error: err => this.errorMessage = err
    });

    this.inputToDo = "";
  }

}
