import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRecordTableComponent } from './map-record-table.component';

describe('MapRecordTableComponent', () => {
  let component: MapRecordTableComponent;
  let fixture: ComponentFixture<MapRecordTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapRecordTableComponent]
    });
    fixture = TestBed.createComponent(MapRecordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
