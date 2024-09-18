import { TestBed } from '@angular/core/testing';

import { MyDriverService } from './my-driver.service';

describe('MyDriverService', () => {
  let service: MyDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
