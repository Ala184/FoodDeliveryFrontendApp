import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverersCurrentOrderComponent } from './deliverers-current-order.component';

describe('DeliverersCurrentOrderComponent', () => {
  let component: DeliverersCurrentOrderComponent;
  let fixture: ComponentFixture<DeliverersCurrentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverersCurrentOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverersCurrentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
