import { Component, Input, OnInit } from '@angular/core';
import { NavigationEntry } from '../models/navigationEntry';
import { HelperService } from '../services/helper-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  menuData: NavigationEntry[];
  @Input() menuPositionTop: boolean;
  @Input() menuPositionLeft: boolean;

  constructor(private HelperService: HelperService) { }

  ngOnInit(): void {  
    this.menuData = this.HelperService.LoadMenuEntries();
  }
}
