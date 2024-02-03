import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsFieldRequiredComponent } from './os-field-required.component';

describe('OsFieldRequiredComponent', () => {
  let component: OsFieldRequiredComponent;
  let fixture: ComponentFixture<OsFieldRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsFieldRequiredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OsFieldRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
