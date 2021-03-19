import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Settings } from 'src/app/models/settings';
import { HelperService } from 'src/app/services/helper-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  darkColour: string;
  middleColour: string;
  lightColour: string;
  rootElement: HTMLElement;
  currency: string = "£";

  showCategoryInputForm: boolean = false;
  categories: Category[];
  newCategory: Category;

  navigationPosition: string = "top";

  constructor(private settingsService: HelperService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.LoadSettings();
    this.LoadCategories();
  }

  LoadCategories() {
    this.newCategory = new Category();
    this.categories = [];
    this.settingsService.LoadCategories().subscribe({
      next: categories => {
        this.categories = categories;
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  AddCategory() {
    this.settingsService.SaveCategory(this.newCategory).subscribe({
      next: category => {
        this.toastr.info("Category '" + category.name + "' was added.");
        this.LoadCategories();
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  toggleCatetoryEditDisplay(category: Category) {   
    if (category != undefined && category.isEditShow) {

      this.settingsService.SaveCategory(category).subscribe({
        next: category => {
          this.toastr.info("Category '" + category.name + "' was saved.");
          this.LoadCategories();
        },
        error: err => {
          this.toastr.error(err);
        }
      });
    }

    category.isEditShow = !category.isEditShow;
  }

  closeCatetoryEditDisplay(category: Category) {
    category.isEditShow = !category.isEditShow;
  }

  ToggleCategoryInputForm() {
    this.showCategoryInputForm = !this.showCategoryInputForm;
  }

  SetDefaultColours() {
    this.darkColour = "#0B2545";
    this.middleColour = "#8DA9C4";
    this.lightColour = "#EEF4ED";

    this.rootElement.style.setProperty("--dark", this.darkColour);
    this.rootElement.style.setProperty("--middle", this.middleColour);
    this.rootElement.style.setProperty("--light", this.lightColour);
  }

  ChangeColour(setting: string) {
    var newSetting = "";
    switch (setting) {
      case "dark":
        newSetting = this.darkColour;
        break;
      case "middle":
        newSetting = this.middleColour;
        break;
      case "light":
        newSetting = this.lightColour;
        break;
    }

    this.rootElement.style.setProperty("--" + setting, newSetting.toString().trim());
  }

  LoadSettings() {
    this.settingsService.LoadSettings().subscribe({
      next: settings => {
        this.darkColour = settings.darkColour;
        this.middleColour = settings.middleColour;
        this.lightColour = settings.lightColour;
        this.currency = settings.currency;

        this.rootElement = document.querySelector(':root');
        this.rootElement.style.setProperty("--dark", this.darkColour);
        this.rootElement.style.setProperty("--middle", this.middleColour);
        this.rootElement.style.setProperty("--light", this.lightColour);
        this.rootElement.style.setProperty("--currency", this.currency);
        
        this.navigationPosition = settings.navigationPosition;
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  SaveSettings() {
    var settings = new Settings();
    settings.currency = this.currency;
    settings.darkColour = this.darkColour;
    settings.middleColour = this.middleColour;
    settings.lightColour = this.lightColour;
    settings.navigationPosition = this.navigationPosition;

    this.settingsService.SaveSettings(settings).subscribe({
      next: settings => {
        this.toastr.info("Settings are saved");
        window.location.reload();
      },
      error: err => {
        this.toastr.error(err);        
      }
    });
  }

  SetCurrency() {
    this.rootElement = document.querySelector(':root');
    this.rootElement.style.setProperty("--currency", this.currency.trim());
  }
}
