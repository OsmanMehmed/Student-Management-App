import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnInfoComponent } from './alumn-info.component';

describe('AlumnoCardComponent', () => {
  let component: AlumnInfoComponent;
  let fixture: ComponentFixture<AlumnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
