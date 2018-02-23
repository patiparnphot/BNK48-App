import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareidolComponent } from './shareidol.component';

describe('ShareidolComponent', () => {
  let component: ShareidolComponent;
  let fixture: ComponentFixture<ShareidolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareidolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareidolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
