import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OptixRoutingModule } from './optix-routing.module';
import { OptixComponent } from './optix.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { WorldRecordsComponent } from './world-records/world-records.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthorsComponent } from './authors/authors.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    OptixComponent,
    SidebarComponent,
    HomeComponent,
    WorldRecordsComponent,
    ScoreboardComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModalModule,
    OptixRoutingModule
  ],
  providers: [],
  bootstrap: [OptixComponent]
})
export class OptixModule { }
