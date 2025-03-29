import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageServiceComponent } from './garage-service.component';

describe('GarageServiceComponent', () => {
  let component: GarageServiceComponent;
  let fixture: ComponentFixture<GarageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
