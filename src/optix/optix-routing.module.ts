import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotMapsComponent } from './pages/bot-server/bot-maps/bot-maps.component';
import { BotRecordsComponent } from './pages/bot-server/bot-records/bot-records.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';
import { WorldRecordsComponent } from './pages/world-records/world-records.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'botrecords', pathMatch: 'full', component: BotRecordsComponent },
  { path: 'botmaps', pathMatch: 'full', component: BotMapsComponent },
  { path: 'maps', pathMatch: 'full', component: MapsComponent },
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
