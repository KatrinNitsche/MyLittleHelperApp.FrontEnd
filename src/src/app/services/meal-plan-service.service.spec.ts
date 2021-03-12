import { TestBed } from '@angular/core/testing';

import { MealPlanService } from './meal-plan-service.service';

describe('MealPlanServiceService', () => {
  let service: MealPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
