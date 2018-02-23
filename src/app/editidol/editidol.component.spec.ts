import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditidolComponent } from './editidol.component';

describe('EditidolComponent', () => {
  let component: EditidolComponent;
  let fixture: ComponentFixture<EditidolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditidolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditidolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
