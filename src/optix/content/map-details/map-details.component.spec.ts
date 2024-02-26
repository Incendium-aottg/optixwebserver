import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDetailsComponent } from './map-details.component';

describe('MapPagesComponent', () => {
  let component: MapDetailsComponent;
  let fixture: ComponentFixture<MapDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapDetailsComponent]
    });
    fixture = TestBed.createComponent(MapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
