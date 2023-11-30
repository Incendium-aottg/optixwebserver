import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotMapsComponent } from './bot-server/bot-maps/bot-maps.component';
import { BotRecordsComponent } from './bot-server/bot-records/bot-records.component';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { WorldRecordsComponent } from './world-records/world-records.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'botrecords', pathMatch: 'full', component: BotRecordsComponent },
  { path: 'botmaps', pathMatch: 'full', component: BotMapsComponent },
  { path: 'maps', pathMatch: 'full', component: MapsComponent },
  { path: 'scoreboard', pathMatch: 'full', component: ScoreboardComponent },
  { path: 'worldrecords', pathMatch: 'full', component: WorldRecordsComponent },
  { path: '404', pathMatch: 'full',  component: NotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OptixRoutingModule { }
