import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDriverComponent } from './my-driver.component';

describe('MyDriverComponent', () => {
  let component: MyDriverComponent;
  let fixture: ComponentFixture<MyDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
