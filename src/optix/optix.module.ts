import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { OptixComponent } from './optix.component';
import { OptixRoutingModule } from './optix-routing.module';
import { SafePipe } from './pipes/safe.pipe';
import { BotMapsComponent } from './pages/bot-server/bot-maps/bot-maps.component';
import { BotRecordsComponent } from './pages/bot-server/bot-records/bot-records.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RecordTablePageComponent } from './components/record-table-page/record-table-page.component';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';
import { WorldRecordsComponent } from './pages/world-records/world-records.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    OptixComponent,
    SidebarComponent,
    HomeComponent,
    WorldRecordsComponent,
    ScoreboardComponent,
    MapsComponent,
    NotFoundComponent,
    BotRecordsComponent,
    RecordTablePageComponent,
    BotMapsComponent,
    SafePipe,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    NgbModule,
    OptixRoutingModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  providers: [],
  bootstrap: [OptixComponent]
})
export class OptixModule { }
