import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { QuizAppComponent } from './quiz-app/quiz-app.component';
import { BudgetAppComponent } from './budget-app/budget-app.component';
import { NotesComponent } from './notes/notes.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { SettingsComponent } from './settings/settings/settings.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    QuizAppComponent,
    BudgetAppComponent,
    NotesComponent,
    NavigationComponent,
    HomeComponent,
    SettingsComponent,
    MealPlannerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'todo-list', component: TodoListComponent }, 
      { path: 'budget-app', component: BudgetAppComponent },
      { path: 'notes', component: NotesComponent },   
      { path: 'quiz', component: QuizAppComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'meal-planner', component: MealPlannerComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
