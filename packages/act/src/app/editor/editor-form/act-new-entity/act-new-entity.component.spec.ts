import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActNewEntityComponent } from './act-new-entity.component';

describe('ActNewEntityComponent', () => {
  let component: ActNewEntityComponent;
  let fixture: ComponentFixture<ActNewEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActNewEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActNewEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
