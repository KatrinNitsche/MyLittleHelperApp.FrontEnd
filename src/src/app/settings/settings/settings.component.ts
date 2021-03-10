import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {    
      this.GetColours();
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

    console.log(newSetting);
    this.rootElement.style.setProperty("--" + setting, newSetting.toString().trim());
  }

  GetColours() {
    this.rootElement = document.querySelector(':root');   
    var rs = getComputedStyle(this.rootElement);  

    this.darkColour = rs.getPropertyValue("--dark").trim();
    this.middleColour = rs.getPropertyValue("--middle").trim();;
    this.lightColour = rs.getPropertyValue("--light").trim();;   
  }

  SetCurrency() {
    this.rootElement = document.querySelector(':root');          
    this.rootElement.style.setProperty("--currency", this.currency.trim());
  }
}
