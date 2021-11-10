import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceFormDialogComponent} from './service-form-dialog.component';

describe('ServiceFormDialogComponent', () => {
  let component: ServiceFormDialogComponent;
  let fixture: ComponentFixture<ServiceFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceFormDialogComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
