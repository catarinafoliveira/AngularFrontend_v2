import { TestBed } from '@angular/core/testing';

import { MyCarService } from './my-car.service';

describe('MyCarService', () => {
  let service: MyCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
