import { Component, OnInit } from '@angular/core';
import { NavigationEntry } from '../models/navigationEntry';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  menu: NavigationEntry[];
  constructor() { }

  ngOnInit(): void {
    this.menu = [];

    this.menu.push({ name: "Dashboard", route: "/", symbol: "" });
    this.menu.push({ name: "ToDo list", route: "/todo-list", symbol: "fi fi-rr-list-check" });
    this.menu.push({ name: "Budget", route: "/budget-app", symbol: "fi fi-rr-list" });
    this.menu.push({ name: "Notes", route: "/notes", symbol: "fi fi-rr-pencil" });
    this.menu.push({ name: "Meal Planner", route: "/meal-planner", symbol: "fi fi-rr-shopping-bag" });
    this.menu.push({ name: "Settings", route: "/settings", symbol: "fi fi-rr-settings" });
  }

}
