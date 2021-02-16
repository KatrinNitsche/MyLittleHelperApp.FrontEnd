import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAppComponent } from './budget-app.component';

describe('BudgetAppComponent', () => {
  let component: BudgetAppComponent;
  let fixture: ComponentFixture<BudgetAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
