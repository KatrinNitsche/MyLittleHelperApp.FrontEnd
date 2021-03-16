import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';
import { ToDo } from '../models/Todo';
import { HelperService } from '../services/helper-service.service';
import { ToDoService } from '../services/to-do-service.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: ToDo[];
  allToDo: ToDo[];
  errorMessage: string = "";
  inputToDo: string = "";
  inputImportant: boolean = false;
  inputRepetitionType: number = 0;
  inputCategory: number = null;
  categoryList: Category[];

  importantFilter: boolean = false;
  doneFilter: boolean = false;
  searchTermFilter: string = "";
  sortingColumn: string = "important";

  constructor(private todoService: ToDoService, private helperService: HelperService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.LoadCategories();   
  }

  LoadCategories() {
    this.categoryList = [];
    this.helperService.LoadCategories().subscribe({
      next: categories => {
        this.categoryList = categories;
        this.loadToDos();    
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  loadToDos() {
    this.todos = [];

    this.todoService.getToDos(false, null).subscribe({
      next: todos => {
        this.todos = todos;
        var allCategories = this.categoryList;

        this.todos.forEach(function(toDo) {
          var category = allCategories.filter(x => x.id == toDo.categoryId);
          toDo.categoryColour = category[0].colour;
        });

        this.allToDo = todos;
        this.filterToDos();
        this.sortList();
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  FilterByCategory() {
    var toDoList = [];
    var allToDos = this.allToDo;
    var anyFilter = false;

    this.categoryList.forEach(function (category) {
      if (category.isFilteredBy) {
        anyFilter = true;
        var toDosInCategory = allToDos.filter(x => x.categoryId == category.id);
        if (category.isFilteredBy) {
          toDosInCategory.forEach(function (toDo) {
            toDo.categoryColour = category.colour;
            toDoList.push(toDo);
          });
        }
      }
    });

    if (!anyFilter) {
      this.loadToDos();
    }

    this.todos = toDoList;
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

  toggleEditDisplay(toDo: ToDo) {
    toDo.isEditShow = !toDo.isEditShow;

    if (!toDo.isEditShow && toDo != undefined) {
      this.todoService.updateToDo(toDo).subscribe();
    }
  }

  closeEdit(toDo: ToDo) {
    toDo.isEditShow = !toDo.isEditShow;
  }

  toggleDone(id: number) {
    var todo = this.todos.find((v, i) => v.id == id);
    todo.completed = !todo.completed;

    this.todoService.updateToDo(todo).subscribe();
  }

  removeToDo(toDo: ToDo) {
    this.todoService.removeToDo(toDo.id).subscribe({
      next: todo => {
        this.todos = this.todos.filter((v, i) => v.id !== toDo.id);
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
      categoryId: this.inputCategory,
      created: new Date(),
      updated: new Date(),
      dueDate: new Date(),
      isEditShow: false,
      categoryColour: ""
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