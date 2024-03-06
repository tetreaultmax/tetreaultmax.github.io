import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-landing-dialog',
  templateUrl: './landing-dialog.component.html',
  styleUrls: ['./landing-dialog.component.css']
})
export class LandingDialogComponent {
	constructor(public dialogRef: MatDialogRef<LandingDialogComponent>) { }
	closeDialog(): void {
		this.dialogRef.close();
	  }
}
