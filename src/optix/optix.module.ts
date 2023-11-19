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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

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
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    OptixRoutingModule,
    ToastrModule.forRoot({
      timeOut: 1500000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  providers: [],
  bootstrap: [OptixComponent]
})
export class OptixModule { }
