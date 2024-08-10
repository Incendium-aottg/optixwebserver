import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotMapsComponent } from './content/bot-server/bot-maps/bot-maps.component';
import { BotRecordsComponent } from './content/bot-server/bot-records/bot-records.component';
import { HomeComponent } from './content/home/home.component';
import { LoginComponent } from './content/login/login.component';
import { MapDetailsComponent } from './content/map-details/map-details.component';
import { MapsComponent } from './content/maps/maps.component';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { ScoreboardComponent } from './content/scoreboard/scoreboard.component';
import { WorldRecordsComponent } from './content/world-records/world-records.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'botrecords', pathMatch: 'full', component: BotRecordsComponent },
  { path: 'botmaps', pathMatch: 'full', component: BotMapsComponent },
  { path: 'maps', pathMatch: 'full', component: MapsComponent },
  { path: 'maps/:id', pathMatch: 'full', component: MapDetailsComponent },
  { path: 'scoreboard', pathMatch: 'full', component: ScoreboardComponent },
  { path: 'worldrecords', pathMatch: 'full', component: WorldRecordsComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: '404', pathMatch: 'full',  component: NotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OptixRoutingModule { }
