import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordleComponent } from './wordle/wordle.component';
import { PuckdokuComponent } from './puckdoku/puckdoku.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'puckdoku', component: PuckdokuComponent },
	{ path: 'wordle', component: WordleComponent },
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
