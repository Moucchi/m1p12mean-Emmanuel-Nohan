import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageSidebarComponent } from './garage-sidebar.component';

describe('GarageSIdebarComponent', () => {
  let component: GarageSidebarComponent;
  let fixture: ComponentFixture<GarageSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
