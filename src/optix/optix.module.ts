import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OptixRoutingModule } from './optix-routing.module';
import { OptixComponent } from './optix.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { WorldRecordsComponent } from './world-records/world-records.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    OptixComponent,
    SidebarComponent,
    HomeComponent,
    WorldRecordsComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    OptixRoutingModule
  ],
  providers: [],
  bootstrap: [OptixComponent]
})
export class OptixModule { }
