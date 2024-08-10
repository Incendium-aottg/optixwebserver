import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BotMapsComponent } from './content/bot-server/bot-maps/bot-maps.component';
import { BotRecordsComponent } from './content/bot-server/bot-records/bot-records.component';
import { MapRecordTableComponent } from './content/components/map-record-table/map-record-table.component';
import { RecordTablePageComponent } from './content/components/record-table-page/record-table-page.component';
import { HomeComponent } from './content/home/home.component';
import { LoginComponent } from './content/login/login.component';
import { MapDetailsComponent } from './content/map-details/map-details.component';
import { MapsComponent } from './content/maps/maps.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { ScoreboardComponent } from './content/scoreboard/scoreboard.component';
import { SidebarComponent } from './content/sidebar/sidebar.component';
import { WorldRecordsComponent } from './content/world-records/world-records.component';
import { OptixComponent } from './optix.component';
import { OptixRoutingModule } from './optix-routing.module';
import { SafePipe } from './pipes/safe.pipe';

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
