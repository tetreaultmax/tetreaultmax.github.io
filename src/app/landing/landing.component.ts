import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LandingDialogComponent } from '../landing-dialog/landing-dialog.component';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
	constructor(private dialogLanding: MatDialog) {
	}
	openDialog(){
		const dialogRef = this.dialogLanding.open(LandingDialogComponent, {
			width: '400px', // You can customize the width
			disableClose: false, // Prevents closing the dialog by clicking outside or pressing ESC
		  });
	}
}
