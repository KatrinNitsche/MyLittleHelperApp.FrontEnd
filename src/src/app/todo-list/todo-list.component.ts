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
  inputRepetitionType: number = 0; 
    
  importantFilter: boolean = false;
  doneFilter: boolean = false; 
  searchTermFilter: string = "";
  sortingColumn: string = "important";

  constructor(private todoService: ToDoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadToDos();
  }

  loadToDos() {
    this.todos = [];

    this.todoService.getToDos().subscribe({
      next: todos => {
        this.todos = todos;  
        this.filterToDos(); 
        this.sortList();       
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  filterToDos() {   
    if (this.doneFilter) {
      this.todos = this.todos.filter(x => x.completed == this.doneFilter);    
    }
    if (this.importantFilter) {
      this.todos = this.todos.filter(x => x.important);
    }

    if (this.searchTermFilter != "") {
      this.todos = this.todos.filter(x => x.content.includes(this.searchTermFilter));
    }
  } 

  sortList() {
    if (this.sortingColumn == "done") {   
      this.todos = this.todos.sort((a, b) => (a.completed < b.completed) ? 1 : -1);
    }
    else if (this.sortingColumn == "important") {
      this.todos = this.todos.sort((a, b) => (a.important < b.important) ? 1 : -1);
    }
    else if (this.sortingColumn == "content") {
      this.todos = this.todos.sort((a, b) => (a.content < b.content) ? 1 : -1);
    }
    else if (this.sortingColumn == "dueDate") {
      this.todos = this.todos.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
    }
  }

  toggleEditDisplay(toDo:ToDo) {  
    toDo.isEditShow = !toDo.isEditShow;

    if (!toDo.isEditShow && toDo != undefined) {     
      this.todoService.updateToDo(toDo).subscribe();
    } else {
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
      important: this.inputImportant,
      repetitionType: this.inputRepetitionType,
      created: new Date(),
      updated: new Date(),
      dueDate: new Date(),
      isEditShow: false
    }

    this.todoService.addToDo(newToDo).subscribe({ 
      next: todo => {
        this.loadToDos();
        this.toastr.info("New ToDo was added.");
      },
      error: err => {
        this.toastr.error(err);
      }
    });

    this.inputToDo = "";
  }
}