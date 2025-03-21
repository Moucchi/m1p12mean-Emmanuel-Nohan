import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageLayoutComponent } from './garage-layout.component';

describe('GarageLayoutComponent', () => {
  let component: GarageLayoutComponent;
  let fixture: ComponentFixture<GarageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
