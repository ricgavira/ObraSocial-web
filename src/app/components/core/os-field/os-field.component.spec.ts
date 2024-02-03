import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsFieldComponent } from './os-field.component';

describe('OsFieldComponent', () => {
  let component: OsFieldComponent;
  let fixture: ComponentFixture<OsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
