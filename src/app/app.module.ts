import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule

import { PlayerDialogComponent } from './player-dialog/player-dialog.component';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';
import { TicDialogComponent } from './tic-dialog/tic-dialog.component';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerDialogComponent,
    MenuDialogComponent,
    WinDialogComponent,
    TicDialogComponent,
    TeamDialogComponent
  ],
  imports: [
    BrowserModule, 
	FormsModule,  
	MatSelectModule, 
	MatButtonModule, 
	BrowserAnimationsModule, 
	MatToolbarModule, 
	MatIconModule, 
	MatSlideToggleModule,
	HttpClientModule,
	MatAutocompleteModule,
	MatDialogModule,
	MatInputModule,
	MatListModule,
	MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
