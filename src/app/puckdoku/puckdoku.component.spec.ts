import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuckdokuComponent } from './puckdoku.component';

describe('PuckdokuComponent', () => {
  let component: PuckdokuComponent;
  let fixture: ComponentFixture<PuckdokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuckdokuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuckdokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
