import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkStatusFormDialogComponent} from './work-status-form-dialog.component';

describe('WorkStatusFoemDialogComponent', () => {
  let component: WorkStatusFormDialogComponent;
  let fixture: ComponentFixture<WorkStatusFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkStatusFormDialogComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStatusFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
