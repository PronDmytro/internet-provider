import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentTableComponent} from './payment-table.component';

describe('EmployeeTableComponent', () => {
  let component: PaymentTableComponent;
  let fixture: ComponentFixture<PaymentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentTableComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
