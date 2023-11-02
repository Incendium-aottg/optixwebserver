import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { WorldRecordsComponent } from './world-records/world-records.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'authors', pathMatch: 'full', component: AuthorsComponent },
  { path: 'scoreboard', pathMatch: 'full', component: ScoreboardComponent },
  { path: 'worldrecords', pathMatch: 'full', component: WorldRecordsComponent },
  { path: '**', pathMatch: 'full',  component: NotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OptixRoutingModule { }
