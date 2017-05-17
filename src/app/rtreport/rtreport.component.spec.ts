import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtreportComponent } from './rtreport.component';

describe('RtreportComponent', () => {
  let component: RtreportComponent;
  let fixture: ComponentFixture<RtreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
