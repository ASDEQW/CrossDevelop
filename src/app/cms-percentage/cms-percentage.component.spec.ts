import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPercentageComponent } from './cms-percentage.component';

describe('CmsPercentageComponent', () => {
  let component: CmsPercentageComponent;
  let fixture: ComponentFixture<CmsPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsPercentageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmsPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
