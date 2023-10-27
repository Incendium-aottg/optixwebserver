import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { WorldRecordsComponent } from './world-records/world-records.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'scoreboard', pathMatch: 'full', component: ScoreboardComponent },
  { path: 'worldrecords', pathMatch: 'full', component: WorldRecordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OptixRoutingModule { }
