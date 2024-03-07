import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInitialsComponent } from './user-initials.component';

describe('UserInitialsComponent', () => {
  let component: UserInitialsComponent;
  let fixture: ComponentFixture<UserInitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInitialsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
