import { TestBed } from '@angular/core/testing';

import { BudgetServiceService } from './budget-service.service';

describe('BudgetServiceService', () => {
  let service: BudgetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
