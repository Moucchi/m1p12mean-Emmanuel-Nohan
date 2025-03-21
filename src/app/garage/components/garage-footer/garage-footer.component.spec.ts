import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageFooterComponent } from './garage-footer.component';

describe('GarageFooterComponent', () => {
  let component: GarageFooterComponent;
  let fixture: ComponentFixture<GarageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
