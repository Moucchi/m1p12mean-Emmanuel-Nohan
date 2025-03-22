import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageBreadcrumbComponent } from './garage-breadcrumb.component';

describe('GarageBreadcrumbComponent', () => {
  let component: GarageBreadcrumbComponent;
  let fixture: ComponentFixture<GarageBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
