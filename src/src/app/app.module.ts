import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { QuizAppComponent } from './quiz-app/quiz-app.component';
import { BudgetAppComponent } from './budget-app/budget-app.component';
import { NotesComponent } from './notes/notes.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    QuizAppComponent,
    BudgetAppComponent,
    NotesComponent,
    NavigationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'todo-list', component: TodoListComponent }, 
      { path: 'budget-app', component: BudgetAppComponent },
      { path: 'notes', component: NotesComponent },   
      { path: 'quiz', component: QuizAppComponent } 
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
