import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PositionFormDialogComponent} from './position-form-dialog.component';

describe('PositionFormDialogComponent', () => {
  let component: PositionFormDialogComponent;
  let fixture: ComponentFixture<PositionFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionFormDialogComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
