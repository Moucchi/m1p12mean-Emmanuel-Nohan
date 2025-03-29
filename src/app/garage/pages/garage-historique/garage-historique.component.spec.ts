import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageHistoriqueComponent } from './garage-historique.component';

describe('GarageHistoriqueComponent', () => {
  let component: GarageHistoriqueComponent;
  let fixture: ComponentFixture<GarageHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageHistoriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
