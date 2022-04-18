import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnListComponent } from './alumn-list.component';

describe('ListaAlumnosComponent', () => {
  let component: AlumnListComponent;
  let fixture: ComponentFixture<AlumnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
