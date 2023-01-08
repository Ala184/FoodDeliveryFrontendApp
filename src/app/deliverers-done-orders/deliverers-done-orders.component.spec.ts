import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverersDoneOrdersComponent } from './deliverers-done-orders.component';

describe('DeliverersDoneOrdersComponent', () => {
  let component: DeliverersDoneOrdersComponent;
  let fixture: ComponentFixture<DeliverersDoneOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverersDoneOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverersDoneOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
