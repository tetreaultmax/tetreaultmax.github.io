import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordleComponent } from './wordle/wordle.component';
import { PuckdokuComponent } from './puckdoku/puckdoku.component';
import { LandingComponent } from './landing/landing.component';
import { HistoryComponent } from './history/history.component';
import { TeamDetailComponent } from './TeamDetail/TeamDetail.component';
import { HandComponent } from './hand/hand.component';

const routes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'puckdoku', component: PuckdokuComponent },
	{ path: 'wordle', component: WordleComponent },
	{ path: 'history', component : HistoryComponent},
	{ path: 'team/:id', component: TeamDetailComponent },
	{path: 'hand', component: HandComponent}
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
