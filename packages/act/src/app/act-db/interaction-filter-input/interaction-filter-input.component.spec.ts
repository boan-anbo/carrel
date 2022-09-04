import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionFilterInputComponent } from './interaction-filter-input.component';

describe('InteractionFilterInputComponent', () => {
  let component: InteractionFilterInputComponent;
  let fixture: ComponentFixture<InteractionFilterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionFilterInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionFilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
