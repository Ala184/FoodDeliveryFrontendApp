import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersCurrentOrderComponent } from './consumers-current-order.component';

describe('ConsumersCurrentOrderComponent', () => {
  let component: ConsumersCurrentOrderComponent;
  let fixture: ComponentFixture<ConsumersCurrentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumersCurrentOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersCurrentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
