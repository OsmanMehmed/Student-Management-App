import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPasswordComponent } from './confirmation-password.component';

describe('ConfirmationPasswordComponent', () => {
  let component: ConfirmationPasswordComponent;
  let fixture: ComponentFixture<ConfirmationPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
