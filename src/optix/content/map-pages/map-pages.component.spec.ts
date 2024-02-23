import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPagesComponent } from './map-pages.component';

describe('MapPagesComponent', () => {
  let component: MapPagesComponent;
  let fixture: ComponentFixture<MapPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapPagesComponent]
    });
    fixture = TestBed.createComponent(MapPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
