import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkStatusTableComponent} from './work-status-table.component';

describe('WorkStatusTableComponent', () => {
  let component: WorkStatusTableComponent;
  let fixture: ComponentFixture<WorkStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkStatusTableComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
