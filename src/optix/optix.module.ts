import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OptixRoutingModule } from './optix-routing.module';
import { OptixComponent } from './optix.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { WorldRecordsComponent } from './world-records/world-records.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapsComponent } from './maps/maps.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    OptixComponent,
    SidebarComponent,
    HomeComponent,
    WorldRecordsComponent,
    ScoreboardComponent,
    MapsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModalModule,
    OptixRoutingModule
  ],
  providers: [],
  bootstrap: [OptixComponent]
})
export class OptixModule { }
