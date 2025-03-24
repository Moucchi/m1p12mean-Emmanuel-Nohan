import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageSIdebarComponent } from './garage-sidebar.component';

describe('GarageSIdebarComponent', () => {
  let component: GarageSIdebarComponent;
  let fixture: ComponentFixture<GarageSIdebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageSIdebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageSIdebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
