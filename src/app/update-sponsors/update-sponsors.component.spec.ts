import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSponsorComponent } from './update-sponsors.component';

describe('UpdateEmployeeComponent', () => {
  let component: UpdateSponsorComponent;
  let fixture: ComponentFixture<UpdateSponsorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSponsorComponent]
    });
    fixture = TestBed.createComponent(UpdateSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
