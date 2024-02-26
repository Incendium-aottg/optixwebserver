import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OptixRoutingModule } from './optix-routing.module';
import { OptixComponent } from './optix.component';
import { SidebarComponent } from './content/sidebar/sidebar.component';
import { HomeComponent } from './content/home/home.component';
import { WorldRecordsComponent } from './content/world-records/world-records.component';
import { ScoreboardComponent } from './content/scoreboard/scoreboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapsComponent } from './content/maps/maps.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { BotRecordsComponent } from './content/bot-server/bot-records/bot-records.component';
import { RecordTablePageComponent } from './content/components/record-table-page/record-table-page.component';
import { BotMapsComponent } from './content/bot-server/bot-maps/bot-maps.component';
import { SafePipe } from './pipes/safe.pipe';
import { MapDetailsComponent } from './content/map-details/map-details.component';
import { MapRecordTableComponent } from './content/components/map-record-table/map-record-table.component';

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
		MapDetailsComponent,
		MapRecordTableComponent,
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
			maxOpened: 1,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true
		}),
	],
	providers: [],
	bootstrap: [OptixComponent]
})
export class OptixModule { }
