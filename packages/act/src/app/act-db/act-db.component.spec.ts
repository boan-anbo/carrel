import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActDbComponent } from './act-db.component';

describe('ActDbComponent', () => {
  let component: ActDbComponent;
  let fixture: ComponentFixture<ActDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActDbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
