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


@NgModule({
  declarations: [
    AppComponent
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
	MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
