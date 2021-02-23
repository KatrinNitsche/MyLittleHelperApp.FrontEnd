import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  isEditShow = false;

  constructor(private todoService: ToDoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.todos = [];

    this.todoService.getToDos().subscribe({
      next: todos => {
        this.todos = todos;          
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  toggleEditDisplay(toDo:ToDo) {  
    this.isEditShow = !this.isEditShow;

    if (!this.isEditShow) {
      this.todoService.updateToDo(toDo).subscribe();
    }
  }

  toggleDone(id:number) {    
    var todo = this.todos.find((v,i) => v.id == id);
    todo.completed = !todo.completed;
    
    this.todoService.updateToDo(todo).subscribe();
  }

  removeToDo(toDo:ToDo) {   
    this.todoService.removeToDo(toDo.id).subscribe({
      next: todo => {
        this.todos = this.todos.filter((v,i) => v.id !== toDo.id);
        this.toastr.info("ToDo was removed.");
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  addToDo() {

    var newToDo = { 
      id: 0,     
      content: this.inputToDo,
      completed: false,
      important: this.inputImportant
    }

    this.todoService.addToDo(newToDo).subscribe({ 
      next: todo => {
        this.todos.push( newToDo);  
        this.toastr.info("New ToDo was added.");
      },
      error: err => {
        this.toastr.error(err);
      }
    });

    this.inputToDo = "";
  }

}
