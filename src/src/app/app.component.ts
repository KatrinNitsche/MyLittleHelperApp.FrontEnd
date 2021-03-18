import { Component, OnInit } from '@angular/core';
import { HelperService } from './services/helper-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Helpers';

  menuPositionTop: boolean;
  menuPositionLeft: boolean;
  
  rootElement: HTMLElement;
  currency: string;
  errorMessage: string = "";

  constructor(private settingsService: HelperService) { }

  ngOnInit(): void {
    this.LoadSettings();
  }

  LoadSettings() {   
    this.settingsService.LoadSettings().subscribe({
      next: settings => {
        this.rootElement = document.querySelector(':root');
        this.rootElement.style.setProperty("--dark", settings.darkColour);
        this.rootElement.style.setProperty("--middle", settings.middleColour);
        this.rootElement.style.setProperty("--light", settings.lightColour);
        this.rootElement.style.setProperty("--currency", settings.currency);
        this.currency = settings.currency;

        if (settings.navigationPosition == "top") {
          this.menuPositionLeft = false;
          this.menuPositionTop = true;
        } else if(settings.navigationPosition == "left") {
          this.menuPositionLeft = true;
          this.menuPositionTop = false;
        }
      },
      error: err => this.errorMessage = err
    });
  }

}
