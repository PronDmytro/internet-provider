import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientFormDialogComponent} from './client-form-dialog.component';

describe('ClientFormDialogComponent', () => {
  let component: ClientFormDialogComponent;
  let fixture: ComponentFixture<ClientFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientFormDialogComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
